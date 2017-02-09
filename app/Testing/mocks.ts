import { Observable } from 'rxjs/Rx';
import { HeroService } from '../hero.service';
import { HeroSearchService } from '../hero-search.service';
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
        let hero = new Hero(id, 'Test Hero' + id);
        return Observable.of(hero);
    }
    delete(id: number): Promise<void> {
        return Promise.resolve();
    }
    create(name: string): Promise<Hero> {
        let hero = new Hero(1, name);
        return Observable.of(hero).toPromise();
    }
    update(hero: Hero): Promise<Hero> {
        return Observable.of(hero).toPromise();
    }
}

export class MockHeroServiceError extends HeroService {
    constructor() {
        super(null);
    }
    getHeroes() {
        return Observable.throw(new Error('TEST ERROR'));
    }
    getHero(id: number): Observable<any> {
        return Observable.throw(new Error('TEST ERROR'));
    }
    delete(id: number): Promise<void> {
        throw new Error('TEST ERROR');
    }
    create(name: string): Promise<Hero> {
        throw new Error('TEST ERROR');
    }
    update(hero: Hero): Promise<Hero> {
        throw new Error('TEST ERROR');
    }
}

export class MockHeroSearchService extends HeroSearchService {
    constructor() {
        super(null);
    }

    search(term: string): Observable<Hero[]> {
        console.log('Using MockHeroSearchService');
        let heroes = new Array<Hero>();
        heroes.push(new Hero(1, 'Test' + term));
        return Observable.of(heroes);
    }
}

export class MockHeroSearchServiceError extends HeroSearchService {
    constructor() {
        super(null);
    }
    search(term: string): Observable<Hero[]> {
        return Observable.throw(new Error('TEST ERROR'));
    }
}
