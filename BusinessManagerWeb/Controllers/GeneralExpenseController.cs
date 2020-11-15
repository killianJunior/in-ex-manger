using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL.logic;
using Domain_Modules.dt_Objects;
using Domain_Modules.objects;
using Microsoft.AspNetCore.Mvc;

namespace BusinessManagerWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeneralExpenseController : Controller
    {
        private readonly IGenExpenseLogic _Logic;

        public GeneralExpenseController(IGenExpenseLogic _logic)
        {
            _Logic = _logic;
        }


        [HttpGet]
        [Route("genExpenses")]
        public IActionResult GetAll()
        {
            try
            {
                var genExpenses = _Logic.GetAllGenExpenseSheet();
                if (genExpenses != null)
                {
                    return Ok(genExpenses);
                }
                return NotFound();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        // GET: api/DailyIncomes/5
        [HttpGet]
        [Route("genExpense/{id}")]
        public IActionResult Get(Guid id)
        {
            try
            {
                var genExpense = _Logic.GetGenExpense(id);
                if (genExpense != null)
                {
                    return Ok(genExpense);
                }

                return NotFound();

            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT: api/genExpenses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut]
        [Route("updateGenExpense/{id}")]
        public async Task<IActionResult> Put(GenExpenseObject obj)
        {
            try
            {
                if (obj.Id != Guid.Empty)
                {
                    if (await _Logic.UpdateGenExpense(obj))
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

        // POST: api/genExpenses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Route("addGenExpense")]
        public async Task<ActionResult<GenExpenseObject>> Post(GenExpenseObject obj)
        {
            try
            {

                if (obj.Id == Guid.Empty)
                {
                    obj.Id = await _Logic.CreateGenExpense(obj);
                    if (obj.Id != Guid.Empty)
                    {
                        return Ok(obj.Id);
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

        // DELETE: api/genExpense/5
        [HttpDelete]
        [Route("deleteGenExpense/{id}")]
        public async Task<ActionResult<GenExpenseObject>> Delete(GenExpenseObject obj)
        {
            try
            {
                if (obj.Id != Guid.Empty)
                {
                    if (await _Logic.RemoveGenExpense(obj))
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

