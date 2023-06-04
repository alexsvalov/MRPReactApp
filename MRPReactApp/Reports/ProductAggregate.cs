using MRPReactApp.Models;

namespace MRPReactApp.Reports
{
    public class ProductAggregate: Product
    {
        public int Quantity { get; set; }

        public string? TypeName { get; set; }

        public string? KindName { get; set; }
    }
}
