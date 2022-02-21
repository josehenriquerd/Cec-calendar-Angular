import { Component } from '@angular/core';
import {HttpClient, HttpHandler} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'TelaLogin';
  photos: Object[]=[];

  constructor(http: HttpClient){
     http.get<object[]>('http://localhost:8686/')
    .subscribe(photos=> this.photos = photos);
  }
}
