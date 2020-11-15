using Domain_Modules.dt_Objects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL.logic
{
    public interface IDailyIncomeLogic
    {
        DailyIncomeObject GetDailyIncome(Guid IncomeId);
        IList<DailyIncomeObject> GetAllDailyIncomeSheet();
        Task<Guid> CreateDailyIncome(DailyIncomeObject obj);
        Task<bool> UpdateDailyIncome(DailyIncomeObject obj);
        Task<bool> RemoveDailyIncome(DailyIncomeObject obj);

    }
}
