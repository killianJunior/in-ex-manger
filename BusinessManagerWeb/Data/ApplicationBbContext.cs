using Engine.dbConfiguration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessManagerWeb.Data
{
    public class ApplicationBbContext : UnitOfWork
    {
        public ApplicationBbContext(DbContextOptions<ApplicationBbContext> options)
            :base(options)
        {

        }
    }
}
