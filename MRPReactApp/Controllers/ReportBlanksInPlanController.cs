using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using MRPReactApp.Models;
using MRPReactApp.Reports;

namespace MRPReactApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportBlanksInPlanController : ControllerBase
    {

        private readonly dbMRPprodContext _context;

        public ReportBlanksInPlanController(dbMRPprodContext context)
        {
            _context = context;
        }


        // GET api/<ReportBlanksInPlanController>/5
        [HttpGet("{id}")]
        public List<BlankAggregate>? GetBlanksInPlan(int id)
        {
            if (_context.Product == null)
            {
                return null;
            }

            List<ProductAggregate>? detailsInPlan = new ReportDetailsInPlanController(_context).GetDetailsInPlan(id);

            if (detailsInPlan == null)
            {
                return null;
            }

            List<BlankAggregate> blanksInPlan =
                    (from detail in detailsInPlan
                     
                     join detailComposition in _context.DetailComposition
                     on detail.Id equals detailComposition.Product

                     join blank in _context.Blank
                     on detailComposition.Blank equals blank.Id

                     group new { blank, detail } by new { blank.Id, blank.Material, blank.Weight } into g
                     orderby g.Key.Id

                     select new BlankAggregate
                     {
                         Id = g.Key.Id,
                         Material = g.Key.Material,
                         QuantityCount = g.Count(),
                         QuantityWeight = g.Sum(x => (decimal)x.detail.Quantity * g.Key.Weight)
                     }).ToList();

            return blanksInPlan;
        }
    }
}
