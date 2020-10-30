import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Expense } from 'src/app/data-model/expense';
import { GenericValidator } from 'src/app/directives/generic--validator';
import { ExpenseService } from 'src/app/services/expense.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Expense'
  errorMessage: string;

  newExpenseForm: FormGroup;
  expense = new Expense();
  private sub: Subscription;
  allExpenses: Expense[];
  queryDate = new Date().toLocaleDateString();
  expensesTotal: number = 0;


  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
              private router: Router,
              private expenseService: ExpenseService,
              private notify: ToastrService,
              private ngbCalendar: NgbCalendar,
              private dateAdapter: NgbDateAdapter<string>, private datePipe: DatePipe) {

  this.validationMessages = {
    amount: {
      required: 'Specify Expense Amount'
    },
    description: {
      required: 'Expense Description is required'
    },
    expenseDate: {
      required: 'Select Date'
    }

  };
  this.genericValidator = new GenericValidator(this.validationMessages);
  this.queryDate = this.datePipe.transform(this.queryDate, 'dd-MM-yyy');

  }

  ngOnInit() {
    this.createNewExpenseForm();
    this.expenseService.getExpenses().subscribe({
      next: expenses => {
        if (expenses != null) {
          this.allExpenses = expenses
        }
      },
      error: err => this.errorMessage = err
    })
  }

  ngAfterViewInit(): void{

    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(this.newExpenseForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.newExpenseForm);
    });
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  createNewExpenseForm() {
    this.newExpenseForm = this.fb.group({

      amount: ['', Validators.required ],
      description: ['', Validators.required ],
      expenseDate: [null, Validators.required]

    })
  }

  saveExpense(){
    console.log("Form Verified!!")
    this.mapEntity();
    if (this.expense.id === null) {
      this.expenseService.addExpense(this.expense)
        .subscribe({
            next: () => {
              console.log(this.expense)
              this.router.navigateByUrl('/', {skipLocationChange: true})
              .then(()=>this.router.navigate(['/expense']));
              this.notify.success('In-Ex Manager!', 'Expense Added!');
            },
            error: err => this.errorMessage = err
        })
    } else {
      this.notify.error('InEx-Manager!', 'Operation Failed!!!');
    }
  }


  cancelEntry() {
    // function that reloads the state when button is clicked
  }

  get amount(){
    return this.newExpenseForm.controls.amount as FormControl;
  }

  get description(){
    return this.newExpenseForm.controls.description as FormControl;
  }

  get expenseDate(){
    return this.newExpenseForm.controls.expenseDate as FormControl;
  }

  mapEntity(): void {
    this.expense.id = null;
    this.expense.amount = this.amount.value;
    this.expense.description = this.description.value;
    this.expense.expenseDate = this.expenseDate.value;
  }

  GetTodaysExpenses(){
    console.log(this.queryDate);
    this.expenseService.getExpensesByDate(this.queryDate).subscribe(
      data => {
      this.allExpenses = data;
      this.allExpenses.forEach(a => this.expensesTotal += a.amount);
      console.log(data);
      console.log(this.expensesTotal)
      },
      error => {
        console.log('httperror:');
        console.log(error);
      })
}

}

// let sum: number = 0;
// itemArray.forEach(a => sum += a.value);
// console.log(sum );
