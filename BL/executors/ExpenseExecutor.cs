using app.domain.seedwork;
using AutoMapper;
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

        IExpenseRepository expenseRepo;

        public ExpenseExecutor(IExpenseRepository _repo)
        {
            expenseRepo = _repo;
        }
        public Task<bool> ChangeExpense(ExpenseObject obj)
        {
            throw new NotImplementedException();
        }

        public Task<Guid> CreateExpense(ExpenseObject obj)
        {
            return Task.Run(() =>
            {
                try
                {
                    if (obj.Id == Guid.Empty)
                    {
                       /* obj.ModifiedDate = DateTime.Now;*/

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

        public Task<IList<ExpenseObject>> GetAllExpenseSheet()
        {
            throw new NotImplementedException();

/*
            return Task.Run(() =>
            {
                try
                {
                    using (var _uow = new CBAUoW())
                    {
                        var entities = _uow.Agent.GetAll().Where(x => x.isDelete == false);

                        if (entities.Count() > 0)
                        {
                            IList<AgentObject> list = new List<AgentObject>();
                            foreach (var entity in entities)
                            {
                                var obj = AutoMapper.Mapper.DynamicMap<Agent, AgentObject>(entity);

                                obj.FullName = entity.FullName;

                                list.Add(obj);

                            }

                            return list;
                        }
                        else
                        {
                            throw new InvalidOperationException();
                        }
                    }

                }
                catch (Exception)
                {

                    return null;
                }
            });*/
        }

        public Task<ExpenseObject> GetExpense(Guid ExpenseId)
        {
            return Task.Run(() =>
            {
                try
                {
                    if (ExpenseId != Guid.Empty)
                    {
                        Expense entity = expenseRepo.GetAllIncluding(new Expression<Func<Expense, object>>[] { }).Where(pt => pt.Id == ExpenseId).FirstOrDefault<Expense>();
                        var obj = new MapperConfiguration(doj =>
                        {
                            doj.CreateMap<Expense, ExpenseObject>();
                        });

                        IMapper iMapper = obj.CreateMapper();
                        var destination = new ExpenseObject();

                        destination.Amount = entity.Amount;
                        destination.Details = entity.Details;
                        destination.Date = entity.Date;

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

        public Task<bool> RemoveExpense(Guid ExpenseId)
        {
            throw new NotImplementedException();
        }
    }
}
