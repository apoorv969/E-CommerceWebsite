import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import './App.css';
import { selectLoggedInUser } from "./features/auth/authSlice";
import Logout from "./features/auth/components/Logout";
import Protected from "./features/auth/components/Protected";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import PageNotFound from "./pages/404";
import AdminHome from "./pages/AdminHome";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignupPage from './pages/SignupPage';
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home></Home>
    </Protected>,
  },
  {
    path: "/admin",
    element: <Protected>
      <AdminHome></AdminHome>
    </Protected>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: <Protected>
       <CartPage></CartPage>
    </Protected>,
  },
  {
    path: "/checkout",
    element: <Protected>
       <Checkout></Checkout>
    </Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected>
      <ProductDetailPage></ProductDetailPage>
    </Protected>,
  },
  {
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin>
      <AdminProductDetailPage></AdminProductDetailPage>
    </ProtectedAdmin>,
  },
  {
    path: "/admin/product-form",
    element: <Protected>
      <AdminProductFormPage></AdminProductFormPage>
    </Protected>,
  },
  {
    path: "/admin/orders",
    element: <Protected>
      <AdminOrdersPage></AdminOrdersPage>
    </Protected>,
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <Protected>
      <AdminProductFormPage></AdminProductFormPage>
    </Protected>,
  },
  {
    path: "/order-success/:id",
    element: 
      <OrderSuccessPage></OrderSuccessPage>
    
  },
  {
    path: "/orders",
    element: 
      <UserOrdersPage></UserOrdersPage>
    
  },
  {
    path: "/profile",
    element: 
      <UserProfilePage></UserProfilePage>
    
  },
  {
    path: "/logout",
    element: 
      <Logout></Logout>
    
  },
  {
    path: "/forgot-password",
    element: 
      <ForgotPasswordPage></ForgotPasswordPage>
    
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>
  },
  
]);

function App() {
 const dispatch = useDispatch();
 const user = useSelector(selectLoggedInUser)
  useEffect(()=>{
    if(user){
    dispatch(fetchItemsByUserIdAsync(user.id))
    dispatch(fetchLoggedInUserAsync(user.id))
    }
  },[dispatch,user])
  return (
    <div className="App">
       <RouterProvider router={router} />
      {/* <SignupPage></SignupPage> */}
    </div>
  );
}

export default App;
