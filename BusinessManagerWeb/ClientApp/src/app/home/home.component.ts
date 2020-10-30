import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from '../data-model/expense';
import { Genexpense } from '../data-model/genexpense';
import { Income } from '../data-model/income';
import { ExpenseService } from '../services/expense.service';
import { GenexpenseService } from '../services/genexpense.service';
import { IncomeService } from '../services/income.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home-component.scss']
})
export class HomeComponent implements OnInit {

  totalBal: number = 0;
  totalGenExpenses: number = 0;
  currentBal: number = 0;
  totalIncome: number = 0;
  genExpenseTotal: number = 0;

  incomeHistory: Income[];
  expenseHistory: Expense[];
  genExs: Genexpense[];

  constructor(private incomeService: IncomeService,
              private expenseService: ExpenseService,
              private router: Router,
              private genServices: GenexpenseService) { }



  ngOnInit() {
    this.incomeService.getIncomeHistory().subscribe({
      next: incomeHistory => {
        if (incomeHistory != null) {
          this.incomeHistory = incomeHistory;
          this.incomeHistory.forEach(a => this.totalBal += a.balance)
            console.log(this.totalBal);
        }
      }
       });

       this.incomeService.getIncomeHistory().subscribe(
         data => {
            this.incomeHistory = data;
            this.incomeHistory.forEach(i => this.totalIncome += i.amountMade)
            console.log('income bal:', this.totalIncome);
         }
       );

       this.expenseService.getExpenses().subscribe(
         data => {
           this.expenseHistory = data;
           this.expenseHistory.forEach(e => this.totalGenExpenses += e.amount)
           console.log('expense bal:', this.totalGenExpenses)
         }
       );

       this.genServices.getGenExpenses().subscribe(
        data => {
          this.genExs = data;
          this.genExs.forEach(c => this.genExpenseTotal += c.amount);
          this.currentBal = this.totalBal - this.genExpenseTotal
          console.log('current bal:', this.currentBal)
          console.log('gen-ex bal:', this.genExpenseTotal)
        }
       );



  }

  addIncomeLink() {
    this.router.navigate(['/dailyincome']);
  }

  addExpenseLink(){
    this.router.navigate(['/expense']);
  }
  addGenExpenseLink(){
    this.router.navigate(['/expensehistory']);
  }


}
