using app.domain.seedwork;
using System;
using System.Collections.Generic;

namespace Domain_Modules.objects
{
    public class DailyIncome : BaseEntity
    {
        public int AmountMade { get; set; }
        public int Profit { get; set; }
        public int PercentageProfit { get; set; }
        public int CompulsorySavings { get; set; }
        public int DaillyAllowance { get; set; }
        public int Expenses { get; set; }
        public int Balance { get; set; }
        public DateTime EntryDate { get; set; }


    }

  
}
