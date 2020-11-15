using app.domain.seedwork;
using app_businesslogic_seedwork;
using AutoMapper;
using BL.helpers;
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

        IMapper _Mapper;
        IDailyIncomeRepository dailyIncomeRepo;

        public DailyIncomeExecutor(IDailyIncomeRepository _repo) 
        {
            _Mapper = new Mapper(AppAdapterConfig.GetAppContextConfig());
            dailyIncomeRepo = _repo;

        }


        public DailyIncomeObject GetDailyIncome(Guid IncomeId)
        {
            try
            {

                return _Mapper.Map<DailyIncome, DailyIncomeObject>(dailyIncomeRepo.GetById(IncomeId));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IList<DailyIncomeObject> GetAllDailyIncomeSheet()
        {
            try
            {
                List<DailyIncomeObject> dailyIncomeList = new List<DailyIncomeObject>();
                foreach(DailyIncome source in (IEnumerable<DailyIncome>)dailyIncomeRepo.GetAll())
                {
                    DailyIncomeObject incomeObject = _Mapper.Map<DailyIncome, DailyIncomeObject>(source);
                    dailyIncomeList.Add(incomeObject);
                }

                return (IList<DailyIncomeObject>)dailyIncomeList;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public Task<Guid> CreateDailyIncome(DailyIncomeObject obj)
        {
            return Task.Run(() =>
            {
                try
                {

                    if (obj.Id == Guid.Empty)
                    {

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
                        source.Profit = obj.Profit;
                        source.DaillyAllowance = obj.DaillyAllowance;
                        source.EntryDate = obj.EntryDate;
                        source.Expenses = obj.Expenses;

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

        public Task<bool> RemoveDailyIncome(DailyIncomeObject obj)
        {
            return Task.Run(() =>
            {
                try
                {

                    if (obj.Id != Guid.Empty)
                        dailyIncomeRepo.Delete(obj.Id);
                    dailyIncomeRepo.UnitofWork.Commit();
                    return true;

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            });
        }

        public Task<bool> UpdateDailyIncome(DailyIncomeObject obj)
        {
            return Task.Run(() =>
            {
                try
                {

                    DailyIncome entity = _Mapper.Map<DailyIncomeObject, DailyIncome>(obj);

                    if (obj.Id != Guid.Empty)
                        dailyIncomeRepo.Update(entity);
                    dailyIncomeRepo.UnitofWork.Commit();

                    return true;

                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException(ex.Message);
                }
            });
        }
    }
}
