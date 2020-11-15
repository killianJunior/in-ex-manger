using app_efcore_infrastructure_seedwork;
using Domain_Modules.objects;
using Engine.contracts;
using Engine.dbConfiguration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Engine.repos
{
    public class GenExpenseRepository : BaseRepository<GenExpense>, IGenExpenseRepository
    {
        public GenExpenseRepository(UnitOfWork context) : base(context)
        {

        }
    }
}
