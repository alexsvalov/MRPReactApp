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
    public class PlanProductsController : ControllerBase
    {
        private readonly dbMRPprodContext _context;

        public PlanProductsController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET: api/PlanProducts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlanProduct>>> GetPlanProduct()
        {
          if (_context.PlanProduct == null)
          {
              return NotFound();
          }
            return await _context.PlanProduct.ToListAsync();
        }

        // GET: api/PlanProducts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlanProduct>> GetPlanProduct(int id)
        {
          if (_context.PlanProduct == null)
          {
              return NotFound();
          }
            var planProduct = await _context.PlanProduct.FindAsync(id);

            if (planProduct == null)
            {
                return NotFound();
            }

            return planProduct;
        }

        // PUT: api/PlanProducts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlanProduct(int id, PlanProduct planProduct)
        {
            if (id != planProduct.Id)
            {
                return BadRequest();
            }

            _context.Entry(planProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlanProductExists(id))
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

        // POST: api/PlanProducts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PlanProduct>> PostPlanProduct(PlanProduct planProduct)
        {
          if (_context.PlanProduct == null)
          {
              return Problem("Entity set 'dbMRPprodContext.PlanProduct'  is null.");
          }
            _context.PlanProduct.Add(planProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlanProduct", new { id = planProduct.Id }, planProduct);
        }

        // DELETE: api/PlanProducts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlanProduct(int id)
        {
            if (_context.PlanProduct == null)
            {
                return NotFound();
            }
            var planProduct = await _context.PlanProduct.FindAsync(id);
            if (planProduct == null)
            {
                return NotFound();
            }

            _context.PlanProduct.Remove(planProduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlanProductExists(int id)
        {
            return (_context.PlanProduct?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
