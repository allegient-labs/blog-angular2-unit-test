import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { HeroesComponent } from './heroes.component';
import { HeroService } from './hero.service';
import { MockHeroService } from './Testing/mocks';

describe('HeroesComponent', () => {
    let router;

    beforeEach(() => {
        router = {
            navigate: jasmine.createSpy('navigate')
        };

        TestBed.configureTestingModule({
            declarations: [HeroesComponent], // declare the test component
            imports: [FormsModule, HttpModule],
            providers: [
                { provide: HeroService, useClass: MockHeroService },
                { provide: Router, useValue: router }
        ]});
    });

    it('Should display Heroes upon init', async(() => {
        TestBed.compileComponents().then(() => {
            const fixture = TestBed.createComponent(HeroesComponent);
            fixture.detectChanges();
            let nativeElement = fixture.nativeElement;
            let component = fixture.componentInstance;

            let initTest = () => {
                expect(component.heroes).toBeDefined();
                expect(component.heroes.length).toBe(10);
                let heroItems = nativeElement.querySelectorAll('ul.heroes li');
                expect(heroItems).toBeDefined();
                expect(heroItems.length).toBe(10);
            };

            component.ngOnInit();
            fixture.detectChanges();

            setTimeout(initTest);
        });
    }));

    it('Clicking Hero should display detail section', async(() => {
        TestBed.compileComponents().then(() => {
            const fixture = TestBed.createComponent(HeroesComponent);
            fixture.detectChanges();
            let nativeElement = fixture.nativeElement;
            let component = fixture.componentInstance;

            let test = () => {
                fixture.detectChanges();
                let selectedHeroText = nativeElement.querySelector('h2[name=selectedHeroText]');
                expect(component.selectedHero).toBeDefined();
                expect(selectedHeroText.innerText).toContain(component.selectedHero.name.toUpperCase());
                let detailsButton = nativeElement.querySelector('button[name=viewDetails]');
                expect(detailsButton).toBeDefined();
            };

            component.ngOnInit();
            fixture.detectChanges();
            let heroItems = nativeElement.querySelectorAll('ul.heroes li');
            heroItems[0].click();

            setTimeout(test);
        });
    }));

    it('Should navigate to Details upon clicking Details button', async(() => {
        TestBed.compileComponents().then(() => {
            const fixture = TestBed.createComponent(HeroesComponent);
            fixture.detectChanges();
            let nativeElement = fixture.nativeElement;
            let component = fixture.componentInstance;

            let test = () => {
                fixture.detectChanges();
                expect(router.navigate).toHaveBeenCalledWith(['/detail', +component.selectedHero.id]);
            };

            component.ngOnInit();
            fixture.detectChanges();
            let heroItems = nativeElement.querySelectorAll('ul.heroes li');
            heroItems[0].click();
            fixture.detectChanges();
            let detailsButton = nativeElement.querySelector('button[name=viewDetails]');
            detailsButton.click();

            setTimeout(test);
        });
    }));
});
