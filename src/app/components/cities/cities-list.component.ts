import { Component, OnInit } from "@angular/core";
import { ICity } from "../../models/city.model";
import { CitiesService } from "../../services/cities/cities.service";

@Component({
    selector: 'cities-list',
    templateUrl: './cities-list.component.html',
    styleUrls: ['./cities-list.component.css']
})

export class CitiesListComponent implements OnInit {

    cities: ICity[] = [];
    isLoading: boolean = false;

    constructor(private citiesService: CitiesService) { }

    ngOnInit(): void {
        this.getCities();
    }

    getCities(): void {
        this.isLoading = true;
        this.citiesService.getCities()
            .subscribe(citiesList => {
                this.isLoading = false;
                this.cities = citiesList;
            }, error => {
                this.isLoading = false;
                alert(error.message);
            });
    }

    deleteCity(city: ICity) {
        if (confirm("Are you sure to delete city " + city.name)) {
            this.isLoading = true;
            this.citiesService.deleteCity(city).subscribe(city => {
                this.isLoading = false;
                //this.getCities(); //Instead of splice this needs to be done but API is returning whole list every time
                this.cities.splice(this.cities.indexOf(city), 1)
            },
                error => {
                    this.isLoading = false;
                    alert(error.message);
                });
        }

    }
}