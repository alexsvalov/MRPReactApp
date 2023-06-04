using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MRPReactApp.Models;
using MRPReactApp.Reports;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MRPReactApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportProductsInPlanController : ControllerBase
    {
        private readonly dbMRPprodContext _context;

        public ReportProductsInPlanController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET api/<ReportProductsInPlanController>/5
        [HttpGet("{id}")]

        public List<ProductAggregate>? GetProductsInPlan(int id)
        {
            if (_context.Product == null)
            {
                return null;
            }

            var query =
                from item in _context.PlanComposition

                join o in _context.OrderProduct
                on item.OrderProduct equals o.Id

                join oc in _context.OrderComposition
                on o.Id equals oc.OrderProduct

                join p in _context.Product
                on oc.Product equals p.Id

                where item.PlanProduct == id

                group new { item, o, oc, p } by new { p.Id, p.Code, p.Name, p.Type, p.Kind, p.Purchase } into g

                orderby g.Key.Name

                select new ProductAggregate
                {
                    Id = g.Key.Id,
                    Code = g.Key.Code,
                    Name = g.Key.Name,
                    Type = g.Key.Type,
                    Kind = g.Key.Kind,
                    Purchase = g.Key.Purchase,
                    Quantity = g.Sum(x => x.oc.Quantity)
                };

            var queryResult =
                from p in query
                join pt in _context.ProductType
                on p.Type equals pt.Id

                join pk in _context.ProductKind
                on p.Kind equals pk.Id

                select new ProductAggregate
                {
                    Id = p.Id,
                    Code = p.Code,
                    Name = p.Name,
                    Type = p.Type,
                    Kind = p.Kind,
                    KindName = pk.Name,
                    TypeName = pt.Name,
                    Purchase = p.Purchase,
                    Quantity = p.Quantity
                };

            return queryResult.ToList();
        }
    }
}
