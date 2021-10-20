import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(private http: HttpClient) { }

  LoadForecastWeather(zip: any): Observable<any> {
    return this.http.get("https://api.openweathermap.org/data/2.5/forecast?zip="+zip+",us&APPID=cd6aaeaa6f082b9839d5867528c28221&units=imperial" );
  }

  LoadCurrentWeather(zip: any): Observable<any> {
    return this.http.get("https://api.openweathermap.org/data/2.5/weather?zip="+zip+",us&APPID=cd6aaeaa6f082b9839d5867528c28221&units=imperial" );
  }

}
//https://api.openweathermap.org/data/2.5/forecast?zip=78412,us&APPID=cd6aaeaa6f082b9839d5867528c28221