using Domain_Modules.objects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Engine.dbMaps
{
    public class DailyIncomeEntityConfig :  IEntityTypeConfiguration<DailyIncome>
    {
        public void Configure(EntityTypeBuilder<DailyIncome> builder)
        {
            builder.HasKey(di => di.Id);
            builder.Property(di => di.AmountMade).IsRequired();

        }
    }
}
