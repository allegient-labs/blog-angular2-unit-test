import { bootstrap }    from '@angular/platform-browser-dynamic';
import {HTTP_BINDINGS, BrowserXhr, HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import { AppComponent } from './app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

bootstrap(AppComponent,[
    ROUTER_PROVIDERS,
    HTTP_BINDINGS,
    HTTP_PROVIDERS
]);
