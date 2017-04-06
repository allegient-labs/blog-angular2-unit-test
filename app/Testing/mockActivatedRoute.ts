import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export class MockActivatedRoute extends ActivatedRoute {
    params: Observable<Params>;

    constructor(parameters?: { [key: string]: any; }) {
        super();
        this.params = Observable.of(parameters);
    }
}