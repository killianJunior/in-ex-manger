using app_efcore_infrastructure_seedwork;
using Domain_Modules.objects;
using Engine.contracts;
using Engine.dbConfiguration;
using System;

namespace Engine
{
    public class DailyIncomeRepository : BaseRepository<DailyIncome>, IDailyIncomeRepository
    {


        public DailyIncomeRepository(UnitOfWork context): base(context)
        {

        }
       /* public CommunityRepository(DbContext context)
            : base(context)
        {

        }*/

    }
}
