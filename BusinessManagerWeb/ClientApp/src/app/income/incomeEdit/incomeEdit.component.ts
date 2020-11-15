import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Income } from 'src/app/data-model/income';
import { GenericValidator } from 'src/app/directives/generic--validator';
import { IncomeService } from 'src/app/services/income.service';

@Component({
  selector: 'app-incomeEdit',
  templateUrl: './incomeEdit.component.html',
  styleUrls: ['./incomeEdit.component.scss']
})
export class IncomeEditComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Income Entry Edit';
  incomeForm: FormGroup;

  errorMessage: string = '';

  income: Income;
  private sub: Subscription;

  diplayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private incomeService: IncomeService,
    private notify: ToastrService
  ) {

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
        entryDate: {
          requird: 'Select Date'
        }
      };

      this.genericValidator = new GenericValidator(this.validationMessages);
    }

  ngOnInit(): void {
    this.createIncomeForm();

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getIncome(id);
      }
    )
  }

  createIncomeForm() {
    this.incomeForm = this.fb.group({

      amountMade: [null, Validators.required],
      dailyAllowance: [null, Validators.required],
      expenses: [null, Validators.required],
      savings: [null, Validators.required],
      // From the above details, calculate my profit, %profit and Balance
      profit: [null],
      percentageProfit: [null],
      balance: [null],
      entryDate: [null, Validators.required]
    });
  }

  ngAfterViewInit(): void {

    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.incomeForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.diplayMessage = this.genericValidator.processMessages(this.incomeForm);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getIncome(id: string): void {
    this.incomeService.getIncomeDetail(id)
      .subscribe({
        next: (income: Income) => this.displayIncome(income),
        error: err => this.notify.error('In-Ex Manager!', 'Operation Failed!!!')
      });
    /*console.log(this.income)*/
  }

  displayIncome(income: Income):void {
    this.income = income;
    if (!this.income) {
      this.pageTitle = 'New Income Entry';
    } else {
      this.pageTitle = 'Income Entry Edit';
    }
    this.incomeForm.patchValue({
      entryDate: this.income.entryDate,
      amountMade: this.income.amountMade,
      dailyAllowance: this.income.daillyAllowance,
      savings: this.income.compulsorySavings,
      expenses: this.income.expenses
    });
  }

  updateIncome() {
    console.log("Form Verified!!")
    this.mapEntity();
    if (this.income.id != null) {
      console.log(this.income)
      this.incomeService.updateIncome(this.income)
        .subscribe({
          next: () => {
            this.notify.success('In-Ex Manager!', 'Update Successful!'),
            this.router.navigate([`/income-detail/${this.income.id}`]);
          },
          error: err => this.notify.error('InEx-Manager!', 'Operation Failed')
        })
    } else {
      this.notify.error('InEx-Manager!', 'Operation Failed');
    }
  }

  get amountMade() {
    return this.incomeForm.controls.amountMade as FormControl;
  }

  get dailyAllowance() {
    return this.incomeForm.controls.dailyAllowance as FormControl;
  }

  get expenses() {
    return this.incomeForm.controls.expenses as FormControl;
  }

  get savings() {
    return this.incomeForm.controls.savings as FormControl;
  }

  get entryDate() {
    return this.incomeForm.controls.entryDate as FormControl;
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

  cancelEntry() {
    this.router.navigate([`/income-detail/${this.income.id}`]);
  }
    

}
