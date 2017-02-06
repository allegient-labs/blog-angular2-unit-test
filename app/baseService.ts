import { Http, Headers, RequestOptions, Response, RequestOptionsArgs} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

export class BaseService {
    constructor(protected http: Http) { }
    extractData(res: Response) {
        let body;
        if (res.text()) {
            body = res.json();
        }
        return body || {};
    }
    getNoCache(url: string, options?: RequestOptionsArgs): Observable<any> {
        let noCacheFix = new Date().getTime();
        return this.http.get(url + '?time=' + noCacheFix, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    handleError(error: any) {
        let errMsg;
        if (error instanceof Error) {
            errMsg = error.message || 'Server error';
        } else if (error.length != 0) {
            let errorJson = error.json();
            errMsg = errorJson.Message || errorJson.statusText || 'Server error';
        } else {
            errMsg = 'Server Error';
        }
        console.error('Service: ' + errMsg);
        return Observable.throw(errMsg);
    }
    getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, OPTIONS');
        headers.append('Access-Control-Allow-Headers', 'origin, content-type, accept');
        headers.append('Access-Control-Allow-Credentials', 'true');
        return headers;
    }
}
