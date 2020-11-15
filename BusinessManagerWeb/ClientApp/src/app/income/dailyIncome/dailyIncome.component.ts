import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
/*queryDate = new Date().toLocaleDateString();*/
  queryDate = new Date();
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
              private notify: ToastrService,
              private route: ActivatedRoute) {

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
   /* this.queryDate = this.datePipe.transform(this.queryDate, 'dd-MM-yyy');*/

   }

  ngOnInit() {
     this.createNewIncomeForm();

  /*Read Data Id from Route Parameter*/

  /*  this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getIncome(id);
      })*/

    /*this.expenseService.getExpensesByDate(this.queryDate).subscribe(
      data => {
      this.latestExpenses = data;
      this.latestExpenses.forEach(a => this.expensesTotal += a.amount);
      },
      error => {
        console.log('httperror:');
        console.log(error);
      })*/

  }

  /*getIncome(id: string): void {
    this.incomeService.getIncomeDetail(id)
      .subscribe({
        next: (income: Income) => this.displayIncome(income),
        error: err => this.errorMessage = err
      });
    console.log(this.income)
  }*/


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
   /*  this.sub.unsubscribe();*/
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

  saveIncome() {
    console.log("Form Verified!!")
    this.mapEntity();
    if (this.newIncomeForm.valid) {
      console.log(this.income)
      this.incomeService.createIncome(this.income)
        .subscribe({
          next: () => {
            this.notify.success('In-Ex Manager!', 'Income Added!'),
            this.router.navigate(['/incomehistory']);
          },
          error: err => this.notify.error('InEx-Manager!', 'Operation Failed')

        })
    } else {
      this.notify.error('InEx-Manager!', 'Operation Failed');
    }
  }


 /* saveIncome() {
      console.log('Form Verified')
      if (this.newIncomeForm.valid) {
        this.mapEntity();
        if (this.income.identifier === false) {
          console.log(this.income)
          this.incomeService.createIncome(this.income)
            .subscribe({
              next: () => this.onSaveCompleteSuccess(),
              error: err => this.notify.error('InEx-Manager!', 'Operation Failed')
            });
        }
        if (this.income.id != null) {
          this.incomeService.updateIncome(this.income)
            .subscribe({
              next: () => this.onUpdateComplete(),
              error: err => this.notify.error('InEx-Manager!', 'Operation Failed')
            });
        }
      } else {
        this.onSaveCompleteSuccess();
      }
  }*/

  onSaveCompleteSuccess(): void {
    this.notify.success('In-Ex Manager!', 'Income Added!')
    this.newIncomeForm.reset();
    this.router.navigate(['/incomehistory']);
  }

  onUpdateComplete(): void {
    this.notify.success('In-Ex Manager!', 'Income Updated!')
    this.newIncomeForm.reset();
    this.router.navigate([`/income-detail/${this.income.id}`]);
  }

  cancelEntry(){
    this.router.navigate(['/']);
  }

  mapEntity(): void {
    this.income.amountMade = this.amountMade.value;
    this.income.expenses = this.expenses.value;
    this.income.daillyAllowance = this.dailyAllowance.value;
    let leftover = this.amountMade.value - this.expenses.value;
    this.income.profit = leftover - this.dailyAllowance.value;
    this.income.percentageProfit = (10 / 100) * this.income.profit;
    this.income.entryDate = this.entryDate.value;
    this.income.compulsorySavings = this.savings.value;
    let myValue = this.income.profit - this.income.percentageProfit;
    this.income.balance = myValue - this.income.compulsorySavings;

  }

  AddExpenseLink() {
    this.router.navigate(['/expense']);
  }


 /* displayIncome(income: Income): void {
    if (this.newIncomeForm) {
      this.newIncomeForm.reset();
    }
    this.income = income;
    if (!this.income) {
      this.pageTitle = 'New Income Entry';
    } else {
      this.pageTitle = 'Income Entry Edit';
    }
    this.newIncomeForm.patchValue({
      entryDate: this.income.entryDate,
      amountMade: this.income.amountMade,
      dailyAllowance: this.income.daillyAllowance,
      savings: this.income.compulsorySavings,
      expenses: this.income.expenses
    });
  }*/

}
