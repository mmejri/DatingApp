import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  @Output() talk = new EventEmitter();

  // objs: string[] = ['objArray', 'aaaaaa' ];

  constructor(private authService: AuthService ) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(
      () => {console.log('Registration successfull.'); },
      (err => {console.log(err); }));
    console.log(this.model);
  }

  cancel() {
    console.log('Canceled');
    this.talk.emit('aaa');
  }

}
