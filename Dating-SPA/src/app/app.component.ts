import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtTokenService = new JwtHelperService();

  constructor(private authservice: AuthService){}

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.authservice.decodedToken = this.jwtTokenService.decodeToken(token);
  }

}
