import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Genexpense } from '../../data-model/genexpense';
import { GenexpenseService } from '../../services/genexpense.service';

@Component({
  templateUrl: './gen-expense-detail.component.html',
  styleUrls: ['./gen-expense-detail.component.scss']
})
export class GenExpenseDetailComponent implements OnInit {


  pageTitle = 'Detail Page';
  errorMessage = '';

  genEx: Genexpense;

  constructor(private route: ActivatedRoute,
    private exService: GenexpenseService,
    private notify: ToastrService) { }

  ngOnInit() {
    const stateParams = this.route.snapshot.paramMap.get('id');
    if (stateParams != null) {
      const id = stateParams;
      this.getIncome(id);
    }
  }

  getIncome(id: string): void {
    this.exService.getGenExpenseDetail(id).subscribe({
      next: genEx => this.genEx = genEx,
      error: err => this.notify.error('In-Ex Manager!', 'Operation Failed!!!')
    });
   
  }

  
}
