import { AppContext } from '@/context/AppContext'
import React, { useContext } from 'react'
import Onboarding  from '../Onbording';
// import Electricity from '../Electricity';
// import Cabletv from '../Cabletv';
// import Databundle from '../Databundle';
// import Airtime from '../Airtime';
// import Airtimecheckout from '../Airtimecheckout';
// import Datacheckout from '../Datacheckout';
// import Cablecheckout from '../Cablecheckout';
// import Electricitycheckout from '../Electricitycheckout';
// import Airtimestatus from '../Airtimestatus';
// import Datastatus from '../Datastatus';
// import Cablestatus from '../Cablestatus';
// import Fillform from '../Fillform';
// import Dashboard from '../dashboard';
export default function index() {
  const {isAuthenticated} = useContext(AppContext);


  return isAuthenticated ? "" : <Onboarding />;
  // return isAuthenticated ? "" : <Electricity />;
  // return isAuthenticated ? "" : <Cabletv />;
  // return isAuthenticated ? "" : <Databundle />;
  // return isAuthenticated ? "" : <Airtime />;
  // return isAuthenticated ? "" : <Airtimecheckout />;
  // return isAuthenticated ? "" : <Datacheckout />;
  // return isAuthenticated ? "" : <Cablecheckout />;
  // return isAuthenticated ? "" : <Electricitycheckout />;
  // return isAuthenticated ? "" : <Airtimestatus />;
  // return isAuthenticated ? "" : <Datastatus />;
  // return isAuthenticated ? "" : <Cablestatus />;
  // return isAuthenticated ? "" : <Fillform />;
  // return isAuthenticated ? "" : <Dashboard />;
}
