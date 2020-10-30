import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Expense } from 'src/app/data-model/expense';
import { Genexpense } from 'src/app/data-model/genexpense';
import { Income } from 'src/app/data-model/income';

export class IncomeData implements InMemoryDbService {

  createDb(): { inData: Income[], exData: Expense[], genData: Genexpense[] }
  {

    const inData: Income[] = [

      {
        id: 1,
        amountMade:4000,
        entryDate: "21-Oct-2020",
        expenses:1200,
        dailyAllowance:500,
        profit: 2300,
        percentageProfit: 230,
        savings:1000,
        balance: 1070


      },

      {
        id: 2,
        amountMade:3500,
        entryDate: "22-Oct-2020",
        expenses:1200,
        dailyAllowance:500,
        profit: 1800,
        percentageProfit: 180,
        savings:1000,
        balance: 620
      },

      {
        id: 3,
        amountMade:3500,
        entryDate: "23-Oct-2020",
        expenses:1500,
        dailyAllowance:500,
        profit: 1500,
        percentageProfit: 150,
        savings:1000,
        balance: 350
      }

    ];

    const exData: Expense[] = [

      {
        id: 1 ,
        amount:1200,
        description: "Fuel Purchase",
        expenseDate: "22-10-2020"
      },


      {
        id: 2 ,
        amount:300,
        description: "Plug Purchase",
         expenseDate: "22-10-2020"
        // expenseDate: new Date("October 22, 2020 10:13:00")
      },


      {
        id: 3 ,
        amount:1200,
        description: "Fuel Purchase",
        expenseDate: "23-10-2020"
      },

      {
        id: 4 ,
        amount:1500,
        description: "Oil Purchase",
        expenseDate: "23-10-2020"
      }


    ];

    const genData: Genexpense[] = [

      {
        id: 1 ,
        amount:4500,
        description: "Single Joy Stick Purchase",
        expenseDate: "22-10-2020",
        purpose: "Game Shop"
      },


      {
        id: 2 ,
        amount:8000,
        description: "Game Purchase",
        expenseDate: "22-10-2020",
        purpose: "Game Shop"

      }

    ]


    return { inData, exData, genData}
  }


}
