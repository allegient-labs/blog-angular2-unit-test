import { Injectable } from '@angular/core';
import { BaseService } from './baseService';
import { HEROES } from './mock-heroes';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService extends BaseService {
    private heroesUrl = 'api/heroes';  // URL to web api

    constructor(http: Http) {
        super(http);
    }
    getHeroes() {
        let headers = this.getHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.heroesUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getHero(id: number): Observable<any> {
        const url = `${this.heroesUrl}/${id}`;
        let headers = this.getHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        let headers = this.getHeaders();
        return this.http.delete(url, { headers: headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
    create(name: string): Promise<Hero> {
        let headers = this.getHeaders();
        return this.http
            .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: headers })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        let headers = this.getHeaders();
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), { headers: headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    // private handleError(error: any): Promise<any> {
    //     console.error('An error occurred', error); // for demo purposes only
    //     return Promise.reject(error.message || error);
    // }
}
