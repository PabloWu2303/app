import React from 'react';
import Header from './components/fragments/Header'
import Navigation from './components/fragments/Navigation'
import MainContent from './components/other/MainContent'
import Footer from './components/fragments/Footer'
import './css/style.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import AddressList from './components/address/AddressList';
import AddressForm from './components/address/AddressForm';
import AddressDetails from './components/address/AddressDetails';

import BuildingSiteList from './components/buildingSite/BuildingSiteList';
import BuildingSitesForm from './components/buildingSite/BuildingSitesForm';
import BuildingSiteDetails from './components/buildingSite/BuildingSiteDetails'

import EmployeeList from './components/employee/EmployeeList';
import EmployeeForm from './components/employee/EmployeeForm';
import EmployeeDetails from './components/employee/EmployeeDetails';

import EmploymentList from './components/employment/EmploymentList';
import EmploymentDetails from './components/employment/EmploymentDetails';
import EmploymentForm from './components/employment/EmploymentForm';

import MaterialsForm from './components/material/MaterialsForm'
import MaterialList from './components/material/MaterialList'
import MaterialDetails from './components/material/MaterialDetails'

import ChooseOrdertype from './components/order/chooseOrderType'

import MaterialOrderList from './components/order/materialOrder/MaterialOrderList';
import MaterialOrderForm from './components/order/materialOrder/MaterialOrderForm';
import MaterialOrderDetails from './components/order/materialOrder/MaterialOrderDetails';

import ServiceOrderList from './components/order/serviceOrder/ServiceOrderList';
import ServiceOrderForm from './components/order/serviceOrder/ServiceOrderForm';
import ServiceOrderDetails from './components/order/serviceOrder/ServiceOrderDetails';

import ServicesForm from './components/service/ServicesForm'
import ServiceList from './components/service/ServiceList'
import ServiceDetails from './components/service/ServiceDetails'

import ToolOrderList from './components/order/toolOrder/ToolOrderList';
import ToolOrderForm from './components/order/toolOrder/ToolOrderForm';
import ToolOrderDetails from './components/order/toolOrder/ToolOrderDetails';

import SubcontractorDetails from './components/subcontractor/SubcontractorDetails'
import SubcontractorList from './components/subcontractor/SubcontractorList'
import SubcontractorForm from './components/subcontractor/SubcontractorForm'

import ToolsForm from './components/tool/ToolsForm'
import ToolList from './components/tool/ToolList'
import ToolDetails from './components/tool/ToolDetails'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Navigation />
        <Switch>
          <Route exact path="/" component={MainContent} />
          <Route exact path="/addresses" component={AddressList} />
          <Route exact path="/addresses/add" component={AddressForm} />
          <Route exact path="/addresses/edit/:addressId" component={AddressForm} />
          <Route exact path="/addresses/details/:addressId" component={AddressDetails} />

          <Route exact path="/buildingSites" component={BuildingSiteList} />
          <Route exact path="/buildingSites/add" component={BuildingSitesForm} />
          <Route exact path="/buildingSites/edit/:buildingSiteId" component={BuildingSitesForm} />
          <Route exact path="/buildingSites/details/:buildingSiteId" component={BuildingSiteDetails} />

          <Route exact path="/employees" component={EmployeeList} />
          <Route exact path="/employees/add" component={EmployeeForm} />
          <Route exact path="/employees/edit/:employeeId" component={EmployeeForm} />
          <Route exact path="/employees/details/:employeeId" component={EmployeeDetails} />

          <Route exact path="/employments" component={EmploymentList} />
          <Route exact path="/employments/edit/:employmentId" component={EmploymentForm} />
          <Route exact path="/employments/details/:employmentId" component={EmploymentDetails} />
          <Route exact path="/employments/add" component={EmploymentForm} />
          <Route exact path="/employments/add/:parameter" component={EmploymentForm} />

          <Route exact path="/materials" component={MaterialList} />
          <Route exact path="/materials/add" component={MaterialsForm} />
          <Route exact path="/materials/edit/:materialId" component={MaterialsForm} />
          <Route exact path="/materials/details/:materialId" component={MaterialDetails} />

          <Route exact path="/orders" component={ChooseOrdertype} />

          <Route exact path="/materialOrders" component={MaterialOrderList} />
          <Route exact path="/materialOrders/add" component={MaterialOrderForm} />
          <Route exact path="/materialOrders/edit/:orderId" component={MaterialOrderForm} />
          <Route exact path="/materialOrders/details/:orderId" component={MaterialOrderDetails} />
          
          <Route exact path="/services" component={ServiceList} />
          <Route exact path="/services/add" component={ServicesForm} />
          <Route exact path="/services/edit/:serviceId" component={ServicesForm} />
          <Route exact path="/services/details/:serviceId" component={ServiceDetails} />

          <Route exact path="/serviceOrders" component={ServiceOrderList} />
          <Route exact path="/serviceOrders/add" component={ServiceOrderForm} />
          <Route exact path="/serviceOrders/edit/:orderId" component={ServiceOrderForm} />
          <Route exact path="/serviceOrders/details/:orderId" component={ServiceOrderDetails} />

          <Route exact path="/toolOrders" component={ToolOrderList} />
          <Route exact path="/toolOrders/add" component={ToolOrderForm} />
          <Route exact path="/toolOrders/edit/:orderId" component={ToolOrderForm} />
          <Route exact path="/toolOrders/details/:orderId" component={ToolOrderDetails} />

          <Route exact path="/subcontractors" component={SubcontractorList} />
          <Route exact path="/subcontractors/add" component={SubcontractorForm} />
          <Route exact path="/subcontractors/edit/:subcontractorId" component={SubcontractorForm} />
          <Route exact path="/subcontractors/details/:subcontractorId" component={SubcontractorDetails} />

          <Route exact path="/tools" component={ToolList} />
          <Route exact path="/tools/add" component={ToolsForm} />
          <Route exact path="/tools/edit/:toolId" component={ToolsForm} />
          <Route exact path="/tools/details/:toolId" component={ToolDetails} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;