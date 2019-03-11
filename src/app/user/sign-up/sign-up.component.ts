import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebServiceService} from '../../../services/web-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  selectedUser = {
    fullName: '',
    email: '',
    password: '',
    location: '',
    favTeam: ''
  };
  constructor(private webservice: WebServiceService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    console.log('12 ', form.value);
    this.webservice.httpPost('http://localhost:3000/api/userSignUp', form.value).then(res => {
        console.log('Success');
        this.resetForm(form);
      },
      err => {
        console.log(err);
      }
    );
  }
  resetForm(form: NgForm) {
    this.selectedUser = {
      fullName: '',
      email: '',
      password: '',
      location: '',
      favTeam: ''
    };
    form.resetForm();
  }
}
