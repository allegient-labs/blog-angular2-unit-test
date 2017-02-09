import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { HeroSearchComponent } from './hero-search.component';
import { HeroSearchService } from './hero-search.service';
import { MockHeroSearchService } from './Testing/mocks';

describe('HeroSearch Component', () => {
    let router;

    beforeEach(() => {
        router = {
            navigate: jasmine.createSpy('navigate')
        };

        TestBed.configureTestingModule({
            declarations: [HeroSearchComponent], // declare the test component
            imports: [FormsModule, HttpModule],
            providers: [
                { provide: HeroSearchService, useClass: MockHeroSearchService },
                { provide: Router, useValue: router }
            ]
        });
    });

    it('Should find Hero upon typing', (done) => {
        TestBed.overrideComponent(HeroSearchComponent, {
            set: {
                providers: [
                    {  provide: HeroSearchService, useClass: MockHeroSearchService}
                ]
            }
        }).compileComponents().then(() => {
            const fixture = TestBed.createComponent(HeroSearchComponent);
            fixture.detectChanges();
            let nativeElement = fixture.nativeElement;
            let component = fixture.componentInstance;

            let initTest = () => {
                fixture.detectChanges();
                expect(component.heroes).toBeDefined();
                let searchResults = nativeElement.querySelectorAll('div.search-result');
                expect(searchResults).toBeDefined();
                expect(searchResults.length > 0).toBe(true, 'SearchResults Count Failed');
                done();
            };

            component.ngOnInit();
            fixture.detectChanges();
            component.search('Bom');

            setTimeout(initTest, 300);
        }).catch(e => done.fail(e));
    });

    it('Clicking navigate to details upon clicking result', (done) => {
          TestBed.overrideComponent(HeroSearchComponent, {
            set: {
                providers: [
                    {  provide: HeroSearchService, useClass: MockHeroSearchService}
                ]
            }
        }).compileComponents().then(() => {
            const fixture = TestBed.createComponent(HeroSearchComponent);
            fixture.detectChanges();
            let nativeElement = fixture.nativeElement;
            let component = fixture.componentInstance;

            let initTest = () => {
                fixture.detectChanges();
                expect(component.heroes).toBeDefined();
                let searchResults = nativeElement.querySelectorAll('div.search-result');
                expect(searchResults).toBeDefined();
                expect(searchResults.length > 0).toBe(true, 'SearchResults Count Failed');
                searchResults[0].click();
                fixture.detectChanges();
                expect(router.navigate).toHaveBeenCalledWith([ '/detail', 1 ]);
                done();
            };

            component.ngOnInit();
            fixture.detectChanges();
            component.search('Bom');

            setTimeout(initTest, 300);
        }).catch(e => done.fail(e));
    });
});
