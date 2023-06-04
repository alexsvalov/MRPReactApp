using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using MRPReactApp.Models;
using MRPReactApp.Reports;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MRPReactApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportPurchaseInPlanController : ControllerBase
    {
        private readonly dbMRPprodContext _context;
        private readonly List<ProductAggregate> result = new();

        public ReportPurchaseInPlanController(dbMRPprodContext context)
        {
            _context = context;
        }


        // GET api/<ReportPurchaseInPlanController>/5
        [HttpGet("{id}")]
        public List<ProductAggregate>? GetPurchasesInPlan(int id)
        {
            if (_context.Product == null)
            {
                return null;
            }

            List<ProductAggregate>? productsInPlan = new ReportProductsInPlanController(_context).GetProductsInPlan(id);
            
            if (productsInPlan == null)
            {
                return null;
            }

            List<ProductAggregate> detailsInComponents = GetComponents(productsInPlan);
            List<ProductAggregate> detailsInPlan =
                (from d in detailsInComponents
                 group new { d } by new { d.Id, d.Code, d.Name, d.Type, d.TypeName, d.Kind, d.KindName, d.Purchase } into g
                 orderby g.Key.Name
                 select new ProductAggregate
                 {
                     Id = g.Key.Id,
                     Code = g.Key.Code,
                     Name = g.Key.Name,
                     Type = g.Key.Type,
                     Kind = g.Key.Kind,
                     TypeName = g.Key.TypeName,
                     KindName = g.Key.KindName,
                     Purchase = g.Key.Purchase,
                     Quantity = g.Sum(x => x.d.Quantity)
                 }).ToList();
            return detailsInPlan;
        }

        public List<ProductAggregate> GetComponents(List<ProductAggregate> products)
        {
            List<ProductAggregate> selected = new();
            List<ProductAggregate> selectedComponents = new();
            List<ProductAggregate> resultTemp = new();

            result.AddRange(products.Where(p => p.Purchase == true));
            selected.AddRange(products.Where(p => p.Purchase != true && p.Type != 1));

            foreach (ProductAggregate item in selected)
            {
                List<ProductAggregate> components =
                    (from specification in _context.Specification

                     join component in _context.Product
                     on specification.Component equals component.Id
                     
                     join pt in _context.ProductType
                     on component.Type equals pt.Id

                     join pk in _context.ProductKind
                     on component.Kind equals pk.Id

                     where item.Id == specification.Product
                     select new ProductAggregate
                     {
                         Id = component.Id,
                         Code = component.Code,
                         Name = component.Name,
                         Type = component.Type,
                         Kind = component.Kind,
                         TypeName = pt.Name,
                         KindName = pk.Name,
                         Purchase = component.Purchase,
                         Quantity = item.Quantity * specification.Quantity
                     }).ToList();
                selectedComponents.AddRange(components);
            }

            if (selectedComponents.Count == 0)
            {
                return result;
            }
            else
            {
                result.AddRange(selectedComponents.Where(p => p.Purchase == true));
                resultTemp.AddRange(selectedComponents.Where(p => p.Purchase != true && p.Type != 1));
                return GetComponents(resultTemp);
            }
        }
    }
}
