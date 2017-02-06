import {describe, expect, it, inject, beforeEachProviders} from '@angular/core/testing';
import {provide} from '@angular/core';
import { HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import {HeroService} from './hero.service';
import {Hero} from './hero';

import 'rxjs/Rx';
import 'rxjs/Observable';

describe('HeroService Service', () => {

    // All heed this block - it is required so that the test injector
    // is properly set up. Without doing this, you won't get the
    // fake backend injected into Http.

    // Also, you need to inject MockBackend as a provider before you wire
    // it to replace XHRBackend with the provide function!  So this is all
    // extremely important to set up right.
    beforeEachProviders(() => {
        return [
            HTTP_PROVIDERS,
            provide(XHRBackend, { useClass: MockBackend }),
            HeroService
        ];
    });

    it('Should get list of Heroes', inject([XHRBackend, HeroService], (mockBackend, service) => {
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

    it('Should get Hero by ID', inject([XHRBackend, HeroService], (mockBackend, service) => {
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

    it('Should cause error handled in Hero service', inject([XHRBackend, HeroService], (mockBackend, service) => {
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
