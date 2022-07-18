import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Department } from 'src/models/department.model';
import { Patient } from 'src/models/patient.model';
import { StatisticalService } from 'src/services/statistical.service';
import { ChartType } from 'angular-google-charts';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  filter = {
    toDate: this.subMonth(2),
    endDate: new Date()
  }
  areaChart = ChartType.AreaChart;
  barChart = ChartType.BarChart;
  columnChart = ChartType.ColumnChart;
  lineChart = ChartType.LineChart;
  pieChart = ChartType.PieChart;

  data: any[] = [];
  dataPatientExport: any[] = [];
  dataAge: any[] = [];
  dataSex: any[] = [];

  columnNames = ['Language', 'Số lượng'];

  columnAge = ['Language', 'Số bệnh nhân'];

  width = 580;

  height = 500;

  donutOptions = {
    pieHole: 0.5
  }

  
  constructor(
    private statisticalService: StatisticalService,
    private spinner: NgxSpinnerService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    
this.getData();

  }
  getData() {
     
    this.spinner.show();
    this.statisticalService.get({
      
      toDate: moment(new Date(this.filter.toDate)).format("YYYY-MM-DD"),
      endDate: moment(new Date(this.filter.endDate)).format("YYYY-MM-DD"),
      
    })
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((resp: any) => {
        let listArray = resp;
        this.data=[];
        for (let row in listArray) {
          this.data.push([
            listArray[row].khoa.toString(),
            listArray[row].tong,
          ]);
        }
      }, error => {
        this.messageService.error(error.error.message);
      })
    this.getPatientDepartmentStatistical();
    this.getPatientAge();
    this.getPatientSex();
  }
  getPatientDepartmentStatistical(){
    this.spinner.show();
    this.statisticalService.getGetPatientDepartmentStatisticals({
      
      toDate: moment(new Date(this.filter.toDate)).format("YYYY-MM-DD"),
      endDate: moment(new Date(this.filter.endDate)).format("YYYY-MM-DD"),
      
    })
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((resp: any) => {
        let listArray = resp;
        this.dataPatientExport=[];
        for (let row in listArray) {
          this.dataPatientExport.push([
            listArray[row].khoavaO_TEN.toString(),
            listArray[row].tong,
          ]);
        }
      }, error => {
        this.messageService.error(error.error.message);
      })
  }
  getPatientAge(){
    this.spinner.show();
    this.statisticalService.getGetPatientAgeStatisticals({
      
      toDate: moment(new Date(this.filter.toDate)).format("YYYY-MM-DD"),
      endDate: moment(new Date(this.filter.endDate)).format("YYYY-MM-DD"),
      
    })
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((resp: any) => {
        let listArray = resp;
        this.dataAge=[];
        for (let row in listArray) {
          this.dataAge.push([
            listArray[row].group.toString(),
            listArray[row].key,
          ]);
        }
      }, error => {
        this.messageService.error(error.error.message);
      })
  }

  getPatientSex(){
    this.spinner.show();
    this.statisticalService.getGetPatientSexStatisticals({
      
      toDate: moment(new Date(this.filter.toDate)).format("YYYY-MM-DD"),
      endDate: moment(new Date(this.filter.endDate)).format("YYYY-MM-DD"),
      
    })
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((resp: any) => {
        let listArray = resp;
        this.dataSex=[];
        for (let row in listArray) {
          this.dataSex.push([
            listArray[row].sex.toString(),
            listArray[row].count,
          ]);
        }
      }, error => {
        this.messageService.error(error.error.message);
      })
  }
 subMonth(monthsToAdd:number) {
    var d = new Date();
    d.setDate(d.getMonth()-monthsToAdd);
    return d;
}

}
