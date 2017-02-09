import { inject, TestBed } from '@angular/core/testing';
// HTTP mocking imports
import { Http, BaseRequestOptions, Response, HttpModule, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import {HeroService} from './hero.service';
import {Hero} from './hero';

import 'rxjs/Rx';
import 'rxjs/Observable';

describe('HeroService Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HeroService,
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

    it('Should get list of Heroes', inject([MockBackend, HeroService], (mockBackend, service) => {
        mockBackend.connections.subscribe(
            (connection: MockConnection) => {
                connection.mockRespond(new Response(
                    new ResponseOptions({
                        body: [{ id: 123 }, { id: 234 }]
                    }
                    )));
            });

        service.getHeroes().subscribe((items: Hero[]) => {
            expect(items.length).toBe(2);
            expect(items[0].id).toBe(123);
            expect(items[1].id).toBe(234);
        });
    }));

    it('Should get Hero by ID', inject([MockBackend, HeroService], (mockBackend, service) => {
        mockBackend.connections.subscribe(
            (connection: MockConnection) => {
                connection.mockRespond(new Response(
                    new ResponseOptions({
                        body: { id: 123 }
                    }
                    )));
            });

        service.getHero(123).subscribe((item: Hero) => {
            expect(item).toBeDefined();
            expect(item.id).toBe(123);
        });
    }));

    it('Should cause error handled in Hero service', inject([MockBackend, HeroService], (mockBackend, service) => {
        let mockError = new Error('TEST_ERROR');
        mockBackend.connections.subscribe(
            (connection: MockConnection) => {
                connection.mockError(mockError);
            });

        service.getHeroes().subscribe(items => { }, error => {
            expect(error).toBeDefined();
            expect(error).toBe('TEST_ERROR');
        });
    }));
});
