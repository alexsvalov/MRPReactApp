const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:17423';

const context = [
    "/weatherforecast",

    "/api/DetailCompositions",

    "/api/DetailCompositionsFilter",

    "/api/Blanks",

    "/api/Customers",
    "/api/MarkSteels",
    "/api/Materials",
    "/api/MaterialTypes",
    "/api/OrderCompositionsFilter",

    "/api/OrderCompositions",
    "/api/OrderProducts",
    "/api/PlanCompositions",
    "/api/PlanCompositionsFilter",
    "/api/PlanProducts",
    "/api/ProductKinds",
    "/api/Products",
    "/api/ProductTypes",
    "/api/SpecificationMaterials",
    "/api/Specifications",
    "/api/SpecificationsFilter",
    "/api/AddProductToSpecification",
    "/api/AddProductToOrder",
    "/api/AddOrderToPlan",
    "/api/AddBlankToDetail",

    "/api/ReportDetailsInPlan",

    "/api/ReportPurchaseInPlan",
 

    "/api/ReportBlanksInPlan",




    "/api/ReportViewMaterial",
    "/api/ReportViewProduct",
    "/api/ReportViewSpecification",

    "/api/ReportViewOrderComposition",

    "/api/ReportProductsInPlan"
   
];

const onError = (err, req, resp, target) => {
    console.error(`${err.message}`);
}

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: target,
        // Handle errors to prevent the proxy middleware from crashing when
        // the ASP NET Core webserver is unavailable
        onError: onError,
        secure: false,
        // Uncomment this line to add support for proxying websockets
        //ws: true, 
        headers: {
            Connection: 'Keep-Alive'
        }
    });

    app.use(appProxy);
};
