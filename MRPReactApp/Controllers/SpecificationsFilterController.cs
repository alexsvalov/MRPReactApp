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
    public class SpecificationsFilterController : ControllerBase
    {
        private readonly dbMRPprodContext _context;

        public SpecificationsFilterController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET: api/SpecificationsFilter
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Specification>>> GetSpecification()
        {
            if (_context.Specification == null)
            {
                return NotFound();
            }
            return await _context.Specification.ToListAsync();
        }

        // GET: api/SpecificationsFilter/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Specification>>> GetSpecification(int id)
        {
            if (_context.Specification == null)
            {
                return NotFound();
            }

            var specification = await _context.Specification
                    .Where(x => x.Product == id)
                        .Include(x => x.ProductNavigation)
                        .Include(x => x.ComponentNavigation)
                            .ThenInclude(t => t.TypeNavigation)
                        .Include(x => x.ComponentNavigation)
                            .ThenInclude(k => k.KindNavigation)
                    .ToListAsync();

            if (specification == null)
            {
                return NotFound();
            }

            return specification;
        }
    }
}
