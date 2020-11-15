using AutoMapper;
using Domain_Modules.dt_Objects;
using Domain_Modules.objects;
using System;
using System.Collections.Generic;
using System.Text;

namespace BL.helpers
{
    public static class AppAdapterConfig
    {
        public static MapperConfiguration GetAppContextConfig()
        {
            var config = new MapperConfiguration(fig =>
           {
               fig.CreateMap<DailyIncome, DailyIncomeObject>();
               fig.CreateMap<DailyIncomeObject, DailyIncome>();

               fig.CreateMap<Expense, ExpenseObject>();
               fig.CreateMap<ExpenseObject, Expense>();

               fig.CreateMap<GenExpense, GenExpenseObject>();
               fig.CreateMap<GenExpenseObject, GenExpense>();
           });

            return config;
        }
    }
}
