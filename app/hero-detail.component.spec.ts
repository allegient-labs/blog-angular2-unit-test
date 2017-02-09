import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpModule } from '@angular/http';
import { Location } from '@angular/common';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { MockHeroService } from './Testing/mocks';
import { MockActivatedRoute } from './Testing/mockActivatedRoute';

describe('HeroDetail Component', () => {
    let mockActivatedRoute;
    let mockLocation;

    beforeEach(() => {
        mockActivatedRoute = new MockActivatedRoute({ 'id': 12 });
        mockLocation = jasmine.createSpyObj('Location', ['back']);

        TestBed.configureTestingModule({
            declarations: [HeroDetailComponent], // declare the test component
            imports: [FormsModule, HttpModule],
            providers: [
                { provide: HeroService, useClass: MockHeroService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: Location, useValue: mockLocation }
            ]
        });
    });

    it('Should display Hero Details upon init', async(() => {
        TestBed.compileComponents().then(() => {
            const fixture = TestBed.createComponent(HeroDetailComponent);
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
            };

            component.ngOnInit();
            fixture.detectChanges();

            setTimeout(initTest);
        });
    }));

    it('Clicking back button should go back', async(() => {
        TestBed.compileComponents().then(() => {
            spyOn(window.history, 'back').and.callFake(function () {
                return true;
            });
            const fixture = TestBed.createComponent(HeroDetailComponent);
            fixture.detectChanges();
            let nativeElement = fixture.nativeElement;
            let component = fixture.componentInstance;

            let test = () => {
                fixture.detectChanges();
                expect(mockLocation.back).toHaveBeenCalled();
            };

            component.ngOnInit();
            fixture.detectChanges();
            let backButton = nativeElement.querySelector('#goBack');
            backButton.click();

            setTimeout(test);
        });
    }));
});
