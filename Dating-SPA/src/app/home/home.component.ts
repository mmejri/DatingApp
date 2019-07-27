import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  RegisterMode = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  toogleClick() {
    this.RegisterMode = !this.RegisterMode;
  }

  talkReceiver(event: string) {
    this.RegisterMode = false;
  }


}
