using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MRPReactApp.Models;

namespace MRPReactApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderCompositionsFilterController : ControllerBase
    {
        private readonly dbMRPprodContext _context;

        public OrderCompositionsFilterController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET: api/OrderCompositionsFilter/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<OrderComposition>>> GetOrderComposition(int id)
        {
            if (_context.OrderComposition == null)
            {
                return NotFound();
            }

            var orderComposition = await _context.OrderComposition
                .Where(x => x.OrderProduct == id)
                .Include(o => o.OrderProductNavigation)
                .Include(p => p.ProductNavigation)
                    .ThenInclude(t => t.TypeNavigation)
                .Include(p => p.ProductNavigation)
                    .ThenInclude(x => x.KindNavigation)
                .ToListAsync();

            if (orderComposition == null)
            {
                return NotFound();
            }

            return orderComposition;
        }
    }
}
