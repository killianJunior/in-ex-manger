using BL.logic;
using Domain_Modules.dt_Objects;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace Controllers
{

    [Route("api/[controller]")]
    public class DailyIncomeController : ApiController
    {

        IDailyIncomeLogic _Service;

        public DailyIncomeController(IDailyIncomeLogic _service)
        {
            _Service = _service;
        }

        public async Task<IHttpActionResult> Post(DailyIncomeObject obj)
        {
            try
            {
                if (obj.Id == Guid.Empty)
                {
                    obj.Id = await _Service.CreateDailyIncome(obj);
                     if (obj.Id != Guid.Empty)
                    {
                        return Ok(obj.Id);
                    }
                    return BadRequest();
                }
                return BadRequest();
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

    }
}
