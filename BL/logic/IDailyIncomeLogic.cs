using Domain_Modules.dt_Objects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL.logic
{
    public interface IDailyIncomeLogic
    {
        Task<DailyIncomeObject> GetDailyIncome(Guid IncomeId);
        Task<IList<DailyIncomeObject>> GetAllDailyIncomeSheet();
        Task<Guid> CreateDailyIncome(DailyIncomeObject obj);
        Task<bool> ChangeDailyIncome(DailyIncomeObject obj);
        Task<bool> RemoveDailyIncome(Guid IncomeId);

    }
}
