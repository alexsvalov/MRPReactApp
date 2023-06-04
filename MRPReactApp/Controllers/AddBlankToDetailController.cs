using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MRPReactApp.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MRPReactApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddBlankToDetailController : ControllerBase
    {


        private readonly dbMRPprodContext _context;

        public AddBlankToDetailController(dbMRPprodContext context)
        {
            _context = context;
        }

        // GET api/<AddBlankToDetailController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Blank>>> GetBlankToDetail(int id)
        {
            if (_context.Material == null)
            {
                return NotFound();
            }
            var blank = (from item in _context.DetailComposition
                         where item.Product == id
                         select item.Blank).ToList();

            return await _context.Blank
                .Where(x => !blank.Contains(x.Id))
                .Include(p => p.MaterialNavigation)
                    .ThenInclude(x => x.MarkNavigation)
                .Include(p => p.MaterialNavigation)
                    .ThenInclude(x => x.TypeNavigation)
                .ToListAsync();
        }

    }
}
