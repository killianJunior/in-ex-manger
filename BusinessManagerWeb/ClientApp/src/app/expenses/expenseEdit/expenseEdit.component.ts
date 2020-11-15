import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Expense } from 'src/app/data-model/expense';
import { GenericValidator } from 'src/app/directives/generic--validator';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expenseEdit',
  templateUrl: './expenseEdit.component.html',
  styleUrls: ['./expenseEdit.component.scss']
})
export class ExpenseEditComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Expense Entry Edit';
  newExpenseForm: FormGroup;

  errorMessage: string = '';

  expense: Expense;
  private sub: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ExpenseService: ExpenseService,
    private notify: ToastrService
  ) {

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
    }

      this.genericValidator = new GenericValidator(this.validationMessages);
    }

  ngOnInit(): void {
    this.createnewExpenseForm();

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getExpense(id);
      }
    )
  }

  createnewExpenseForm() {
    this.newExpenseForm = this.fb.group({

      amount: ['', Validators.required ],
      description: ['', Validators.required ],
      expenseDate: [null, Validators.required]

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

  getExpense(id: string): void {
    this.ExpenseService.getExpenseDetail(id)
      .subscribe({
        next: (expense: Expense) => this.displayExpense(expense),
        error: err => this.errorMessage = err
      });
  }

  displayExpense(expense: Expense):void {
    this.expense = expense;
    if (!this.expense) {
      this.pageTitle = 'New Expense Entry';
    } else {
      this.pageTitle = 'Expense Entry Edit';
    }
    this.newExpenseForm.patchValue({
      expenseDate: this.expense.date,
      amount: this.expense.amount,
      description: this.expense.details
    });
  }

  updateExpense() {
    console.log("Form Verified!!")
    this.mapEntity();
    if (this.expense.id != null) {
      console.log(this.expense)
      this.ExpenseService.updateExpense(this.expense)
        .subscribe({
          next: () => {
            this.notify.success('In-Ex Manager!', 'Update Successful!'),
            this.router.navigate(['/expense']);
          },
          error: err => this.notify.error('InEx-Manager!', 'Operation Failed')
        })
    } else {
      this.notify.error('InEx-Manager!', 'Operation Failed');
    }
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
    /*this.expense.id = null;*/
    this.expense.amount = this.amount.value;
    this.expense.details = this.description.value;
    this.expense.date = this.expenseDate.value;
  }

  cancelEntry() {
    this.router.navigate(['/expense']);
  }

}
