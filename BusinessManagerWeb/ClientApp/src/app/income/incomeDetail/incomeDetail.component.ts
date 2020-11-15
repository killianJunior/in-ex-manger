import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/data-model/expense';
import { Income } from 'src/app/data-model/income';
import { ExpenseService } from 'src/app/services/expense.service';
import { IncomeService } from 'src/app/services/income.service';

@Component({
  selector: 'app-incomeDetail',
  templateUrl: './incomeDetail.component.html',
  styleUrls: ['./incomeDetail.component.scss']
})
export class IncomeDetailComponent implements OnInit {

  pageTitle = 'Detail Page';
  errorMessage = '';

  income: Income;
  date: Date;
  incomeExpenses: Expense[];
  expenseTotal: number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: IncomeService,
              private exService: ExpenseService) { }

  ngOnInit() {
    const stateParams = this.route.snapshot.paramMap.get('id');
    if(stateParams != null) {
      const id = stateParams;
      this.getIncome(id);
    }
  }

  getIncome(id: string): void {
    this.service.getIncomeDetail(id).subscribe({
      next: income => this.income = income,
      error: err => this.errorMessage = err
    })    
    if(this.income){
      let date = this.income.entryDate
      this.exService.getExpensesByDate(date).subscribe(
        data => {
          this.incomeExpenses = data;
          this.incomeExpenses.forEach(a => this.expenseTotal += a.amount)
        }
      )
    }
  }

  /*getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }*/

}
