using Domain_Modules.dt_Objects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL.logic
{
    public interface IExpenseLogic
    {
        Task<ExpenseObject> GetExpense(Guid ExpenseId);
        Task<IList<ExpenseObject>> GetAllExpenseSheet();
        Task<Guid> CreateExpense(ExpenseObject obj);
        Task<bool> ChangeExpense(ExpenseObject obj);
        Task<bool> RemoveExpense(Guid ExpenseId);
    }
}
