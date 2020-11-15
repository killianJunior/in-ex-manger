using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain_Modules.objects;
using Engine.dbConfiguration;
using Microsoft.Extensions.Logging;
using BL.logic;
using Domain_Modules.dt_Objects;

namespace BusinessManagerWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DailyIncomesController : ControllerBase
    {
        private readonly IDailyIncomeLogic _Logic;

        public DailyIncomesController(IDailyIncomeLogic _logic)
        {
            _Logic = _logic;
        }

        // GET: api/DailyIncomes
        [HttpGet]
        [Route("dailyIncomes")]
        public IActionResult GetAll()
        {
            try
            {
                var incomes = _Logic.GetAllDailyIncomeSheet();
                if (incomes != null)
                {
                    return Ok(incomes);
                }
                return NotFound();
            }
            catch (Exception ex)
            {

                throw ex;
            }
            /*return await _context.DailyIncome.ToListAsync();*/
        }

        // GET: api/DailyIncomes/5
        [HttpGet]
        [Route("dailyIncome/{id}")]
        public IActionResult Get(Guid id)
        {
            try
            {
                var dailyIncome = _Logic.GetDailyIncome(id);
                if (dailyIncome != null)
                {
                    return Ok(dailyIncome);
                }

                return NotFound();

            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT: api/DailyIncomes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut]
        [Route("updateIncome/{id}")]
        public async Task<IActionResult> Put(DailyIncomeObject obj)
        {
            try
            {
                if (obj.Id != Guid.Empty)
                {
                    if (await _Logic.UpdateDailyIncome(obj))
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

        // POST: api/DailyIncomes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Route("addDailyIncome")]
        public async Task<ActionResult<DailyIncome>> Post(DailyIncomeObject obj)
        {
            try
            {

                if (obj.Id == Guid.Empty)
                {
                    obj.Id = await _Logic.CreateDailyIncome(obj);
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

        // DELETE: api/DailyIncomes/5
        [HttpDelete]
        [Route("deleteIncome/{id}")]
        public async Task<ActionResult<DailyIncome>> Delete(DailyIncomeObject obj)
        {
            try
            {
                if (obj.Id != Guid.Empty)
                {
                    if (await _Logic.RemoveDailyIncome(obj))
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
