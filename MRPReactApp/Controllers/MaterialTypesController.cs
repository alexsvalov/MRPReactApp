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
    public class MaterialTypesController : ControllerBase
    {
        private readonly dbMRPprodContext _context;

        public MaterialTypesController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET: api/MaterialTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaterialType>>> GetMaterialType()
        {
          if (_context.MaterialType == null)
          {
              return NotFound();
          }
            return await _context.MaterialType.ToListAsync();
        }

        // GET: api/MaterialTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MaterialType>> GetMaterialType(int id)
        {
          if (_context.MaterialType == null)
          {
              return NotFound();
          }
            var materialType = await _context.MaterialType.FindAsync(id);

            if (materialType == null)
            {
                return NotFound();
            }

            return materialType;
        }

        // PUT: api/MaterialTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaterialType(int id, MaterialType materialType)
        {
            if (id != materialType.Id)
            {
                return BadRequest();
            }

            _context.Entry(materialType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialTypeExists(id))
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

        // POST: api/MaterialTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MaterialType>> PostMaterialType(MaterialType materialType)
        {
          if (_context.MaterialType == null)
          {
              return Problem("Entity set 'dbMRPprodContext.MaterialType'  is null.");
          }
            _context.MaterialType.Add(materialType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMaterialType", new { id = materialType.Id }, materialType);
        }

        // DELETE: api/MaterialTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterialType(int id)
        {
            if (_context.MaterialType == null)
            {
                return NotFound();
            }
            var materialType = await _context.MaterialType.FindAsync(id);
            if (materialType == null)
            {
                return NotFound();
            }

            _context.MaterialType.Remove(materialType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MaterialTypeExists(int id)
        {
            return (_context.MaterialType?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
