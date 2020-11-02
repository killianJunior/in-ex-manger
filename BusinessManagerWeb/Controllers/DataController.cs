using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using BL.logic;
using Domain_Modules.dt_Objects;
using Domain_Modules.objects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BusinessManagerWeb.Controllers
{
    [RoutePrefix("api/[controller]")]
    [ApiController]
    public class DataController : ApiController
    {
        IExpenseLogic _Service;

        public DataController(IExpenseLogic _service)
        {
            _Service = _service;
        }

        public IHttpActionResult Get()
        {
            var expenses = _Service.GetAllExpenseSheet().Result;

            if (expenses != null)
            {
                return Ok(expenses);
            }

            return NotFound();

        }

        public IHttpActionResult Get(Guid id)
        {
            var expense = _Service.GetExpense(id).Result;

            if (expense == null)
            {
                return NotFound();
            }

            return Ok(expense);
        }

        public async Task<IHttpActionResult> Post(ExpenseObject Obj)
        {
            try
            {
                if (Obj.Id == Guid.Empty)
                {
                    Obj.Id = await _Service.CreateExpense(Obj);
                    if (Obj.Id != Guid.Empty)
                    {
                        return Ok(Obj.Id);
                    }
                    return BadRequest();
                }
                return BadRequest();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<IHttpActionResult> Delete(Guid id)
        {
            try
            {
                if (id != Guid.Empty)
                {
                    if (await _Service.RemoveExpense(id))
                    {
                        return Ok();
                    }
                    return BadRequest();
                }
                return BadRequest();
            }
            catch (Exception)
            {

                throw;
            }
        }


    }
}
