using app.domain.seedwork;
using AutoMapper;
using BL.helpers;
using BL.logic;
using Domain_Modules.dt_Objects;
using Domain_Modules.objects;
using Engine.contracts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL.executors
{
    public class GenExpenseExecutor : IGenExpenseLogic
    {

        IMapper _Mapper;
        IGenExpenseRepository genExpenseRepo;

        public GenExpenseExecutor(IGenExpenseRepository _repo)
        {
            _Mapper = new Mapper(AppAdapterConfig.GetAppContextConfig());
            genExpenseRepo = _repo;

        }


        public Task<bool> UpdateGenExpense(GenExpenseObject obj)
        {
            return Task.Run(() =>
            {
                try
                {

                    GenExpense entity = _Mapper.Map<GenExpenseObject, GenExpense>(obj);

                    if (obj.Id != Guid.Empty)
                        genExpenseRepo.Update(entity);
                    genExpenseRepo.UnitofWork.Commit();

                    return true;

                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException(ex.Message);
                }
            });
        }

        public Task<Guid> CreateGenExpense(GenExpenseObject obj)
        {
            return Task.Run(() =>
            {
                try
                {

                    if (obj.Id == Guid.Empty)
                    {

                        var dataObj = new MapperConfiguration(doj =>
                        {
                            doj.CreateMap<GenExpenseObject, GenExpense>();
                        });

                        IMapper iMapper = dataObj.CreateMapper();

                        var source = new GenExpense();

                        source.Id = IdentityGenerator.NewSequentialGuid();
                        source.Amount = obj.Amount;
                        source.Description = obj.Description;
                        source.Purpose = obj.Purpose;
                        source.ExpenseDate = obj.ExpenseDate;

                        genExpenseRepo.Add(source);
                        genExpenseRepo.UnitofWork.Commit();

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

        public IList<GenExpenseObject> GetAllGenExpenseSheet()
        {
            try
            {
                List<GenExpenseObject> genExpenseList = new List<GenExpenseObject>();
                foreach (GenExpense source in (IEnumerable<GenExpense>)genExpenseRepo.GetAll())
                {
                    GenExpenseObject genObject = _Mapper.Map<GenExpense, GenExpenseObject>(source);
                    genExpenseList.Add(genObject);
                }

                return (IList<GenExpenseObject>)genExpenseList;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public GenExpenseObject GetGenExpense(Guid genExId)
        {
            try
            {

                return _Mapper.Map<GenExpense, GenExpenseObject>(genExpenseRepo.GetById(genExId));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<bool> RemoveGenExpense(GenExpenseObject obj)
        {
            return Task.Run(() =>
            {
                try
                {

                    if (obj.Id != Guid.Empty)
                        genExpenseRepo.Delete(obj.Id);
                    genExpenseRepo.UnitofWork.Commit();
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
