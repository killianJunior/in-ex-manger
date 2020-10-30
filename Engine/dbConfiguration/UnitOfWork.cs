using app_efcore_infrastructure_seedwork;
using Domain_Modules.objects;
using Engine.contracts;
using Engine.dbMaps;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Engine.dbConfiguration
{
    public abstract class UnitOfWork : IDbContextUnitofWork
    {
        /* IDailyIncomeRepository DailyIncome { get; }
         IExpenseRepository Expense { get; }*/

        public UnitOfWork()
        {

        }

        public UnitOfWork(DbContextOptions options) : base(options)
        {

        }

        public DbSet<DailyIncome> DailyIncomes { get; set; }
        public DbSet<Expense> Expenses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new DailyIncomeEntityConfig());
            modelBuilder.ApplyConfiguration(new ExpenseEntityConfig());

        }
    }
}
