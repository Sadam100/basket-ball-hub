import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebServiceService} from '../../../services/web-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user = {
    email : '',
    password : ''
  };

  constructor(private webservice: WebServiceService, public router: Router) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.webservice.httpPost('/userSignIn', form.value).then((success: any) => {
      const user = success.userData;
      console.log('user ', user);
      localStorage.setItem('access_token', user.token);
      localStorage.setItem('full_name', user.FullName);
      localStorage.setItem('location_name', user.Location);
      localStorage.setItem('fav_team', user.FavouriteTeam);
      this.router.navigate(['/home/games']);
    });
    // this.webservice.httpSubPost('/userSignIn', form.value).subscribe((success: any) => {
    //   console.log(success);
    //   const user = success.userData;
    //   if (success.userData) {
    //     console.log();
    //   }
    // });
  }
}
