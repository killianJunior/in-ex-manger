using app_businesslogic_seedwork;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain_Modules.dt_Objects
{
    public class ExpenseObject : BaseDataObject
    {
            public int Amount { get; set; }
            public string Details { get; set; }
            public DateTime Date { get; set; }
          /*  public Guid DailyIncomeId { get; set; }*/
    }
}
