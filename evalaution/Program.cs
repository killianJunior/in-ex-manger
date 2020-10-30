using Engine.dbConfiguration;
using Microsoft.EntityFrameworkCore;
using System;

namespace evalaution
{
    public class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }

    public class TestContext : UnitOfWork
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=.\SQLEXPRESS;Database=KizzyTest2;Trusted_Connection=True;");
        }
    }
}
