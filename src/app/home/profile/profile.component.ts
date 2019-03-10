import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private fullName: any;
  private favTeam: any;
  private location: any;
  constructor() {
    debugger
    this.fullName = localStorage.getItem('full_name');
    this.location = localStorage.getItem('location_name');
    this.favTeam = localStorage.getItem('fav_team');
  }

  ngOnInit() {
  }

}
