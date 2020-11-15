using Domain_Modules.dt_Objects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL.logic
{
    public interface IExpenseLogic
    {
        ExpenseObject GetExpense(Guid ExpenseId);
        IList<ExpenseObject> GetAllExpenseSheet();
        Task<Guid> CreateExpense(ExpenseObject obj);
        Task<bool> UpdateExpense(ExpenseObject obj);
        Task<bool> RemoveExpense(ExpenseObject obj);
    }
}
