import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Income } from 'src/app/data-model/income';
import { IncomeService } from 'src/app/services/income.service';

@Component({
  selector: 'app-incomeHistory',
  templateUrl: './incomeHistory.component.html',
  styleUrls: ['./incomeHistory.component.scss']
})
export class IncomeHistoryComponent implements OnInit {

  pageTitle = 'Income History'
  incomeHistory: Income[];
  errorMessage = '';
  noDataInArray: Income[];
  incomeTotal: number = 0;

  constructor(private incomeService: IncomeService,
              private notify: ToastrService,
              private router: Router,) { }

  ngOnInit() {
    this.incomeService.getIncomeHistory().subscribe({
      next: incomeHistory => {
        if (incomeHistory != null) {
          this.incomeHistory = incomeHistory;
          this.incomeHistory.forEach(a => this.incomeTotal += a.amountMade)
            console.log(this.incomeTotal);
        }
        if(incomeHistory === null) {
          this.noDataInArray = incomeHistory;
        }
      },
      error: err => this.errorMessage = err
       })
    }

  AddIncomeLink() {
    this.router.navigate(['/dailyincome']);
  }

}
