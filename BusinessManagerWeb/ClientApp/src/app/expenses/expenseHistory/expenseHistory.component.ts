import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Genexpense } from 'src/app/data-model/genexpense';
import { GenericValidator } from 'src/app/directives/generic--validator';
import { GenexpenseService } from 'src/app/services/genexpense.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenseHistory',
  templateUrl: './expenseHistory.component.html',
  styleUrls: ['./expenseHistory.component.scss']
})
export class ExpenseHistoryComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle = 'General Expenses'

    genEx = new Genexpense();
    genExs: Genexpense[];
    genExForm: FormGroup;
    genExpenseTotal: number = 0;

    modalRef: BsModalRef;
    message: string;
    errorMessage: string;

    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

  constructor(private genServices: GenexpenseService,
              private fb: FormBuilder,
              private modalService: BsModalService,
              private notify: ToastrService,
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
    this.genServices.getGenExpenses().subscribe(
      data => {
        this.genExs = data;
        this.genExs.forEach(c => this.genExpenseTotal += c.amount);
        console.log(this.genExpenseTotal)
      },
      error => {
        console.log('httperror:');
        console.log(error);
      })
  }

  // ngAfterViewInit(): void{
  //   const controlBlurs: Observable<any>[] = this.formInputElements
  //     .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

  //   merge(this.genExForm.valueChanges, ...controlBlurs).pipe(
  //     debounceTime(800)
  //   ).subscribe(value => {
  //     this.displayMessage = this.genericValidator.processMessages(this.genExForm);
  //   });
  // }

  // ngOnDestroy(): void {
  //   // this.sub.unsubscribe();
  // }

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
    this.genEx.id = null;
    this.genEx.amount = this.amount.value;
    this.genEx.description = this.description.value;
    this.genEx.expenseDate = this.expenseDate.value;
    this.genEx.purpose = this.purpose.value;
  }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  // }

  openModal(template: TemplateRef<any>) {
    this.createGenExForm();
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-md' })
    );
  }

  // confirm(): void {
  //   this.message = 'Confirmed!';
  //   this.modalRef.hide();
  // }

  decline(): void {
    // this.message = 'Declined!';
    this.modalRef.hide();
  }

  saveExpense(){
    this.mapEntity();
    if(this.genEx.id === null && this.genEx.amount != null) {
      this.genServices.addGenExpense(this.genEx)
        .subscribe({
          next: () => {
            console.log(this.genEx)
            this.modalRef.hide();
            this.notify.success('In-Ex Manager!', 'Gen-Expense Added!');
            this.router.navigateByUrl('/', {skipLocationChange: true})
            .then(()=>this.router.navigate(['/expensehistory']));
          },
          error: err => this.errorMessage = err
        })
    } else {
      this.notify.error('In-Ex Manager!', 'Operation Failed!!!')
    }
  }

  cancel() {
    if(this.genEx.amount === null){
      this.modalRef.hide();
    }

  }

}
