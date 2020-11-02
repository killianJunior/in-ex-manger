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
    [Route("[controller]")]
    public class ExpensesController : ControllerBase
    {
       /* private readonly BmDbContext _context;*/
        IExpenseLogic _service;

        public ExpensesController(IExpenseLogic service)
        {
            _service = service;
        }

        // GET: api/Expenses
        [HttpGet]
        [Route("expenses")]
        public ActionResult<IEnumerable<Expense>> Get()
        {
            var expenses = _service.GetAllExpenseSheet().Result;

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
        [HttpGet("{id}")]
        public ActionResult<Expense> Get(Guid id)
        {
            var expense = _service.GetExpense(id).Result;

            if (expense == null)
            {
                return NotFound();
            }

            return Ok(expense);
        }

        // PUT: api/Expenses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(ExpenseObject obj)
        {

            try
            {
                if (obj.Id != Guid.Empty)
                {
                    if (await _service.ChangeExpense(obj))
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

           /* if (id != expense.Id)
            {
                return BadRequest();
            }

            _context.Entry(expense).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();*/
        }

        // POST: api/Expenses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
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
        [HttpDelete("{id}")]
        public async Task<ActionResult<Expense>> Delete(Guid id)
        {
            try
            {
                if (id != Guid.Empty)
                {
                    if (await _service.RemoveExpense(id))
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

       /* private bool ExpenseExists(Expense)
        {
            try
            {
                if (id == )
                {

                }
            }
            catch (Exception)
            {

                throw;
            }
            return _service.Expense.Any(e => e.Id == id);
        }*/
    }
}
