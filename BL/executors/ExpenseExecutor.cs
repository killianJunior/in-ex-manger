using app.domain.seedwork;
using AutoMapper;
using BL.helpers;
using BL.logic;
using Domain_Modules.dt_Objects;
using Domain_Modules.objects;
using Engine.contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BL.executors
{
    public class ExpenseExecutor : IExpenseLogic
    {
        IMapper _Mapper;
        IExpenseRepository expenseRepo;

        public ExpenseExecutor(IExpenseRepository _repo)
        {
            _Mapper = new Mapper(AppAdapterConfig.GetAppContextConfig());
            expenseRepo = _repo;
        }
        public Task<bool> UpdateExpense(ExpenseObject obj)
        {
            return Task.Run(() =>
            {
                try
                {

                    Expense entity = _Mapper.Map<ExpenseObject, Expense>(obj);

                    if (obj.Id != Guid.Empty)
                        expenseRepo.Update(entity);
                    expenseRepo.UnitofWork.Commit();

                    return true;

                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException(ex.Message);
                }
            });
        }

        public Task<Guid> CreateExpense(ExpenseObject obj)
        {
            return Task.Run(() =>
            {
                try
                {
                    if (obj.Id == Guid.Empty)
                    {

                        var dataObj = new MapperConfiguration(ap =>
                        {
                            ap.CreateMap<ExpenseObject, Expense>();
                        });

                        IMapper iMapper = dataObj.CreateMapper();

                        var source = new Expense();

                        source.Id = IdentityGenerator.NewSequentialGuid();
                        source.Amount = obj.Amount;
                        source.Date = obj.Date;
                        source.Details = obj.Details;

                        expenseRepo.Add(source);
                        expenseRepo.UnitofWork.Commit();

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

        public IList<ExpenseObject> GetAllExpenseSheet()
        {
            try
            {
                List<ExpenseObject> exObjecttList = new List<ExpenseObject>();
                foreach (Expense source in (IEnumerable<Expense>)expenseRepo.GetAll())
                {
                    ExpenseObject exObject = _Mapper.Map<Expense, ExpenseObject>(source);
                    exObjecttList.Add(exObject);
                }

                return (IList<ExpenseObject>)exObjecttList;
            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public ExpenseObject GetExpense(Guid ExpenseId)
        {
            try
            {

                return _Mapper.Map<Expense, ExpenseObject>(expenseRepo.GetById(ExpenseId));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<bool> RemoveExpense(ExpenseObject obj)
        {
            return Task.Run(() =>
            {
                try
                {

                    if (obj.Id != Guid.Empty)
                        expenseRepo.Delete(obj.Id);
                    expenseRepo.UnitofWork.Commit();
                    return true;

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            });
        }
    }
}
