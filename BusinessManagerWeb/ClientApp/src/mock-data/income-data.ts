import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Expense } from 'src/app/data-model/expense';
import { Genexpense } from 'src/app/data-model/genexpense';
import { Income } from 'src/app/data-model/income';

export class IncomeData implements InMemoryDbService {

  createDb(): { inData: Income[], exData: Expense[], genData: Genexpense[] }
  {

    const inData: Income[] = [

    ];

    const exData: Expense[] = [


    ];

    const genData: Genexpense[] = [


    ]


    return { inData, exData, genData}
  }


}
