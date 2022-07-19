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

  getGetPatientDepartmentStatisticals(filter: {}) {
    return this.http.get(this.routerPrefix + "/get-patient-departments-statistical",{ params: filter });
  }
  getGetPatientAgeStatisticals(filter: {}) {
    return this.http.get(this.routerPrefix + "/get-patient-age-statistical",{ params: filter });
  }
  getGetPatientSexStatisticals(filter: {}) {
    return this.http.get(this.routerPrefix + "/get-patient-sex-statistical",{ params: filter });
  }
  getGetPatientInputStatisticals(filter: {}) {
    return this.http.get(this.routerPrefix + "/get-patient-input-departments-statistical",{ params: filter });
  }
  getGetPatientModelStatisticals(filter: {}) {
    return this.http.get(this.routerPrefix + "/get-patient-model-statistical",{ params: filter });
  }
  getPatientStatisticDashboard(filter: {}) {
    return this.http.get(this.routerPrefix + "/get-patient-dashboard-statistical",{ params: filter });
  }
  getGroupServiceDashboard(filter: {}) {
    return this.http.get(this.routerPrefix + "/get-group-service-dashboard-statistical",{ params: filter });
  }
}
