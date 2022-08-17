import { Routes, Route } from 'react-router-dom';
import Branch from './components/Branch';
import Login from './components/Login/Login';
import Home from './pages/Home';
import PrivateRoutes from './routes/PrivateRoutes';
import BranchForm from './pages/BranchForm';
import AdminForm from './pages/AdminForm';
import * as RoutePaths from './constants/RoutePaths';
import Products from './pages/Products';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import BranchProductForm from './pages/BranchProductForm';
import BranchProducts from './pages/BranchProducts';
import OrderForm from './pages/OrderForm';
import IndividualOrder from './pages/IndividualOrder';
import OrderCheckout from './pages/OrderCheckout';
import IncomingOrdersList from './pages/IncomingOrdersList';
import HeaderFooter from './layout/HeaderFooter';
import Dashboard from './pages/Dashboard';
function App() {
  const { userInfo } = useContext(AuthContext);
  return (
    <>
      <HeaderFooter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path={RoutePaths.BRANCH + RoutePaths.BRANCH_ID} element={<Branch />} />
            <Route path="/branch/create" element={<BranchForm />} />
            <Route
              path={RoutePaths.BRANCH + RoutePaths.BRANCH_ID + RoutePaths.ADMIN + RoutePaths.CREATE}
              element={<AdminForm type="admin" />}
            />
            <Route
              path={RoutePaths.BRANCH + RoutePaths.BRANCH_ID + RoutePaths.EMPLOYEE + RoutePaths.CREATE}
              element={<AdminForm type="employee" />}
            />
            <Route path={RoutePaths.PRODUCTS} element={<Products />} />
            <Route
              path={
                RoutePaths.BRANCH +
                RoutePaths.BRANCH_ID +
                RoutePaths.PRODUCTS +
                RoutePaths.PRODUCT_ID +
                RoutePaths.CREATE
              }
              element={<BranchProductForm type="create" />}
            />
            <Route
              path={
                RoutePaths.BRANCH +
                RoutePaths.BRANCH_ID +
                RoutePaths.PRODUCTS +
                RoutePaths.PRODUCT_ID +
                RoutePaths.UPDATE
              }
              element={<BranchProductForm type="update" />}
            />
            <Route
              path={RoutePaths.BRANCH + RoutePaths.BRANCH_ID + RoutePaths.BRANCH_PRODUCTS}
              element={<BranchProducts />}
            />
            <Route
              path={RoutePaths.BRANCH + RoutePaths.BRANCH_ID + RoutePaths.ORDER + RoutePaths.CREATE}
              element={<OrderForm />}
            />
            <Route
              path={RoutePaths.BRANCH + RoutePaths.BRANCH_ID + RoutePaths.ORDER + RoutePaths.ORDER_ID}
              element={<IndividualOrder />}
            />
            <Route
              path={RoutePaths.BRANCH + RoutePaths.BRANCH_ID + RoutePaths.ORDER + RoutePaths.CHECKOUT}
              element={<OrderCheckout />}
            />
            <Route
              path={RoutePaths.BRANCH + RoutePaths.BRANCH_ID + RoutePaths.ORDER + RoutePaths.INCOMING}
              element={<IncomingOrdersList />}
            />
            <Route path={RoutePaths.DASHBOARD} element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </HeaderFooter>
    </>
  );
}

export default App;
