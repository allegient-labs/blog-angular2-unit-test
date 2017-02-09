import { inject, TestBed } from '@angular/core/testing';
// HTTP mocking imports
import { Http, BaseRequestOptions, Response, HttpModule, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import {HeroSearchService} from './hero-search.service';
import {Hero} from './hero';

import 'rxjs/Rx';
import 'rxjs/Observable';

describe('HeroSearchService Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HeroSearchService,
                BaseRequestOptions,
                // { provide: Config, useClass: MockConfig },
                MockBackend,
                {
                    provide: Http,
                    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions],
                },
            ],
            imports: [
                HttpModule
            ]
        });

        TestBed.compileComponents();
    });

    it('Should get list of Heroes from search', inject([MockBackend, HeroSearchService], (mockBackend, service) => {
        mockBackend.connections.subscribe(
            (connection: MockConnection) => {
                connection.mockRespond(new Response(
                    new ResponseOptions({
                        body: [{ id: 123, name: 'Bob' }, { id: 234, name: 'Bob2' }]
                    }
                    )));
            });

        service.search('Bob').subscribe((items: Hero[]) => {
            expect(items.length).toBe(2);
            expect(items[0].id).toBe(123);
            expect(items[1].id).toBe(234);
        });
    }));


    it('Should cause error handled in Hero Search service', inject([MockBackend, HeroSearchService], (mockBackend, service) => {
        let mockError = new Error('TEST_ERROR');
        mockBackend.connections.subscribe(
            (connection: MockConnection) => {
                connection.mockError(mockError);
            });

        service.search('Bob').subscribe(items => { }, error => {
            expect(error).toBeDefined();
            expect(error).toBe('TEST_ERROR');
        });
    }));
});
