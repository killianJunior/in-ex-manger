using Domain_Modules.dt_Objects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL.logic
{
    public interface IGenExpenseLogic
    {
        GenExpenseObject GetGenExpense(Guid IncomeId);
        IList<GenExpenseObject> GetAllGenExpenseSheet();
        Task<Guid> CreateGenExpense(GenExpenseObject obj);
        Task<bool> UpdateGenExpense(GenExpenseObject obj);
        Task<bool> RemoveGenExpense(GenExpenseObject obj);
    }
}
