import { Injectable } from '@angular/core';
import { BaseService } from './baseService';
import { HEROES } from './mock-heroes';
import { Http, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class HeroService extends BaseService {
    constructor(http: Http) {
        super(http);
    }
    getHeroes() {
        let headers = this.getHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get('./app/mock-heroes.json', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getHero(id: number): Observable<any> {
        let headers = this.getHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get('./app/mock-heroes.json', options)
            .map(this.extractData)
            .map(data => data.filter(d => d.id === id)[0])
            .catch(this.handleError);
    }
}
