using app.domain.seedwork;
using AutoMapper;
using BL.logic;
using Domain_Modules.dt_Objects;
using Domain_Modules.objects;
using Engine.contracts;
using Engine.dbConfiguration;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BL.executors
{
    public class DailyIncomeExecutor : IDailyIncomeLogic

    /*IRequestHandler<DailyIncomeObject, Guid>*/
    {

        IDailyIncomeRepository dailyIncomeRepo;

        public DailyIncomeExecutor(IDailyIncomeRepository _repo) 
        {
            dailyIncomeRepo = _repo;

        }

        /*public async Task<Guid> Handle(DailyIncomeObject entity, CancellationToken token)
        {
            if (entity.Id == Guid.Empty)
            {
                entity.ModifiedDate = DateTime.Now;

                var dataObj = new MapperConfiguration(doj =>
                {
                    doj.CreateMap<DailyIncome, DailyIncomeObject>();
                });

                IMapper iMapper = dataObj.CreateMapper();

                var source = new DailyIncome();

                source.Id = IdentityGenerator.NewSequentialGuid();
                source.AmountMade = entity.AmountMade;
                source.Balance = entity.Balance;
                source.CompulsorySavings = entity.CompulsorySavings;
                source.PercentageProfit = entity.PercentageProfit;
                source.PercentageProfit = entity.Profit;

                dailyIncomeRepo.Add(source);
                await dailyIncomeRepo.UnitofWork.CommitAsync(token);

                return source.Id;

            }
            else
            {
                return entity.Id;
            }

            *//*return*//* ;

        }*/

        public Task<DailyIncomeObject> GetDailyIncome(Guid IncomeId)
        {
            return Task.Run(() =>
            {
                try
                {
                    if (IncomeId != Guid.Empty)
                    {
                        DailyIncome entity = dailyIncomeRepo.GetAllIncluding(new Expression<Func<DailyIncome, object>>[]{
                        d => d.Expenses}).Where(pt => pt.Id == IncomeId).FirstOrDefault<DailyIncome>();

                        var obj = new MapperConfiguration(doj =>
                        {
                            doj.CreateMap<DailyIncome, DailyIncomeObject>();
                        });

                        IMapper iMapper = obj.CreateMapper();
                        var destination = new DailyIncomeObject();

                        destination.AmountMade = entity.AmountMade;
                        destination.Balance = entity.Balance;
                        destination.CompulsorySavings = entity.CompulsorySavings;
                        destination.PercentageProfit = entity.PercentageProfit;
                        destination.Profit = entity.Profit;
                        /*destination.Expenses = dailyIncomeRepo.GetAll().Where(x => x.);*/

                        /* List<ExpenseObject> expenses = new List<ExpenseObject>();
                         var expenses = dailyIncomeRepo.GetAll().Where(x => x.DailyIncomeId == entity.Id)
                         .Select(x => x. new ExpenseObject
                         {
                             Id = x.Id,

                         })*/

                        return destination;

                    }
                    else
                    {
                        throw new InvalidOperationException();
                    }
                }
                catch (Exception)
                {

                    throw;
                }
            });
        }

        public Task<IList<DailyIncomeObject>> GetAllDailyIncomeSheet()
        {
            throw new NotImplementedException();
        }

        public Task<Guid> CreateDailyIncome(DailyIncomeObject obj)
        {
            return Task.Run(() =>
            {
                try
                {

                    if (obj.Id == Guid.Empty)
                    {
                        obj.ModifiedDate = DateTime.Now;

                        var dataObj = new MapperConfiguration(doj =>
                        {
                            doj.CreateMap<DailyIncomeObject, DailyIncome>();
                        });

                        IMapper iMapper = dataObj.CreateMapper();

                        var source = new DailyIncome();

                        source.Id = IdentityGenerator.NewSequentialGuid();
                        source.AmountMade = obj.AmountMade;
                        source.Balance = obj.Balance;
                        source.CompulsorySavings = obj.CompulsorySavings;
                        source.PercentageProfit = obj.PercentageProfit;
                        source.PercentageProfit = obj.Profit;
                        source.DaillyAllowance = obj.DaillyAllowance;
                        source.EntryDate = obj.Date;
                        source.Expenses = obj.Expenses;

                       /* if (source.Expenses.Count >= 0)
                        {
                            foreach (var item in source.Expenses)
                            {
                                source.Expenses.Add(new Expense
                                {
                                    Id = IdentityGenerator.NewSequentialGuid(),
                                    DailyIncomeId = source.Id,
                                    Amount = item.Amount,
                                    Details = item.Details,
                                    Date = item.Date
                                });
                            }
                        }*/

                        dailyIncomeRepo.Add(source);
                        dailyIncomeRepo.UnitofWork.Commit();

                        return source.Id;

                    }
                    else
                    {
                        throw new InvalidOperationException();
                    }

                }
                catch (Exception)
                {

                    throw;
                }
            });
        }

        public Task<bool> RemoveDailyIncome(Guid IncomeId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ChangeDailyIncome(DailyIncomeObject obj)
        {
            throw new NotImplementedException();
        }
    }
}
