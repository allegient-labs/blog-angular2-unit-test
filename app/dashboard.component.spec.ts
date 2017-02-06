import {
    it,
    describe,
    expect,
    inject,
    beforeEach,
    beforeEachProviders
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import {provide, ApplicationRef} from '@angular/core';
import {Router, ROUTER_PRIMARY_COMPONENT, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {APP_BASE_HREF, Location} from '@angular/common';
import {MockApplicationRef} from '@angular/core/testing';
import {SpyLocation} from '@angular/common/testing/location_mock';
import {HTTP_PROVIDERS} from '@angular/http';

import {DashboardComponent} from './dashboard.component';
import {HeroService} from './hero.service';
import {MockHeroService} from './Testing/mocks';

describe('Dashboard Component', () => {
    let service;
    let testingComponent: DashboardComponent;
    let router: Router;
    let tcb;

    beforeEachProviders(() => [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        provide(Location, { useClass: SpyLocation }),
        provide(APP_BASE_HREF, { useValue: '/' }),
        provide(ROUTER_PRIMARY_COMPONENT, { useValue: DashboardComponent }),
        provide(ApplicationRef, { useClass: MockApplicationRef }),
        provide(Router, { useValue: jasmine.createSpyObj('Router', ['navigate']) }),
        provide(HeroService, {useClass: MockHeroService}),
        MockHeroService,
        DashboardComponent,
        TestComponentBuilder,
        HeroService
    ]);

    beforeEach(inject([DashboardComponent, Router, MockHeroService, TestComponentBuilder],
        (c, r, s, _tcb) => {
            testingComponent = c;
            service = s;
            router = r;
            tcb = _tcb;
        })
    );

    // it('Should get first 4 Heroes on init', done => {
    //     tcb.createAsync(DashboardComponent).then(fixture => {
    //         fixture.detectChanges();
    //         let nativeElement = fixture.nativeElement;
    //         let component = fixture.componentInstance;

    //         let initTest = () => {
    //             expect(component.heroes).toBeDefined();
    //             expect(component.heroes.length).toBe(4);
    //             fixture.detectChanges();
    //             let heroes = nativeElement.querySelectorAll('div.module h4');
    //             expect(heroes).toBeDefined();
    //             expect(heroes.length).toBe(4);
    //             done();
    //         };

    //         component.ngOnInit();
    //         fixture.detectChanges();

    //         setTimeout(initTest);
    //     })
    //         .catch(e => done.fail(e));
    // });

    // it('Clicking hero should navigate to Hero Details', done => {
    //     tcb.createAsync(DashboardComponent).then(fixture => {
    //         fixture.detectChanges();
    //         let nativeElement = fixture.nativeElement;
    //         let component = fixture.componentInstance;

    //         let test = () => {
    //             expect(component.heroes).toBeDefined();
    //             expect(component.heroes.length).toBe(4);
    //             fixture.detectChanges();
    //             let heroes = nativeElement.querySelectorAll('div.module h4');
    //             heroes[0].click();
    //             expect(router.navigate).toHaveBeenCalledWith([ 'HeroDetail', Object({ id: 12 }) ]);
    //             done();
    //         };

    //         component.ngOnInit();
    //         fixture.detectChanges();

    //         setTimeout(test);
    //     })
    //         .catch(e => done.fail(e));
    // });
});
