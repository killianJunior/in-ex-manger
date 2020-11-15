using app.domain.seedwork;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain_Modules.objects
{
    public class GenExpense : BaseEntity
    {
        public int Amount { get; set; }
        public string Description { get; set; }
        public DateTime ExpenseDate { get; set; }
        public string Purpose { get; set; }

    }
}
