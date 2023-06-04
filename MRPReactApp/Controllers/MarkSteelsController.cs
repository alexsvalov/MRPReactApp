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
    public class MarkSteelsController : ControllerBase
    {
        private readonly dbMRPprodContext _context;

        public MarkSteelsController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET: api/MarkSteels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MarkSteel>>> GetMarkSteel()
        {
          if (_context.MarkSteel == null)
          {
              return NotFound();
          }
            return await _context.MarkSteel.ToListAsync();
        }

        // GET: api/MarkSteels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MarkSteel>> GetMarkSteel(int id)
        {
          if (_context.MarkSteel == null)
          {
              return NotFound();
          }
            var markSteel = await _context.MarkSteel.FindAsync(id);

            if (markSteel == null)
            {
                return NotFound();
            }

            return markSteel;
        }

        // PUT: api/MarkSteels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMarkSteel(int id, MarkSteel markSteel)
        {
            if (id != markSteel.Id)
            {
                return BadRequest();
            }

            _context.Entry(markSteel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MarkSteelExists(id))
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

        // POST: api/MarkSteels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MarkSteel>> PostMarkSteel(MarkSteel markSteel)
        {
          if (_context.MarkSteel == null)
          {
              return Problem("Entity set 'dbMRPprodContext.MarkSteel'  is null.");
          }
            _context.MarkSteel.Add(markSteel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMarkSteel", new { id = markSteel.Id }, markSteel);
        }

        // DELETE: api/MarkSteels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMarkSteel(int id)
        {
            if (_context.MarkSteel == null)
            {
                return NotFound();
            }
            var markSteel = await _context.MarkSteel.FindAsync(id);
            if (markSteel == null)
            {
                return NotFound();
            }

            _context.MarkSteel.Remove(markSteel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MarkSteelExists(int id)
        {
            return (_context.MarkSteel?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
