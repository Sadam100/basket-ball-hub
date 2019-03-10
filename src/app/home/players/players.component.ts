import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {WebServiceService} from '../../../services/web-service.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  length = 0;
  pageSize = 25;
  private playerName: any;
  displayedColumns: string[] = ['name', 'position', 'teamName'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private webService: WebServiceService) {
    this.webService.httpGet('http://www.balldontlie.io/api/v1/players').then((success: any) => {
      console.log('success ', success.data);
      ELEMENT_DATA = success.data;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
  }
  searchByName() {
    console.log(this.playerName);
    const url = 'http://www.balldontlie.io/api/v1/players?search=' + this.playerName;
    this.webService.httpGet(url).then((success: any) => {
      console.log('success ', success);
      ELEMENT_DATA = success.data;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }
  pageChange(pageNumber) {
    console.log('30 ', pageNumber);
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
  name: string;
  position: number;
  teamName: number;
}

let ELEMENT_DATA = [
];
