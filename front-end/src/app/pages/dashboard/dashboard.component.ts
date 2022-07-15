import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Department } from 'src/models/department.model';
import { Patient } from 'src/models/patient.model';
import { HomeService } from 'src/services/home.service';
import { ChartType } from 'angular-google-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  areaChart = ChartType.AreaChart;
  barChart = ChartType.BarChart;
  columnChart = ChartType.ColumnChart;
  lineChart = ChartType.LineChart;
  pieChart = ChartType.PieChart;

  data: any[] = [];

  columnNames = ['Language', 'Speakers (millions)'];

  width = 600;

  height = 400;

  donutOptions = {
    pieHole: 0.5
  }
  filter = {
    patientId: "",
    roomId: 0,
  }
  listArray = [
    {
      "Id": 1,
      "Name": "English",
      "SpeakersInMillions": 1132
    },
    {
      "Id": 2,
      "Name": "Mandarin",
      "SpeakersInMillions": 1117
    },
    {
      "Id": 3,
      "Name": "Hindi",
      "SpeakersInMillions": 665
    },
    {
      "Id": 4,
      "Name": "Spanish",
      "SpeakersInMillions": 534
    },
    {
      "Id": 5,
      "Name": "French",
      "SpeakersInMillions": 280
    },
    {
      "Id": 6,
      "Name": "Arabic",
      "SpeakersInMillions": 274
    },
    {
      "Id": 7,
      "Name": "Bengali",
      "SpeakersInMillions": 265
    },
    {
      "Id": 8,
      "Name": "Russian",
      "SpeakersInMillions": 258
    },
    {
      "Id": 9,
      "Name": "Portuguese",
      "SpeakersInMillions": 234
    },
    {
      "Id": 10,
      "Name": "Indonesian",
      "SpeakersInMillions": 198
    }
  ];
  constructor(
    private homeService: HomeService,
    private spinner: NgxSpinnerService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    for (let row in this.listArray) {
      this.data.push([
        this.listArray[row].Name.toString(),
        this.listArray[row].SpeakersInMillions,
      ]);
    }


  }


}
