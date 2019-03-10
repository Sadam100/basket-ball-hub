import { Component, OnInit } from '@angular/core';
import {WebServiceService} from '../../services/web-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private webService: WebServiceService, private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.webService.logout();
    this.router.navigate(['signin']);
  }

}
