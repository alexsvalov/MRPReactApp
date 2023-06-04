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
    public class PlanCompositionsFilterController : ControllerBase
    {
        private readonly dbMRPprodContext _context;

        public PlanCompositionsFilterController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET: api/PlanCompositionsFilter/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<PlanComposition>>> GetPlanComposition(int id)
        {
            if (_context.PlanComposition == null)
            {
                return NotFound();
            }

            var planComposition = await _context.PlanComposition
                .Where(x => x.PlanProduct == id)
                .Include(o => o.OrderProductNavigation)
                    .ThenInclude(t => t.CustomerNavigation)
                .Include(p => p.PlanProductNavigation)
                .ToListAsync();

            if (planComposition == null)
            {
                return NotFound();
            }

            return planComposition;
        }
    }
}
