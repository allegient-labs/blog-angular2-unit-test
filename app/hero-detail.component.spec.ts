import {
    it,
    describe,
    expect,
    inject,
    beforeEach,
    beforeEachProviders
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { provide, ApplicationRef } from '@angular/core';
import { Router, ROUTER_PRIMARY_COMPONENT, ROUTER_PROVIDERS, RouteParams } from '@angular/router-deprecated';
import { APP_BASE_HREF, Location } from '@angular/common';
import { MockApplicationRef } from '@angular/core/testing';
import { SpyLocation } from '@angular/common/testing/location_mock';
import { HTTP_PROVIDERS } from '@angular/http';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { MockHeroService } from './Testing/mocks';

describe('HeroDetail Component', () => {
    let service;
    let testingComponent: HeroDetailComponent;
    let router: Router;
    let tcb;

    beforeEachProviders(() => [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        provide(Location, { useClass: SpyLocation }),
        provide(APP_BASE_HREF, { useValue: '/' }),
        provide(ROUTER_PRIMARY_COMPONENT, { useValue: HeroDetailComponent }),
        provide(ApplicationRef, { useClass: MockApplicationRef }),
        provide(Router, { useValue: jasmine.createSpyObj('Router', ['navigate']) }),
        provide(HeroService, { useClass: MockHeroService }),
        provide(RouteParams, { useValue: new RouteParams({ id: '12' }) }),
        MockHeroService,
        HeroDetailComponent,
        TestComponentBuilder,
        HeroService
    ]);

    beforeEach(inject([HeroDetailComponent, Router, MockHeroService, TestComponentBuilder],
        (c, r, s, _tcb) => {
            testingComponent = c;
            service = s;
            router = r;
            tcb = _tcb;
        })
    );

    it('Should display Hero Details upon init', done => {
        tcb.overrideProviders(HeroDetailComponent,
            [
                provide(RouteParams, { useValue: new RouteParams({ id: '12' }) }),
                provide(HeroService, { useClass: MockHeroService })
            ])
            .createAsync(HeroDetailComponent).then(fixture => {
                fixture.detectChanges();
                let nativeElement = fixture.nativeElement;
                let component = fixture.componentInstance;

                let initTest = () => {
                    expect(component.hero).toBeDefined();
                    expect(component.hero.id).toBe(12);
                    expect(component.hero.name).toBe('Test Hero12');
                    let heroID = nativeElement.querySelector('#heroID');
                    expect(heroID).toBeDefined();
                    expect(heroID.innerText).toContain('12');
                    let heroName = nativeElement.querySelector('input[name=heroName]');
                    expect(heroName).toBeDefined();
                    expect(heroName.value).toContain('Test Hero12');
                    done();
                };

                component.ngOnInit();
                fixture.detectChanges();

                setTimeout(initTest);
            })
            .catch(e => done.fail(e));
    });

    it('Clicking back button should go back', done => {
        tcb.overrideProviders(HeroDetailComponent,
            [
                provide(RouteParams, { useValue: new RouteParams({ id: '12' }) }),
                provide(HeroService, { useClass: MockHeroService })
            ])
            .createAsync(HeroDetailComponent).then(fixture => {
                spyOn(window.history, 'back').and.callFake(function () {
                    return true;
                });
                fixture.detectChanges();
                let nativeElement = fixture.nativeElement;
                let component = fixture.componentInstance;

                let test = () => {
                    fixture.detectChanges();
                    expect(window.history.back).toHaveBeenCalled();
                    done();
                };

                component.ngOnInit();
                fixture.detectChanges();
                let backButton = nativeElement.querySelector('#goBack');
                backButton.click();

                setTimeout(test);
            })
            .catch(e => done.fail(e));
    });
});
