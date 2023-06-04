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
    public class ProductKindsController : ControllerBase
    {
        private readonly dbMRPprodContext _context;

        public ProductKindsController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET: api/ProductKinds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductKind>>> GetProductKind()
        {
          if (_context.ProductKind == null)
          {
              return NotFound();
          }
            return await _context.ProductKind.ToListAsync();
        }

        // GET: api/ProductKinds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductKind>> GetProductKind(int id)
        {
          if (_context.ProductKind == null)
          {
              return NotFound();
          }
            var productKind = await _context.ProductKind.FindAsync(id);

            if (productKind == null)
            {
                return NotFound();
            }

            return productKind;
        }

        // PUT: api/ProductKinds/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductKind(int id, ProductKind productKind)
        {
            if (id != productKind.Id)
            {
                return BadRequest();
            }

            _context.Entry(productKind).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductKindExists(id))
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

        // POST: api/ProductKinds
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductKind>> PostProductKind(ProductKind productKind)
        {
          if (_context.ProductKind == null)
          {
              return Problem("Entity set 'dbMRPprodContext.ProductKind'  is null.");
          }
            _context.ProductKind.Add(productKind);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductKind", new { id = productKind.Id }, productKind);
        }

        // DELETE: api/ProductKinds/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductKind(int id)
        {
            if (_context.ProductKind == null)
            {
                return NotFound();
            }
            var productKind = await _context.ProductKind.FindAsync(id);
            if (productKind == null)
            {
                return NotFound();
            }

            _context.ProductKind.Remove(productKind);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductKindExists(int id)
        {
            return (_context.ProductKind?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
