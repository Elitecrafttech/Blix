import { AppContext } from '@/context/AppContext'
import React, { useContext } from 'react'
import Onboarding from '../onbording';
import Dashboard from '../dashboard';
import Register from '../Register';

export default function index() {
  const {isAuthenticated} = useContext(AppContext);

  return isAuthenticated ? "" : <Register />;
}
