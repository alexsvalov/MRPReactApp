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
    public class DetailCompositionsFilterController : ControllerBase
    {
        private readonly dbMRPprodContext _context;

        public DetailCompositionsFilterController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET: api/DetailCompositionsFilter/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<DetailComposition>>> GetDetailComposition(int id)
        {
            if (_context.DetailComposition == null)
            {
                return NotFound();
            }

            var detailComposition = await _context.DetailComposition
                .Where(x => x.Product == id)
                .Include(o => o.BlankNavigation)
                    .ThenInclude(t => t.MaterialNavigation)
                        .ThenInclude(t => t.TypeNavigation)
                .Include(o => o.BlankNavigation)
                    .ThenInclude(t => t.MaterialNavigation)
                        .ThenInclude(t => t.MarkNavigation)
                .Include(p => p.ProductNavigation)
                .ToListAsync();

            if (detailComposition == null)
            {
                return NotFound();
            }

            return detailComposition;
        }
    }
}
