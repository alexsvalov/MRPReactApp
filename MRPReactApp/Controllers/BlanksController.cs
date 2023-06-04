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
    public class BlanksController : ControllerBase
    {
        private readonly dbMRPprodContext _context;

        public BlanksController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET: api/Blanks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Blank>>> GetBlank()
        {
          if (_context.Blank == null)
          {
              return NotFound();
          }
            return await _context.Blank
                .Include(x => x.MaterialNavigation)
                    .ThenInclude(x => x.MarkNavigation)
                .Include(x => x.MaterialNavigation)
                    .ThenInclude(x => x.TypeNavigation)
                .ToListAsync();
        }

        // GET: api/Blanks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Blank>> GetBlank(int id)
        {
          if (_context.Blank == null)
          {
              return NotFound();
          }
            var blank = await _context.Blank.FindAsync(id);

            if (blank == null)
            {
                return NotFound();
            }

            return blank;
        }

        // PUT: api/Blanks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlank(int id, Blank blank)
        {
            if (id != blank.Id)
            {
                return BadRequest();
            }

            _context.Entry(blank).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlankExists(id))
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

        // POST: api/Blanks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Blank>> PostBlank(Blank blank)
        {
          if (_context.Blank == null)
          {
              return Problem("Entity set 'dbMRPprodContext.Blank'  is null.");
          }
            _context.Blank.Add(blank);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBlank", new { id = blank.Id }, blank);
        }

        // DELETE: api/Blanks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlank(int id)
        {
            if (_context.Blank == null)
            {
                return NotFound();
            }
            var blank = await _context.Blank.FindAsync(id);
            if (blank == null)
            {
                return NotFound();
            }

            _context.Blank.Remove(blank);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BlankExists(int id)
        {
            return (_context.Blank?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
