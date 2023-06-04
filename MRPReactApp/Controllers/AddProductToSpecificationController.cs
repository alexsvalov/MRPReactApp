using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MRPReactApp.Models;
using MRPReactApp.Reports;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MRPReactApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddProductToSpecificationController : ControllerBase
    {

        private readonly dbMRPprodContext _context;

        public AddProductToSpecificationController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET api/<AddProductToSpecification>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductToSpecification(int id)
        {
            if (_context.Product == null)
            {
                return NotFound();
            }
            var product = (from item in _context.Specification
                           where item.Product == id
                           select item.Component).ToList();

            return await _context.Product
                .Where(x => x.Id != id && !product.Contains(x.Id))
                .Include(x => x.TypeNavigation)
                .Include(x => x.KindNavigation)
                .ToListAsync();

            //return await (from component in _context.Product
            //              join type in _context.ProductType
            //              on component.Type equals type.Id
            //              into ps
            //              from type in ps.DefaultIfEmpty()

            //              join kind in _context.ProductKind
            //              on component.Kind equals kind.Id
            //              into ks
            //              from kind in ks.DefaultIfEmpty()

            //              where component.Id != id && !product.Contains(component.Id)

            //              select new ReportProduct
            //              {
            //                  Id = component.Id,
            //                  Code = component.Code,
            //                  Name = component.Name,
            //                  Type = component.Type,
            //                  TypeName = type.Name,
            //                  Kind = component.Kind,
            //                  KindName = kind.Name,
            //                  Purchase = component.Purchase
            //              }).ToListAsync();
        }
    }
}
