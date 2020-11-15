using app_businesslogic_seedwork;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain_Modules.dt_Objects
{
    public class DailyIncomeObject : BaseDataObject
    {
        public int AmountMade { get; set; }
        public int Profit { get; set; }
        public int PercentageProfit { get; set; }
        public int CompulsorySavings { get; set; }
        public int Balance { get; set; }
        public DateTime EntryDate { get; set; }
        public int DaillyAllowance { get; set; }
        public int Expenses { get; set; }



        /* public List<ExpenseObject> Expenses { get; set; }*/
    }
}
