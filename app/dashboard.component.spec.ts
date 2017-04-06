import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {DashboardComponent} from './dashboard.component';
import {HeroSearchComponent} from './hero-search.component';
import {HeroService} from './hero.service';
import {MockHeroService} from './Testing/mocks';

describe('Dashboard Component', () => {
    let router;

    beforeEach(() => {
        router = {
            navigate: jasmine.createSpy('navigate')
        };

        TestBed.configureTestingModule({
            declarations: [DashboardComponent], // declare the test component
            imports: [FormsModule, HttpModule],
            providers: [
                { provide: HeroService, useClass: MockHeroService },
                { provide: Router, useValue: router }
            ],
            // Tells the compiler not to error on unknown elements and attributes
            schemas: [NO_ERRORS_SCHEMA]
        });
    });

    it('Should get first 4 Heroes on init', async(() => {
        TestBed.compileComponents().then(() => {
            const fixture = TestBed.createComponent(DashboardComponent);
            fixture.detectChanges();
            let nativeElement = fixture.nativeElement;
            let component = fixture.componentInstance;

            let initTest = () => {
                expect(component.heroes).toBeDefined();
                expect(component.heroes.length).toBe(4);
                fixture.detectChanges();
                let heroes = nativeElement.querySelectorAll('div.module h4');
                expect(heroes).toBeDefined();
                expect(heroes.length).toBe(4);
            };

            component.ngOnInit();
            fixture.detectChanges();

            setTimeout(initTest);
        });
    }));

    it('Clicking hero should navigate to Hero Details', async(() => {
        TestBed.compileComponents().then(() => {
            const fixture = TestBed.createComponent(DashboardComponent);
            fixture.detectChanges();
            let nativeElement = fixture.nativeElement;
            let component = fixture.componentInstance;

            let test = () => {
                expect(component.heroes).toBeDefined();
                expect(component.heroes.length).toBe(4);
                fixture.detectChanges();
                let heroes = nativeElement.querySelectorAll('div.module h4');
                heroes[0].click();
                expect(router.navigate).toHaveBeenCalledWith([ '/detail', 12 ]);
            };

            component.ngOnInit();
            fixture.detectChanges();

            setTimeout(test);
        });
    }));
});
