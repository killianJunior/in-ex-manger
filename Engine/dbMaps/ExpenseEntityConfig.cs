using Domain_Modules.objects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Engine.dbMaps
{
    public class ExpenseEntityConfig : IEntityTypeConfiguration<Expense>
    {
        public void Configure(EntityTypeBuilder<Expense> builder)
        {
            /*builder.HasKey(di => di.Id);*/
            builder.Property(di => di.Amount).IsRequired();
           /* builder.HasOne(di => di.DailyIncome)
                .WithMany()
                .HasForeignKey(di => di.DailyIncomeId);*/
            
        }
    }
}
