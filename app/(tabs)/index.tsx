import { AppContext } from '@/context/AppContext'
import React, { useContext } from 'react'
import Onboarding  from '../Onbording';
import Dashboard from '../dashboard';

export default function index() {
  const {isAuthenticated} = useContext(AppContext);
  return isAuthenticated ? <Dashboard/> : <Onboarding />;
}
