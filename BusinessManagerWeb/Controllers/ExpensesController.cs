using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain_Modules.objects;
using Engine.dbConfiguration;
using BL.logic;
using Domain_Modules.dt_Objects;

namespace BusinessManagerWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpensesController : ControllerBase
    {
        IExpenseLogic _service;

        public ExpensesController(IExpenseLogic service)
        {
            _service = service;
        }

        // GET: api/Expenses
        [HttpGet]
        [Route("expenses")]
        public ActionResult<IEnumerable<Expense>> GetAll()
        {
            var expenses = _service.GetAllExpenseSheet();

            if (expenses != null)
            {
                return Ok(expenses);
            }

            return NotFound();

        }
      /*  public async Task<ActionResult<IEnumerable<Expense>>> GetExpense()
        {
            return await _context.Expense.ToListAsync();
        }*/

        // GET: api/Expenses/5
        [HttpGet]
        [Route("expense/{id}")]
        public ActionResult<Expense> Get(Guid id)
        {
            var expense = _service.GetExpense(id);

            if (expense == null)
            {
                return NotFound();
            }

            return Ok(expense);
        }

        // PUT: api/Expenses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut]
        [Route("updateExpense/{id}")]
        public async Task<IActionResult> Put(ExpenseObject obj)
        {

            try
            {
                if (obj.Id != Guid.Empty)
                {
                    if (await _service.UpdateExpense(obj))
                    {
                        return Ok();
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

        // POST: api/Expenses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Route("addExpense")]
        public async Task<ActionResult<Expense>> Post(ExpenseObject Obj)
        {
            try
            {
                if (Obj.Id == Guid.Empty)
                {
                    Obj.Id = await _service.CreateExpense(Obj);
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

        // DELETE: api/Expenses/5
        [HttpDelete]
        [Route("deleteExpense/{id}")]
        public async Task<ActionResult<Expense>> Delete(ExpenseObject Obj)
        {
            try
            {
                if (Obj.Id != Guid.Empty)
                {
                    if (await _service.RemoveExpense(Obj))
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
