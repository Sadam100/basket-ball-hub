import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {WebServiceService} from '../../../../services/web-service.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  private teamId: any;
  private teamFullName: any;
  private conference: any;
  private division: any;
  private abbreviation: any;
  constructor(private route: ActivatedRoute, private webService: WebServiceService) {
    this.teamId = this.route.snapshot.params['id'];
    console.log('13 ', this.teamId);
    const url = 'http://www.balldontlie.io/api/v1/teams/' + this.teamId;
    this.webService.httpGet(url).then((data: any) => {
      console.log('success ', data);
      this.teamFullName = data.full_name;
      this.conference = data.conference;
      this.division = data.division;
      this.abbreviation = data.abbreviation;
    });
  }
  ngOnInit() {
  }

}
