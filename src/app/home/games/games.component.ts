import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {WebServiceService} from '../../../services/web-service.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  length = 0;
  pageSize = 25;
  displayedColumns: string[] = ['date', 'homeTeam', 'visitor'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private webService: WebServiceService) {
    this.webService.httpGet('http://www.balldontlie.io/api/v1/games/').then((success: any) => {
      console.log('success ', success.data);
      ELEMENT_DATA = success.data;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  pageChange(pageNumber) {
    console.log('30 ', pageNumber);
    const url = 'http://www.balldontlie.io/api/v1/games/?page=' + pageNumber;
    this.webService.httpGet(url).then((success: any) => {
      console.log('success ', success.data);
      ELEMENT_DATA = success.data;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

}

export interface PeriodicElement {
  date: string;
  homeTeam: number;
  visitor: number;
}

let ELEMENT_DATA = [
];
