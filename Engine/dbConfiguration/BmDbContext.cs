using Domain_Modules.objects;
using Engine.dbMaps;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Engine.dbConfiguration
{
    public class BmDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=.\SQLDEV;Database=kizzyTest2;Trusted_Connection=True;");
        }

        public DbSet<DailyIncome> DailyIncome { get; set; }
        public DbSet<Expense> Expense { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new DailyIncomeEntityConfig());
            modelBuilder.ApplyConfiguration(new ExpenseEntityConfig());

        }

    }
}
