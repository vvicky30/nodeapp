import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './container/Login';
import NotFound from './components/layouts/NotFound/Error';
import CreateAdmin from './container/Admin/createAdmin/CreateAdmin';
import SendInvite from './container/Admin/invite/SendInvite';
import CompanyData from './container/Admin/manageCompany/Companies';
import UserData from './container/Admin/manageUser/UserList';
import CompanyList from './container/company/CompanyList';
import { ForgotPassword } from './container/Password/ForgotPassword';
import ResetPassword from './container/Password/ResetPassword';
import Signup from './container/SignupPage';
import AccountPage from './container/user/Account';
import PrivateRoutes from './routes/PrivateRoute';
import UpdatePasswordPage from './container/user/UpdatePassword';

function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/page' element={<NotFound />} />
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/forget-password' element={<ResetPassword/> }/>
        <Route exact element={<PrivateRoutes />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/change-password' element={<UpdatePasswordPage />} />
          <Route path='/lists/companies' element={<CompanyList />} />
          <Route path='/admin/send-invite' element={<SendInvite />} />
          <Route path='/admin/create-admin' element={<CreateAdmin />} />
          <Route path='/admin/companies/data' element={<CompanyData />} />
          <Route path='/admin/user/data' element={<UserData />} />
        </Route>  
      </Routes>
    </React.Fragment>
  );
}

export default App;

