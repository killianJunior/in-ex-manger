import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren, TemplateRef, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { fromEvent, merge, BehaviorSubject, Observable, of, Subject, } from 'rxjs';
import { debounceTime, map, startWith, delay, switchMap, tap  } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Genexpense } from 'src/app/data-model/genexpense';
import { GenericValidator } from 'src/app/directives/generic--validator';
import { GenexpenseService } from 'src/app/services/genexpense.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-expenseHistory',
  templateUrl: './expenseHistory.component.html',
  styleUrls: ['./expenseHistory.component.scss']
})
export class ExpenseHistoryComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle = 'General Expenses'

    genExs: Genexpense[];
    genExpenseTotal: number = 0;

  filteredGenExs: Observable<Genexpense[]>;

  filteredPag: Genexpense[];

/*
    page = 1;
    pageSize = 4;*/


    modalRef: BsModalRef;
    message: string;
    errorMessage: string;
    collectionSize: Observable<number>;

    filter = new FormControl('');
   

    constructor(private genServices: GenexpenseService,
      private modalService: BsModalService,
      private router: Router,
      private notify: ToastrService,
      pipe: DecimalPipe)
    {
      /*this is working*/
      this.filteredGenExs = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.searchExpenses(text, pipe))
      ); 

    }

  ngOnInit() {
    this.genServices.getGenExpenses().subscribe(
      data => {
        this.genExs = data
        this.genExs.forEach(c => this.genExpenseTotal += c.amount);
        console.log(this.genExpenseTotal)
/*        this.collectionSize = this.genExs.length;
        this.refreshExpenses();*/
      },
      error => {
        this.notify.error('In-Ex Manager!', 'Operation Failed!!!')
      })

  }


  addExpenseLink() {
    this.router.navigate(['/genexpense']);
  }

  deleteGenExpense() {
    this.notify.warning('In-Ex Manager!', 'Unathourised Operation!');
  }

/*search(text: string, pipe: PipeTransform): Genexpense[] {
  return this.filteredGenExs.filter(data => {
    const term = text.toLowerCase();
    return data.description.toLowerCase().includes(term)
      || pipe.transform(data.purpose).includes(term)
      || pipe.transform(data.amount).includes(term)
      || pipe.transform(data.expenseDate).includes(term);
  });
}*/

  /*this is working*/
  searchExpenses(text: string, pipe: PipeTransform): Genexpense[] {
    return this.genExs.filter(data => {
      const term = text.toLowerCase();
      return data.description.toLowerCase().includes(term)
        || pipe.transform(data.amount).includes(term);
       /* || pipe.transform(data.expenseDate).includes(term);*/
    });
  }

 /* refreshExpenses() {
    this.genExs = this.filteredPag
      .map((ax, i) => ({ id: i + 1, ...ax }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }*/


}

