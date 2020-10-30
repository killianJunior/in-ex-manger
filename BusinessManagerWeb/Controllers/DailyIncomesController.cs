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
        /*private readonly ILogger<DailyIncomesController> _logger;*/

        public DailyIncomesController(IDailyIncomeLogic _logic)
        {
            _Logic = _logic;
            /* _logger = logger;*/
        }

        // GET: api/DailyIncomes
        [HttpGet]
        [Route("dailyIncomes")]
        public IActionResult GetDailyIncome()
        {
            try
            {
                var incomes = _Logic.GetAllDailyIncomeSheet().Result;
                if (incomes != null)
                {
                    return Ok(incomes);
                }
                return NotFound();
            }
            catch (Exception)
            {

                throw;
            }
            /*return await _context.DailyIncome.ToListAsync();*/
        }

        // GET: api/DailyIncomes/5
        [HttpGet("{id}")]
        public IActionResult GetDailyIncome(Guid id)
        {
            try
            {
                var dailyIncome = _Logic.GetDailyIncome(id).Result;
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
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDailyIncome(DailyIncomeObject obj)
        {
            try
            {
                if (obj.Id != Guid.Empty)
                {
                    if (await _Logic.ChangeDailyIncome(obj))
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
        public async Task<ActionResult<DailyIncome>> PostDailyIncome(DailyIncomeObject obj)
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
        [HttpDelete("{id}")]
        public async Task<ActionResult<DailyIncome>> DeleteDailyIncome(Guid id)
        {
            try
            {
                if (id != Guid.Empty)
                {
                    if (await _Logic.RemoveDailyIncome(id))
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

       /* private bool DailyIncomeExists(Guid id)
        {
            return _context.DailyIncome.Any(e => e.Id == id);
        }*/
    }
}
