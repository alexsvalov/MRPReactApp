import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";

import Blank from "./components/pages/Blank";
import Customer from "./components/pages/Customer";
import MarkSteel from "./components/pages/MarkSteel";
import MaterialType from "./components/pages/MaterialType";
import Material from "./components/pages/Material";
import OrderProduct from "./components/pages/OrderProduct";
import OrderComposition from "./components/pages/OrderComposition";
import PlanProduct from "./components/pages/PlanProduct";
import PlanComposition from "./components/pages/PlanComposition";

import Product from "./components/pages/Product";
import Specification from "./components/pages/Specification";
import AddProductToSpecification from "./components/pages/AddProductToSpecification";
import AddProductToOrder from "./components/pages/AddProductToOrder";

import AddOrderToPlan from "./components/pages/AddOrderToPlan";
import AddBlankToDetail from "./components/pages/AddBlankToDetail";
import ReportProduct from "./components/pages/ReportProduct";

import DetailComposition from "./components/pages/DetailComposition";

import ReportDetails from "./components/pages/ReportDetails";

import ReportPurchases from "./components/pages/ReportPurchases";

import ReportBlanks from "./components/pages/ReportBlanks";


const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },

    {
        path: '/detail-composition/:id',
        element: <DetailComposition />
    },




    {
        path: '/blank',
        element: <Blank />
    },


    {
        path: '/customer',
        element: <Customer />
    },
    {
        path: '/mark-steel',
        element: <MarkSteel />
    },
    {
        path: '/material-type',
        element: <MaterialType />
    },
    //{
    //    path: '/material-type/:id',
    //    element: <MaterialType />
    //},
    {
        path: '/material',
        element: <Material />
    },

    {
        path: '/order-product',
        element: <OrderProduct />
    },

    {
        path: '/order-composition/:id',
        element: <OrderComposition />
    },
    {
        path: '/plan-product',
        element: <PlanProduct />
    },

     
{
    path: '/plan-composition/:id',
    element: <PlanComposition />
},

    {
        path: '/product',
        element: <Product />
    },
    {
        path: '/specification/:id',
        element: <Specification />
    },
    {
        path: '/add-product/:id',
        element: <AddProductToSpecification />
    },
    {
        path: '/add-order-product/:id',
        element: <AddProductToOrder />
    },

    {
        path: '/add-plan-order/:id',
        element: <AddOrderToPlan />
    },

    {
        path: '/add-blank-detail/:id',
        element: <AddBlankToDetail />
    },

    {
        path: '/report-product/:id',
        element: <ReportProduct />
    },


    {
        path: '/report-details/:id',
        element: <ReportDetails />
    },



      {
          path: '/report-purchases/:id',
          element: <ReportPurchases />
    },
    {
        path: '/report-blanks/:id',
        element: <ReportBlanks />
    },
];

export default AppRoutes;
