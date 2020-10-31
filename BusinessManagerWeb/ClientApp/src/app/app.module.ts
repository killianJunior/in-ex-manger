import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

/*import { InMemoryWebApiModule } from 'angular-in-memory-web-api';*/


import {TranslateModule} from '@ngx-translate/core';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './core_app/nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SidebarComponent } from './core_app/sidebar/sidebar.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './core_app/spinner/spinner.component';
import { DailyIncomeComponent } from './income/dailyIncome/dailyIncome.component';
import { IncomeHistoryComponent } from './income/incomeHistory/incomeHistory.component';
import { ExpenseComponent } from './expenses/expense/expense.component';
import { ExpenseHistoryComponent } from './expenses/expenseHistory/expenseHistory.component';
import { ExpenseService } from './services/expense.service';
import { IncomeService } from './services/income.service';
/*import { IncomeData } from 'src/mock-data/income-data';*/
import {  CustomAdapter, CustomDateParserFormatter } from './services/datepicker-adapter.service';
import { IncomeDetailComponent } from './income/incomeDetail/incomeDetail.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    SidebarComponent,
    SpinnerComponent,
    DailyIncomeComponent,
    IncomeHistoryComponent,
    ExpenseComponent,
    ExpenseHistoryComponent,
    IncomeDetailComponent
    
   ],

  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    //BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'dashboard', component: HomeComponent},
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'dailyincome', component: DailyIncomeComponent },
      { path: 'incomehistory', component: IncomeHistoryComponent },
      { path: 'expense', component: ExpenseComponent },
      { path: 'expensehistory', component: ExpenseHistoryComponent },
      { path: 'income-detail/:id', component: IncomeDetailComponent }

    ]),
   /* InMemoryWebApiModule.forRoot(IncomeData),*/
    TranslateModule.forRoot(),
    NgbModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ModalModule.forRoot()

  ],
  providers: [

    ExpenseService,
    IncomeService,
    DatePipe,
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
    /*{ provide: 'BASE_URL', useFactory: getBaseUrl }*/

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
