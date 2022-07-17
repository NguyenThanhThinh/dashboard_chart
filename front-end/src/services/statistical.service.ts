import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from "src/environments/environment";
const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class StatisticalService extends BaseService {
  constructor(public override http: HttpClient) {
    super(http, `${API}Statistical`);
  }
}
