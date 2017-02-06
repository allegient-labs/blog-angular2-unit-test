import { Injectable } from '@angular/core';
import { BaseService } from './baseService';
import { HEROES } from './mock-heroes';
import { Http, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class HeroService extends BaseService {
    constructor(http: Http) {
        super(http);
    }
    getHeroes() {
        // return Promise.resolve(HEROES);
        let headers = this.getHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get('./mock-heroes.json', options)
        .map(this.extractData)
        .catch(this.handleError);
    }
    getHero(id: number): Observable<any> {
        return Observable.of<any>(Promise.resolve(HEROES).then(
            heroes => heroes.filter(hero => hero.id === id)[0]
        )).catch(this.handleError);
    }
}
