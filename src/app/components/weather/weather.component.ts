import { Component, OnInit } from '@angular/core';
//import { WeatherForecastService } from '../../services/weather-forecast.service';
import { WeatherData } from '../../models/weatherdata.model';
import { ForecastData } from 'src/app/models/forecast.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  /*
   This is to show the forecasted weather information 
  */
  loadForecastWeather(e: any) {
    e.preventDefault();
    if(!!this.zip){
    this.LoadForecastWeather(this.zip).subscribe(
      res => {
        this.zipError = false;
        this.error = "";
        console.log(res);
        this.forecastData.name = res.city.name;
        for (var i = 7; i < res.list.length; i = i + 11)//Since we need 3 days, we need to Jumps 8 times to get to next day.(A day contains 8 list of details)
        {
          var details = new ForecastDetails();
          details.date = res.list[i].dt_txt;
          details.maxTemperature = res.list[i].main.temp_max;
          details.minTemperature = res.list[i].main.temp_min;
          details.description = res.list[i].weather[0].description;
          details.icon = res.list[i].weather[0].icon;
          this.forecastData.details.push(details);

        }
        this.showCurrent = false;
        this.showForecast = true;
      },
      err=>{
        this.error = "Invalid Zip Code";
        this.zipError = true;
      }
    )
    }
    else{
      this.zipError = true;
      this.error = "Please enter Zip code"
    }
    console.log(this.forecastData);
  }

  loadCurrentWeather(e: any) {
    e.preventDefault();
    console.log("Weather data called");
    if (!!this.zip) {
      this.zipError = false;
      this.LoadCurrentWeather(this.zip).subscribe(
        res => {
          this.error = "";
          this.weatherData.cityName = res.name;
          this.weatherData.description = res.weather[0].description;
          this.weatherData.currentTemperature = res.main.temp;
          this.weatherData.icon = res.weather[0].icon;
          this.weatherData.maxTemperature = res.main.temp_max;
          this.weatherData.minTemperature = res.main.temp_min;
          console.log(this.weatherData);
          this.showCurrent = true;
          this.showForecast = false;
        },
        err =>{
          this.error = "Invalid Zip code";
          this.zipError = true;
        }
      )
    }
    else {
      this.zipError = true;
      this.error = "Please Enter zip code";
    }

  }

  



  LoadCurrentWeather(zip: any): Observable<any> {
    return this.http.get("https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&APPID=cd6aaeaa6f082b9839d5867528c28221");
  }
  LoadForecastWeather(zip: any): Observable<any> {
    return this.http.get("https://api.openweathermap.org/data/2.5/forecast?zip=" + zip + "&APPID=cd6aaeaa6f082b9839d5867528c28221");
  }


  

}


//Client ID
// bwsM5g9O6gndZ-8YS1hysQ

// API Key
// 9ejLORKsQnr8xFJrWV8rQmRx0HQV_G443_wXMtTxy9NAYsBsgvxe6zMUwIQFfOdhNafiYX23Nyelv3PhRaNWnht2ETt8rzlCXoEHL9s38J8MoLMfJ2YcTAaHqAxuYXYx
