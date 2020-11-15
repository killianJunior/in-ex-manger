import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Genexpense } from 'src/app/data-model/genexpense';
import { GenericValidator } from 'src/app/directives/generic--validator';
import { GenexpenseService } from 'src/app/services/genexpense.service';

@Component({
  selector: 'app-gen-expense',
  templateUrl: './gen-expense.component.html',
  styleUrls: ['./gen-expense.component.scss']
})
export class GenExpenseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'General Expenses'

  genEx = new Genexpense();
  genExForm: FormGroup;
  genExpenseTotal: number = 0;

  modalRef: BsModalRef;
  message: string;
  errorMessage: string;

  private sub: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

constructor(private genServices: GenexpenseService,
            private fb: FormBuilder,
            private modalService: BsModalService,
            private notify: ToastrService,
            private route: ActivatedRoute,
            private router: Router){
this.validationMessages = {
  amount: {
    required: 'Specify expense amount'
  },
  description: {
    required: 'Expense description is required'
  },
  expenseDate: {
    required: 'Select Date'
  },
  purpose: {
    required: 'Please Specify expense purpose.'
  }

};
this.genericValidator = new GenericValidator(this.validationMessages);
}

ngOnInit() {
  this.createGenExForm();

  this.sub = this.route.paramMap.subscribe(
    params => {
      const id = params.get('id');
      this.getGenEx(id);
    }
  )
}

ngAfterViewInit(): void{
  const controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

  merge(this.genExForm.valueChanges, ...controlBlurs).pipe(
    debounceTime(800)
  ).subscribe(value => {
    this.displayMessage = this.genericValidator.processMessages(this.genExForm);
  });
}

ngOnDestroy(): void {
  // this.sub.unsubscribe();
}

createGenExForm() {
    this.genExForm = this.fb.group({
      amount: ['', Validators.required ],
      description: ['', Validators.required ],
      expenseDate: ['', Validators.required ],
      purpose: ['', Validators.required]
    })
}

get amount(){
  return this.genExForm.controls.amount as FormControl;
}

get description(){
  return this.genExForm.controls.description as FormControl;
}

get expenseDate(){
  return this.genExForm.controls.expenseDate as FormControl;
}

get purpose(){
  return this.genExForm.controls.purpose as FormControl;
}

mapEntity(): void {

  this.genEx.amount = this.amount.value;
  this.genEx.description = this.description.value;
  this.genEx.expenseDate = this.expenseDate.value;
  this.genEx.purpose = this.purpose.value;
}

  saveExpense() {
    console.log("Form Verified!!")
    this.mapEntity();
    if (this.genEx.id != null) {
      console.log(this.genEx)
      this.genServices.updateGenEx(this.genEx)
        .subscribe({
          next: () => {
            this.notify.success('In-Ex Manager!', 'Update Successful!'),
            this.router.navigate([`/genexpense-detail/${this.genEx.id}`]);
          },
          error: err => this.notify.error('In-Ex Manager!', 'Operation Failed!!!')
        });
    } else {
      this.genServices.addGenExpense(this.genEx)
        .subscribe({
          next: () => {
            this.notify.success('In-Ex Manager!', 'Gen-Expense Added!'),
            this.router.navigate(['/expensehistory']);
          },
          error: err => this.notify.error('InEx-Manager!', 'Operation Failed')
        })
    }
   
}

  cancelEntry() {
    if (this.genEx.id != null) {
      this.router.navigate([`/genexpense-detail/${this.genEx.id}`]);
    } else {
      this.router.navigate(['/expensehistory']);
    }
   
  }

  cancelEdit() {
    
  }

  getGenEx(id: string): void {
    this.genServices.getGenExpenseDetail(id)
      .subscribe({
        next: (genEx: Genexpense) => this.displayDetail(genEx),
        error: err => this.notify.info('In-Ex Manager!', 'Adding New Gen-Expense!!!')
      })
  }

  displayDetail(genEx: Genexpense): void {
    if (this.genExForm) {
      this.genExForm.reset();
    }
    this.genEx = genEx;
    if (this.genEx.id === null) {
      this.pageTitle = 'General Expense Entry';
    } else {
      this.pageTitle = 'Entry Edit';
    }
    this.genExForm.patchValue({
      expenseDate: this.genEx.expenseDate,
      amount: this.genEx.amount,
      description: this.genEx.description,
      purpose: this.genEx.purpose
    });

  }

}
