using app.domain.seedwork;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain_Modules.objects
{
    public class Expense : BaseEntity
    {
            public int Amount { get; set; }
            public string Details { get; set; }
            public DateTime Date { get; set; }
            

    }
}
