// import {
//     it,
//     describe,
//     expect,
//     inject,
//     beforeEach,
//     beforeEachProviders
// } from '@angular/core/testing';
// import { TestComponentBuilder } from '@angular/compiler/testing';
// import { provide, ApplicationRef } from '@angular/core';
// import { Router, ROUTER_PRIMARY_COMPONENT, ROUTER_PROVIDERS } from '@angular/router-deprecated';
// import { APP_BASE_HREF, Location } from '@angular/common';
// import { MockApplicationRef } from '@angular/core/testing';
// import { SpyLocation } from '@angular/common/testing/location_mock';
// import { HTTP_PROVIDERS } from '@angular/http';

// import { HeroesComponent } from './heroes.component';
// import { HeroService } from './hero.service';
// import { MockHeroService } from './Testing/mocks';

// describe('HeroesComponent', () => {
//     let service;
//     let testingComponent: HeroesComponent;
//     let router: Router;
//     let tcb;

//     beforeEachProviders(() => [
//         HTTP_PROVIDERS,
//         ROUTER_PROVIDERS,
//         provide(Location, { useClass: SpyLocation }),
//         provide(APP_BASE_HREF, { useValue: '/' }),
//         provide(ROUTER_PRIMARY_COMPONENT, { useValue: HeroesComponent }),
//         provide(ApplicationRef, { useClass: MockApplicationRef }),
//         provide(Router, { useValue: jasmine.createSpyObj('Router', ['navigate']) }),
//         provide(HeroService, { useClass: MockHeroService }),
//         MockHeroService,
//         HeroesComponent,
//         TestComponentBuilder,
//         HeroService
//     ]);

//     beforeEach(inject([HeroesComponent, Router, MockHeroService, TestComponentBuilder],
//         (c, r, s, _tcb) => {
//             testingComponent = c;
//             service = s;
//             router = r;
//             tcb = _tcb;
//         })
//     );

//     it('Should display Heroes upon init', done => {
//         tcb.overrideProviders(HeroesComponent,
//             [
//                 provide(HeroService, { useClass: MockHeroService })
//             ])
//             .createAsync(HeroesComponent).then(fixture => {
//                 fixture.detectChanges();
//                 let nativeElement = fixture.nativeElement;
//                 let component = fixture.componentInstance;

//                 let initTest = () => {
//                     expect(component.heroes).toBeDefined();
//                     expect(component.heroes.length).toBe(10);
//                     let heroItems = nativeElement.querySelectorAll('ul.heroes li');
//                     expect(heroItems).toBeDefined();
//                     expect(heroItems.length).toBe(10);
//                     done();
//                 };

//                 component.ngOnInit();
//                 fixture.detectChanges();

//                 setTimeout(initTest);
//             })
//             .catch(e => done.fail(e));
//     });

//     it('Clicking Hero should display detail section', done => {
//         tcb.overrideProviders(HeroesComponent,
//             [
//                 provide(HeroService, { useClass: MockHeroService })
//             ])
//             .createAsync(HeroesComponent).then(fixture => {
//                 fixture.detectChanges();
//                 let nativeElement = fixture.nativeElement;
//                 let component = fixture.componentInstance;

//                 let test = () => {
//                     fixture.detectChanges();
//                     let selectedHeroText = nativeElement.querySelector('h2[name=selectedHeroText]');
//                     expect(component.selectedHero).toBeDefined();
//                     expect(selectedHeroText.innerText).toContain(component.selectedHero.name.toUpperCase());
//                     let detailsButton = nativeElement.querySelector('button[name=viewDetails]');
//                     expect(detailsButton).toBeDefined();
//                     done();
//                 };

//                 component.ngOnInit();
//                 fixture.detectChanges();
//                 let heroItems = nativeElement.querySelectorAll('ul.heroes li');
//                 heroItems[0].click();

//                 setTimeout(test);
//             })
//             .catch(e => done.fail(e));
//     });
//     it('Should navigate to Details upon clicking Details button', done => {
//         tcb.overrideProviders(HeroesComponent,
//             [
//                 provide(HeroService, { useClass: MockHeroService })
//             ])
//             .createAsync(HeroesComponent).then(fixture => {
//                 fixture.detectChanges();
//                 let nativeElement = fixture.nativeElement;
//                 let component = fixture.componentInstance;

//                 let test = () => {
//                     fixture.detectChanges();
//                     expect(router.navigate).toHaveBeenCalledWith(['HeroDetail', { id: +component.selectedHero.id }]);
//                     done();
//                 };

//                 component.ngOnInit();
//                 fixture.detectChanges();
//                 let heroItems = nativeElement.querySelectorAll('ul.heroes li');
//                 heroItems[0].click();
//                 fixture.detectChanges();
//                 let detailsButton = nativeElement.querySelector('button[name=viewDetails]');
//                 detailsButton.click();

//                 setTimeout(test);
//             })
//             .catch(e => done.fail(e));
//     });
// });
