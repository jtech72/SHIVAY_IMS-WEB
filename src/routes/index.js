import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import Root from './Root';
import * as layoutConstants from '../constants/layout';

// All layouts/containers
import DefaultLayout from '../layouts/Default';
import VerticalLayout from '../layouts/Vertical';
import DetachedLayout from '../layouts/Detached';
import HorizontalLayout from '../layouts/Horizontal';
import FullLayout from '../layouts/Full';

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/account/Login'));
const Logout = React.lazy(() => import('../pages/account/Logout'));
const Register = React.lazy(() => import('../pages/account/Register'));
const Confirm = React.lazy(() => import('../pages/account/Confirm'));
const ForgetPassword = React.lazy(() => import('../pages/account/ForgetPassword'));
const LockScreen = React.lazy(() => import('../pages/account/LockScreen'));


const Dashboard = React.lazy(() => import('../pages/shivay/dashboard/Dashboard'));

// SHIVAY pages 
const Inventory = React.lazy(() => import('../pages/shivay/inventory/inventory'))
const Report = React.lazy(() => import('../pages/shivay/report/Report'))
const User = React.lazy(() => import('../pages/shivay/user/User'))
const Warehouse = React.lazy(() => import('../pages/shivay/warehouse/Warehouse'))
const OpeningStock = React.lazy(() => import('../pages/shivay/openingStock/OpeningStock'))
const AddOpeningStock = React.lazy(() => import('../pages/shivay/openingStock/addStock/AddOpeningStock'))
const StockIn = React.lazy(() => import('../pages/shivay/stockIn/StockIn'))
const AddStockIn = React.lazy(() => import('../pages/shivay/stockIn/addStockIn/AddStockIn'))
const Dispatch = React.lazy(() => import('../pages/shivay/dispatch/Dispatch'))
const AddDispatch = React.lazy(() => import('../pages/shivay/dispatch/addDispatch/AddDispatch'))

const Customer = React.lazy(() => import('../pages/shivay/customer/Customer'))
const Supplier = React.lazy(() => import('../pages/shivay/supplier/Supplier'))
const Setting = React.lazy(() => import('../pages/shivay/setting/Setting'))

//BMG pages
// const AuctionLead=React.lazy(()=>import('../pages/bmg/auctionLead/AuctionLead'))
// const Category=React.lazy(()=>import('../pages/bmg/categories/Categories'))
// const Products=React.lazy(()=>import('../pages/bmg/products/Products'))
// const Buyer_Seller=React.lazy(()=>import('../pages/bmg/buyer-seller/Buyer_Seller'))
// const Faq=React.lazy(()=>import('../pages/bmg/faq/Faq'))
// const Orders=React.lazy(()=>import('../pages/bmg/orders/Orders'))
// const Enquiry=React.lazy(()=>import('../pages/bmg/enquiry/Enquiry'))
// const Notification=React.lazy(()=>import('../pages/bmg/notification/Notification'))
// error handlers
const ErrorPageNotFound = React.lazy(() => import('../pages/error/PageNotFound'));
const ErrorPageNotFoundAlt = React.lazy(() => import('../pages/error/PageNotFoundAlt'));
const ServerError = React.lazy(() => import('../pages/error/ServerError'));

const loading = () => <div className=""></div>;

type LoadComponentProps = {
    component: React.LazyExoticComponent<() => JSX.Element>,
};

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
    <Suspense fallback={loading()}>
        <Component />
    </Suspense>
);

const AllRoutes = () => {
    const { layout } = useSelector((state) => ({
        layout: state.Layout,
    }));

    const getLayout = () => {
        let layoutCls = VerticalLayout;

        switch (layout.layoutType) {
            case layoutConstants.LAYOUT_HORIZONTAL:
                layoutCls = HorizontalLayout;
                break;
            case layoutConstants.LAYOUT_DETACHED:
                layoutCls = DetachedLayout;
                break;
            case layoutConstants.LAYOUT_FULL:
                layoutCls = FullLayout;
                break;
            default:
                layoutCls = VerticalLayout;
                break;
        }
        return layoutCls;
    };
    let Layout = getLayout();

    return useRoutes([
        { path: '/', element: <Root /> },
        {
            // public routes
            path: '/',
            element: <DefaultLayout />,
            children: [
                {
                    path: 'account',
                    children: [
                        { path: 'login', element: <LoadComponent component={Login} /> },
                        { path: 'register', element: <LoadComponent component={Register} /> },
                        { path: 'confirm', element: <LoadComponent component={Confirm} /> },
                        { path: 'forget-password', element: <LoadComponent component={ForgetPassword} /> },
                        { path: 'lock-screen', element: <LoadComponent component={LockScreen} /> },
                        { path: 'logout', element: <LoadComponent component={Logout} /> },
                    ],
                },
                {
                    path: 'error-404',
                    element: <LoadComponent component={ErrorPageNotFound} />,
                },
                {
                    path: 'not-found',
                    element: <LoadComponent component={ErrorPageNotFoundAlt} />,
                },
                {
                    path: 'error-500',
                    element: <LoadComponent component={ServerError} />,
                },
            ],
        },
        {
            // auth protected routes
            path: '/',
            element: <PrivateRoute roles={'admin'} component={Layout} />,
            children: [
                {
                    path: 'shivay',
                    children: [
                        {
                            path: 'dashboard',
                            element: <LoadComponent component={Dashboard} />,
                        },
                        {
                            path: 'inventory',
                            element: <LoadComponent component={Inventory} />,
                        },
                        {
                            path: 'report',
                            element: <LoadComponent component={Report} />,
                        },

                        {
                            path: 'user',
                            element: <LoadComponent component={User} />,
                        },
                        {
                            path: 'warehouse',
                            element: <LoadComponent component={Warehouse} />,
                        },
                        {
                            path: 'openingStock',
                            element: <LoadComponent component={OpeningStock} />,
                        },
                        {
                            path: 'addOpeningStock',
                            element: <LoadComponent component={AddOpeningStock} />
                        },
                        {
                            path: 'stockIn',
                            element: <LoadComponent component={StockIn} />,
                        },
                        {
                            path: 'addStockIn',
                            element: <LoadComponent component={AddStockIn} />,
                        },
                        {
                            path: 'dispatch',
                            element: <LoadComponent component={Dispatch} />,
                        },
                        {
                            path: 'addDispatch',
                            element: <LoadComponent component={AddDispatch} />,
                        },
                        {
                            path: 'customer',
                            element: <LoadComponent component={Customer} />,
                        },
                        {
                            path: 'supplier',
                            element: <LoadComponent component={Supplier} />,
                        },
                        {
                            path: 'setting',
                            element: <LoadComponent component={Setting} />,
                        },

                    ],
                },
            ],
        },
    ]);
};

export { AllRoutes };
