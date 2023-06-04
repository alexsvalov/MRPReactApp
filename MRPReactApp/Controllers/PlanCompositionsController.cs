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
    public class PlanCompositionsController : ControllerBase
    {
        private readonly dbMRPprodContext _context;

        public PlanCompositionsController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET: api/PlanCompositions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlanComposition>>> GetPlanComposition()
        {
          if (_context.PlanComposition == null)
          {
              return NotFound();
          }
            return await _context.PlanComposition.ToListAsync();
        }

        // GET: api/PlanCompositions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlanComposition>> GetPlanComposition(int id)
        {
          if (_context.PlanComposition == null)
          {
              return NotFound();
          }
            var planComposition = await _context.PlanComposition.FindAsync(id);

            if (planComposition == null)
            {
                return NotFound();
            }

            return planComposition;
        }

        // PUT: api/PlanCompositions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlanComposition(int id, PlanComposition planComposition)
        {
            if (id != planComposition.Id)
            {
                return BadRequest();
            }

            _context.Entry(planComposition).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlanCompositionExists(id))
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

        // POST: api/PlanCompositions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PlanComposition>> PostPlanComposition(PlanComposition planComposition)
        {
          if (_context.PlanComposition == null)
          {
              return Problem("Entity set 'dbMRPprodContext.PlanComposition'  is null.");
          }
            _context.PlanComposition.Add(planComposition);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlanComposition", new { id = planComposition.Id }, planComposition);
        }

        // DELETE: api/PlanCompositions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlanComposition(int id)
        {
            if (_context.PlanComposition == null)
            {
                return NotFound();
            }
            var planComposition = await _context.PlanComposition.FindAsync(id);
            if (planComposition == null)
            {
                return NotFound();
            }

            _context.PlanComposition.Remove(planComposition);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlanCompositionExists(int id)
        {
            return (_context.PlanComposition?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
