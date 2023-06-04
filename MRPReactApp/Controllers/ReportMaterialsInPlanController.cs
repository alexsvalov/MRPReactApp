using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MRPReactApp.Models;
using MRPReactApp.Reports;

namespace MRPReactApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportMaterialsInPlanController : ControllerBase
    {
        private readonly dbMRPprodContext _context;

        public ReportMaterialsInPlanController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET: api/ReportMaterialsInPlan/5
        [HttpGet("{id}")]
        public List<BlankAggregate>? GetMaterialsInPlan(int id)
        {
            if (_context.Product == null)
            {
                return null;
            }

            List<BlankAggregate>? blanksInPlan = new ReportBlanksInPlanController(_context).GetBlanksInPlan(id);

            if (blanksInPlan == null)
            {
                return null;
            }

            List<BlankAggregate> materialsInPlan =
                    (from blank in blanksInPlan
                     group new { blank } by new { blank.Material } into g
                     select new BlankAggregate
                     {
                         Material = g.Key.Material,
                         QuantityWeight = g.Sum(x => x.blank.QuantityWeight)
                     }).ToList();

            return materialsInPlan;
        }
    }
}
