using app_efcore_infrastructure_seedwork;
using Domain_Modules.objects;
using Engine.contracts;
using Engine.dbConfiguration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Engine.repos
{
    public class ExpenseRepository : BaseRepository<Expense>, IExpenseRepository
    {
        public ExpenseRepository(UnitOfWork context) : base(context)
        {

        }
    }
}
