import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Department } from 'src/models/department.model';
import { Patient } from 'src/models/patient.model';
import { StatisticalService } from 'src/services/statistical.service';
import { ChartType } from 'angular-google-charts';
import * as moment from 'moment';
import { GroupService, ModelPatient } from 'src/models/statistic.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  filter = {
    toDate: this.subMonth(0),
    endDate: new Date()
  }
  areaChart = ChartType.AreaChart;
  barChart = ChartType.BarChart;
  columnChart = ChartType.ColumnChart;
  lineChart = ChartType.LineChart;
  pieChart = ChartType.PieChart;

  data: any[] = [];
  dataPatientExport: any[] = [];
  dataPatientInput: any[] = [];
  dataAge: any[] = [];
  dataSex: any[] = [];
  modelPatient : ModelPatient[]=[];
  groupServices : GroupService[]=[];
  totalCount: number = 0;
  totalDepartment1: number = 0;
  totalDepartment2: number = 0;
  totalDepartment3: number = 0;

  columnNames = ['Language', 'Số lượng'];

  columnAge = ['Language', 'Số bệnh nhân'];

  width = 580;

  height = 500;

  donutOptions = {
    pieHole: 0.5
  }
  options = {
  
    colors: ['#5cb85c', '#f0ad4e', '#d9534f', '#5bc0de']
  };
  
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
    this.getPatientStatisticDashboard();
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
    this.getPatientInput();
    this.getModelPatient();
    this.getGroupService();
    
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

  getPatientInput(){
    this.spinner.show();
    this.statisticalService.getGetPatientInputStatisticals({
      
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
        this.dataPatientInput=[];
        for (let row in listArray) {
          this.dataPatientInput.push([
            listArray[row].name.toString(),
            listArray[row].count,
          ]);
        }
      }, error => {
        this.messageService.error(error.error.message);
      })
  }

  getModelPatient(){
    this.spinner.show();
    this.statisticalService.getGetPatientModelStatisticals({
      
      toDate: moment(new Date(this.filter.toDate)).format("YYYY-MM-DD"),
      endDate: moment(new Date(this.filter.endDate)).format("YYYY-MM-DD"),
      
    })
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((resp: any) => {
       
        this.modelPatient=[];
        this.modelPatient= resp;
        
      }, error => {
        this.messageService.error(error.error.message);
      })
  }
  getPatientStatisticDashboard(){
    this.spinner.show();
    this.statisticalService.getPatientStatisticDashboard({
      
      toDate: moment(new Date(this.filter.toDate)).format("YYYY-MM-DD"),
      endDate: moment(new Date(this.filter.endDate)).format("YYYY-MM-DD"),
      
    })
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((resp: any) => {
       
        this.totalCount = resp.totalCount;
        this.totalDepartment1 = resp.totalDepartment1;
        this.totalDepartment2 = resp.totalDepartment2;
        this.totalDepartment3 = resp.totalDepartment3;
        
      }, error => {
        this.messageService.error(error.error.message);
      })
  }
  getGroupService(){
    this.spinner.show();
    this.statisticalService.getGroupServiceDashboard({
      
      toDate: moment(new Date(this.filter.toDate)).format("YYYY-MM-DD"),
      endDate: moment(new Date(this.filter.endDate)).format("YYYY-MM-DD"),
      
    })
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((resp: any) => {
       
        this.groupServices=[];
        this.groupServices= resp;
        
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
