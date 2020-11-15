using Domain_Modules.objects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Engine.dbMaps
{
    public class GenExpenseEntityTypeConfig: IEntityTypeConfiguration<GenExpense>
    {
        public void Configure(EntityTypeBuilder<GenExpense> builder)
        {
            builder.HasKey(di => di.Id);
            builder.Property(di => di.Amount).IsRequired();
            builder.Property(di => di.ExpenseDate).IsRequired();
            builder.Property(di => di.Description).IsRequired();

        }
    }
       
   
    
}
