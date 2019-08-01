import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] ;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions = [
      {
          width: '500px',
          height: '500px',
          imagePercent: 100,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: false
      }
  ];

  this.galleryImages = [];
  for (let index = 0; index < this.user.photos.length; index++) {
    this.galleryImages.push({
      small: this.user.photos[index].url,
      medium: this.user.photos[index].url,
      big: this.user.photos[index].url,
      description: this.user.photos[index].description
    });
  }

  }

  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe(
  //     (user: User) => {this.user = user; }, error => {
  //       this.alertify.error(error);
  //     }
  //   );
  // }

}
