import { AppContext } from '@/context/AppContext'
import React, { useContext } from 'react'
<<<<<<< HEAD
import Onboarding from '../Onbording';
=======
import Onboarding from '../onbording';
// import Dashboard from '../dashboard';
>>>>>>> 3721fc36d28be007415ac29e63d192cb00d83f7a

export default function index() {
  const {isAuthenticated} = useContext(AppContext);

  return isAuthenticated ? "" : <Onboarding />;
}
