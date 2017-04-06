import { Observable } from 'rxjs/Rx';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

export class MockHeroService extends HeroService {
    constructor() {
        super(null);
    }
    getHeroes() {
        return Observable.of(HEROES);
    }
    getHero(id: number): Observable<any> {
        let hero = new Hero();
        hero.id = id;
        hero.name = 'Test Hero' + id;
        return Observable.of(hero);
    }
}