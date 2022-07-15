import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DENgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { CurrencyMaskConfig, CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
export const customCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ".",
  precision: 0,
  prefix: "",
  suffix: "",
  thousands: ",",
  nullable: true,
  inputMode: CurrencyMaskInputMode.NATURAL,
};
@NgModule({
  imports: [DashboardRoutingModule,
    DENgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    GoogleChartsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
