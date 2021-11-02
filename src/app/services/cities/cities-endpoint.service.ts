import { Injectable, Injector } from "@angular/core";
import { environment } from "../../../environments/environment";
import { BaseService } from "../base.service";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { ICity } from "../../models/city.model";

@Injectable()
export class CitiesEndpoint extends BaseService {

    private citiesControllerEndPoint: string = 'api/cities';

    constructor(private _httpClient: HttpClient, private _injector: Injector) {
        super(_httpClient, _injector);
    }

    getCities(): Observable<ICity[]> {
        return this.get<ICity[]>(this.citiesControllerEndPoint).pipe();
    }

    deleteCity(city: ICity): Observable<ICity> {
        const url = `${this.citiesControllerEndPoint}/delete-city/${city.id}`;
        return this.delete<ICity>(url).pipe();
    }
}