import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  @Output() talk = new EventEmitter();

  // objs: string[] = ['objArray', 'aaaaaa' ];

  constructor(private authService: AuthService , private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(
      () => {this.alertify.success('Registration successfull.'); },
      (err => {this.alertify.error(err); }));
    console.log(this.model);
  }

  cancel() {
    this.talk.emit('aaa');
  }

}
