import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Expense } from 'src/app/data-model/expense';
import { Income } from 'src/app/data-model/income';
import { GenericValidator } from 'src/app/directives/generic--validator';
import { ExpenseService } from 'src/app/services/expense.service';
import { IncomeService } from 'src/app/services/income.service';

@Component({
  // selector: 'app-dailyIncome',
  templateUrl: './dailyIncome.component.html',
  styleUrls: ['./dailyIncome.component.scss']
})
export class DailyIncomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Daily Income'
  errorMessage: string;

  income = new Income();
  private sub: Subscription;
  latestExpenses: Expense[];
  queryDate = new Date().toLocaleDateString();
  expensesTotal: number = 0;

  newIncomeForm: FormGroup;


  diplayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
              private router: Router,
              private incomeService: IncomeService,
              private expenseService: ExpenseService,
              private datePipe: DatePipe,
              private notify: ToastrService) {

    // Validation Messages for income form!!!

    this.validationMessages = {
      amountMade: {
        required: 'Specify Amount made today'
      },
      dailyAllowance: {
        required: 'Input amount is requird'
      },
      expenses: {
        required: 'Select daily expense'
      },
      savings: {
        required: 'Specify savings amount'
      },
      entryDate:{
        requird: 'Select Date'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.queryDate = this.datePipe.transform(this.queryDate, 'dd-MM-yyy');

   }

   ngOnInit() {
    this.createNewIncomeForm();
    // console.log(this.queryDate);
    this.expenseService.getExpensesByDate(this.queryDate).subscribe(
      data => {
      this.latestExpenses = data;
      this.latestExpenses.forEach(a => this.expensesTotal += a.amount);
      // console.log(data);
      // console.log(this.expensesTotal)
      },
      error => {
        console.log('httperror:');
        console.log(error);
      })

  }

  ngAfterViewInit(): void{

    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.newIncomeForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.diplayMessage = this.genericValidator.processMessages(this.newIncomeForm);
    });
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  createNewIncomeForm() {
    this.newIncomeForm = this.fb.group({

      amountMade: [null, Validators.required ],
      dailyAllowance: [null, Validators.required ],
      expenses: [null, Validators.required],
      savings: [null, Validators.required ],
      // From the above details, calculate my profit, %profit and Balance
      profit: [null],
      percentageProfit: [null],
      balance: [null],
      entryDate: [null, Validators.required]

    });
  }

  get amountMade(){
    return this.newIncomeForm.controls.amountMade as FormControl;
  }

  get dailyAllowance(){
    return this.newIncomeForm.controls.dailyAllowance as FormControl;
  }

  get expenses(){
    return this.newIncomeForm.controls.expenses as FormControl;
  }

  get savings(){
    return this.newIncomeForm.controls.savings as FormControl;
  }

  get entryDate(){
    return this.newIncomeForm.controls.entryDate as FormControl;
  }

  // createExpenseDateForm() {
  //   this.expenseDateForm = this.fb.group({
  //     expenseDate: [null, Validators.required]
  //   });
  // }

  // get expenseDate(){
  //   return this.expenseDateForm.controls.expenseDate as FormControl;
  // }

  // mapExpenseDateQuery(): void {
  //   this.expenseDateId = this.expenseDate.value;
  // }

  // getDatedExpenses(){

  // }

  saveIncome() {
    console.log("Form Verified!!")
    this.mapEntity();
    if (this.income.id === null ) {
      this.incomeService.addIncome(this.income)
        .subscribe({
          next: () => {
            this.router.navigate(['/incomehistory']),
            this.notify.success('In-Ex Manager!', 'Income Added!');
          },
          error: err => this.errorMessage = err
        })
    } else {
      this.notify.error('InEx-Manager!', 'Operation Failed');
    }
  }

  cancelEntry(){
    this.router.navigate(['/']);
  }

  mapEntity(): void {
    this.income.id = null;
    this.income.amountMade = this.amountMade.value;
    this.income.expenses = this.expenses.value;
    this.income.dailyAllowance = this.dailyAllowance.value;
    let leftover = this.amountMade.value - this.expenses.value;
    this.income.profit = leftover - this.dailyAllowance.value;
    this.income.percentageProfit = (10/100) * this.income.profit;
    this.income.entryDate = this.entryDate.value;
    this.income.savings = this.savings.value;
     let myValue = this.income.profit - this.income.percentageProfit;
    this.income.balance = myValue - this.income.savings;

  }

  AddExpenseLink() {
    this.router.navigate(['/expense']);
  }

}
