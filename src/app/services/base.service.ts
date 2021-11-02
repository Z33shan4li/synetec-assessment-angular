import { Injectable, Injector } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class BaseService {

    private _baseUrl: string = environment.apiBaseUrl;

    constructor(private httpClient: HttpClient, _injector: Injector) { }

    protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': `application/json, text/plain, */*`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET'
        });

        return { headers: headers };
    }

    protected getBaseUrl(): string {
        return this._baseUrl;
    }

    get<T>(path: string): Observable<T> {
        return this.httpClient.get<T>(this.getBaseUrl() + path);
    }

    delete<T>(path: string): Observable<T> {
        return this.httpClient.delete<T>(this.getBaseUrl() + path);
    }
}
