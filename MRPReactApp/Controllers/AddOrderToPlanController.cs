using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MRPReactApp.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MRPReactApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddOrderToPlanController : ControllerBase
    {

        private readonly dbMRPprodContext _context;

        public AddOrderToPlanController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET api/<AddOrderToPlanController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<OrderProduct>>> GetOrderToPlan(int id)
        {
            if (_context.OrderProduct == null)
            {
                return NotFound();
            }
            //var orderProduct = (from item in _context.PlanComposition
            //               where item.PlanProduct == id
            //               select item.OrderProduct).ToList();


            //return await (from item in _context.OrderProduct
            //              where !orderProduct.Contains(item.Id)
            //              select item).ToListAsync();


            var orderProduct = (from item in _context.PlanComposition
                                where item.PlanProduct == id
                                select item.OrderProduct)
                                .ToList();

            return await _context.OrderProduct
                .Where(x => !orderProduct.Contains(x.Id))
                .Include(p => p.CustomerNavigation)
                .ToListAsync();
        }

    }
}
