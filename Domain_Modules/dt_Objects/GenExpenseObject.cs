using app_businesslogic_seedwork;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain_Modules.dt_Objects
{
    public class GenExpenseObject : BaseDataObject
    {
        public int Amount { get; set; }
        public string Description { get; set; }
        public DateTime ExpenseDate { get; set; }
        public string Purpose { get; set; }
    }
}
