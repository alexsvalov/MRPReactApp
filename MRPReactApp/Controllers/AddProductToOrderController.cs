using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MRPReactApp.Models;
using MRPReactApp.Reports;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MRPReactApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddProductToOrderController : ControllerBase
    {

        private readonly dbMRPprodContext _context;

        public AddProductToOrderController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET api/<AddProductToOrderController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductToOrder(int id)
        {
            if (_context.Product == null)
            {
                return NotFound();
            }
            var orderProduct = (from item in _context.OrderComposition
                           where item.OrderProduct == id
                           select item.Product).ToList();

            return await _context.Product
                .Where(x => !orderProduct.Contains(x.Id))
                .Include(x => x.TypeNavigation)
                .Include(x => x.KindNavigation)
                .ToListAsync();

            //return await (from product in _context.Product
            //              join type in _context.ProductType
            //              on product.Type equals type.Id
            //              into ps
            //              from type in ps.DefaultIfEmpty()

            //              join kind in _context.ProductKind
            //              on product.Kind equals kind.Id
            //              into ks
            //              from kind in ks.DefaultIfEmpty()

            //              where !orderProduct.Contains(product.Id)

            //              select new ReportProduct
            //              {
            //                  Id = product.Id,
            //                  Code = product.Code,
            //                  Name = product.Name,
            //                  Type = product.Type,
            //                  TypeName = type.Name,
            //                  Kind = product.Kind,
            //                  KindName = kind.Name,
            //                  Purchase = product.Purchase
            //              }).ToListAsync();
        }
    }
}
