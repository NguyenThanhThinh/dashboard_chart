import { HttpClient } from "@angular/common/http";

export class BaseService {
  constructor(public http: HttpClient, public routerPrefix: string) { }

  get(filter: {}) {
    return this.http.get(this.routerPrefix, { params: filter });
  }
  getDepartments() {
    return this.http.get(this.routerPrefix + "/get-departments");
  }
  getPatients() {
    return this.http.get(this.routerPrefix + "/get-patients");
  }
  getDashboards() {
    return this.http.get(this.routerPrefix + "/get-dashboard");
  }
}