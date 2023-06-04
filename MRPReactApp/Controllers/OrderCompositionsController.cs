using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
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
    public class OrderCompositionsController : ControllerBase
    {
        private readonly dbMRPprodContext _context;

        public OrderCompositionsController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET: api/OrderCompositions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderComposition>>> GetOrderCompositionFilter()
        {
            if (_context.OrderComposition == null)
            {
                return NotFound();
            }

            return await _context.OrderComposition
                .Include(o => o.OrderProductNavigation)
                .Include(p => p.ProductNavigation)
                    .ThenInclude(t => t.TypeNavigation)
                .Include(p => p.ProductNavigation)
                    .ThenInclude(x => x.KindNavigation)
                    .ToListAsync();
        }

        // GET: api/OrderCompositions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderComposition>> GetOrderComposition(int id)
        {
            if (_context.OrderComposition == null)
            {
                return NotFound();
            }
            var orderComposition = await _context.OrderComposition.FindAsync(id);

            if (orderComposition == null)
            {
                return NotFound();
            }

            return orderComposition;
        }

        // PUT: api/OrderCompositions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderComposition(int id, OrderComposition orderComposition)
        {
            if (id != orderComposition.Id)
            {
                return BadRequest();
            }

            _context.Entry(orderComposition).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderCompositionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OrderCompositions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrderComposition>> PostOrderComposition(OrderComposition orderComposition)
        {
            if (_context.OrderComposition == null)
            {
                return Problem("Entity set 'dbMRPprodContext.OrderComposition'  is null.");
            }
            _context.OrderComposition.Add(orderComposition);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderComposition", new { id = orderComposition.Id }, orderComposition);
        }

        // DELETE: api/OrderCompositions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderComposition(int id)
        {
            if (_context.OrderComposition == null)
            {
                return NotFound();
            }
            var orderComposition = await _context.OrderComposition.FindAsync(id);
            if (orderComposition == null)
            {
                return NotFound();
            }

            _context.OrderComposition.Remove(orderComposition);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderCompositionExists(int id)
        {
            return (_context.OrderComposition?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
