using Engine.contracts;
using Engine.repos;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Engine.dbConfiguration
{
    public static class DependencyInjection
    {

     public static void ConfigureServices(IServiceCollection serviceCollection)
    {

        serviceCollection.AddScoped<IDailyIncomeRepository, DailyIncomeRepository>();

        serviceCollection.AddScoped<IExpenseRepository, ExpenseRepository>();
       
    }
    /* public BmDbContext DbContext { get; set; }*/


    /*  public DependencyInjection()
      {
          CreateDbContext();
      }

      public void Commit()
      {
          DbContext.SaveChanges();
      }

      public void Dispose()
      {
          Dispose(true);
          GC.SuppressFinalize(this);
      }*/

    /*   public virtual void Dispose(bool diposing)
       {
           if (diposing)
           {
               if (DbContext != null)
               {
                   DbContext.Dispose();
               }
           }
       }*/

    /* protected void CreateDbContext()
     {
         DbContext = new BmDbContext();

         DbContext.Configuration.ProxyCreationEnabled = false;

     }

     public IDailyIncomeRepository DailyIncome 
     {
         get { return new DailyIncomeRepository(DbContext); }
     }

     public IExpenseRepository Expense
     {
         get { return new ExpenseRepository(DbContext); }
     }
*/
}
}
