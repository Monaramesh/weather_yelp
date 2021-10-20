import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from '../../services/weather-forecast.service';
import { WeatherData } from '../../models/weatherdata.model';
import { ForecastData } from 'src/app/models/forecast.model';
import * as moment from 'moment'
import { ForecastDetails } from 'src/app/models/forecastDetail.model';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  showForecast: boolean = false;
  showCurrent: boolean = false;
  zipError: boolean = false;
  error: string = "";
  zip?: number;
  weatherData: WeatherData = new WeatherData();
  forecastData: ForecastData = new ForecastData();

  constructor(private wfc: WeatherForecastService) { }

  ngOnInit(): void {
  }

  /*
   This is to show the forecasted weather information 
  */
  loadForecast(res?: any, err?: any) {
    if (err) {
      this.zipError = true;
      this.error = "Invalid Zip Code";
      return;
    }
    let cDate = moment();
    let nDate;
    this.forecastData.name = res.city.name;
    this.showCurrent = false;
    this.showForecast = true;
    for (var i = 0; i < res.list.length; i = i + 1)
    {
      var details = new ForecastDetails();
      nDate = moment(res.list[i].dt_txt.slice(0, 10));
      if (nDate.isAfter(cDate)) {
        details.date = res.list[i].dt_txt;
        details.maxTemperature = res.list[i].main.temp_max;
        details.minTemperature = res.list[i].main.temp_min;
        details.description = res.list[i].weather[0].description;
        details.icon = res.list[i].weather[0].icon;
        this.forecastData.details.push(details);
        cDate = nDate;
      }
      if (this.forecastData.details.length == 3) {
        //bzc we need only 3 forecast details
        return;
      }
    }
  }

  loadCurrentWeather(res?: any, err?: any) {
    if (err) {
      this.error = "Invalid Zip Code"
      this.zipError = true;
      return;
    }
    this.error = "";
    this.zipError = false;
    this.showCurrent = true;
    this.showForecast = false;
    this.weatherData.cityName = res.name;
    this.weatherData.description = res.weather[0].description;
    this.weatherData.currentTemperature = res.main.temp;
    this.weatherData.icon = res.weather[0].icon;
    this.weatherData.maxTemperature = res.main.temp_max;
    this.weatherData.minTemperature = res.main.temp_min;
    console.log(this.weatherData);
    this.showCurrent = true;
    this.showForecast = false;
  }

  getWeatherInfo(e: any, type: string) {
    e.preventDefault();
    if (!!this.zip) {
      this.zipError = false;
      this.wfc.LoadForecastWeather(this.zip, type, this);
    } else {
      this.zipError = true;
      this.error = "Please Enter zip code";
    }
  }

}
