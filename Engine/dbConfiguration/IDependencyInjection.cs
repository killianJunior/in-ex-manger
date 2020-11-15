using Engine.contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace Engine.dbConfiguration
{
    public interface IDependencyInjection
    {
        IDailyIncomeRepository DailyIncome { get; }
        IExpenseRepository Expense { get; }
        IGenExpenseRepository GenExpense { get; }
    }
}
