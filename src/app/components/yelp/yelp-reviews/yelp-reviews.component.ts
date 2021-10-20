import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReviewData } from 'src/app/models/review.model';
@Component({
  selector: 'app-yelp-reviews',
  templateUrl: './yelp-reviews.component.html',
  styleUrls: ['./yelp-reviews.component.css']
})
export class YelpReviewsComponent implements OnInit {

  rating: number = 0;
  starCount: number = 5;
  color: string = "warn";
  
  reviewArray = new Array<ReviewData>();
  business: string="";
  businessLoc: string="";

  headerDict = {
    'Authorization': 'Bearer 9ejLORKsQnr8xFJrWV8rQmRx0HQV_G443_wXMtTxy9NAYsBsgvxe6zMUwIQFfOdhNafiYX23Nyelv3PhRaNWnht2ETt8rzlCXoEHL9s38J8MoLMfJ2YcTAaHqAxuYXYx',
  }

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getReviews(e: any) {
    
    let responseObj;
    e.preventDefault();
    this.getYelpReviews().subscribe(
      res => {
        responseObj = res;
        let id = responseObj.businesses[0].id;
        this.getBusinessReviews(id);
      }
    )
  }


  getBusinessReviews(id: string){
    let resObj: any;
    
    this.http.get("https://corsanywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+id+"/reviews", this.requestOptions).subscribe(
      res=>{
        resObj =res;
        console.log("Raw data", res);
        for(var i=0;i<resObj.reviews.length;i++){
          var review = new ReviewData();
          console.log("Response", resObj.reviews[i].text);
          review.name = resObj.reviews[i].user.name;
          review.reviewText = resObj.reviews[i].text;
          review.rating = resObj.reviews[i].rating;
          review.date = resObj.reviews[i].time_created;
          review.imageurl = resObj.reviews[i].user.image_url;
          this.reviewArray.push(review);

        }
        console.log("Reviews", this.reviewArray);
       
      }
    );


  }
  getYelpReviews(): Observable<any> {
    let resObj : any;
    let id;
     return this.http
    .get("https://corsanywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="+this.business+"&location="+this.businessLoc+"", this.requestOptions)
    // .subscribe((res)=>{
    //   resObj = res;
    //   id = resObj.businesses[0].id;
    //   console.log(id);
    //   //return this.http.get("https://corsanywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+id+"/reviews", this.requestOptions);
    // })
  // return this.http.get("https://corsanywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+id+"/reviews", this.requestOptions);

  }

}
