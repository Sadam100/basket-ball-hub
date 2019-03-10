import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {WebServiceService} from '../../../services/web-service.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  length = 0;
  pageSize = 25;
  displayedColumns: string[] = ['city', 'fullName', 'shortName'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private webService: WebServiceService) {
    this.webService.httpGet('http://www.balldontlie.io/api/v1/teams').then((success: any) => {
      console.log('success ', success.data);
      ELEMENT_DATA = success.data;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
  }

  pageChange(pageNumber) {
    const url = 'http://www.balldontlie.io/api/v1/teams/?page=' + pageNumber;
    this.webService.httpGet(url).then((success: any) => {
      console.log('success ', success.data);
      ELEMENT_DATA = success.data;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

}

export interface PeriodicElement {
  city: string;
  fullName: number;
  shortName: number;
}

let ELEMENT_DATA = [
];
