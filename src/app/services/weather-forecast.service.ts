import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const url: string = 'https://api.openweathermap.org/data/2.5/';
@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(private http: HttpClient) { }

  LoadForecastWeather(zip: any, type: string, context: any) {
    this.http.
    get(url + type + "?zip=" + zip + ",us&APPID=cd6aaeaa6f082b9839d5867528c28221&units=imperial").
    subscribe(res => {
      if (type == 'weather') {
        context.loadCurrentWeather(res);
      } else {
        context.loadForecast(res);
      }
    }, err => {
      if (type == 'forecast'){
        context.loadCurrentWeather(undefined, err)
      }
      else{
        context.loadForecast(undefined,err);
      }
    });

  }

}