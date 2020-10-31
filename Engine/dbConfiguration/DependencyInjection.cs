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
  
    }
}
