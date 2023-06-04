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
    public class DetailCompositionsController : ControllerBase
    {
        private readonly dbMRPprodContext _context;

        public DetailCompositionsController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET: api/DetailCompositions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetailComposition>>> GetDetailComposition()
        {
          if (_context.DetailComposition == null)
          {
              return NotFound();
          }
            return await _context.DetailComposition.ToListAsync();
        }

        // GET: api/DetailCompositions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DetailComposition>> GetDetailComposition(int id)
        {
          if (_context.DetailComposition == null)
          {
              return NotFound();
          }
            var detailComposition = await _context.DetailComposition.FindAsync(id);

            if (detailComposition == null)
            {
                return NotFound();
            }

            return detailComposition;
        }

        // PUT: api/DetailCompositions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetailComposition(int id, DetailComposition detailComposition)
        {
            if (id != detailComposition.Id)
            {
                return BadRequest();
            }

            _context.Entry(detailComposition).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetailCompositionExists(id))
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

        // POST: api/DetailCompositions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DetailComposition>> PostDetailComposition(DetailComposition detailComposition)
        {
          if (_context.DetailComposition == null)
          {
              return Problem("Entity set 'dbMRPprodContext.DetailComposition'  is null.");
          }
            _context.DetailComposition.Add(detailComposition);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDetailComposition", new { id = detailComposition.Id }, detailComposition);
        }

        // DELETE: api/DetailCompositions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetailComposition(int id)
        {
            if (_context.DetailComposition == null)
            {
                return NotFound();
            }
            var detailComposition = await _context.DetailComposition.FindAsync(id);
            if (detailComposition == null)
            {
                return NotFound();
            }

            _context.DetailComposition.Remove(detailComposition);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DetailCompositionExists(int id)
        {
            return (_context.DetailComposition?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
