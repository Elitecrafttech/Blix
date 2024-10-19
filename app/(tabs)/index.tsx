import { AppContext } from '@/context/AppContext'
import React, { useContext } from 'react'
<<<<<<< HEAD
import Onboarding  from '../Onbording';
=======
// import Onboarding from '../onbording';
import Dashboard from '../dashboard';
import Register from '../Register';
import Signin from '../Signin';
>>>>>>> 860343120c12fc0cfeff72681a48f13da7f292d7

export default function index() {
  const {isAuthenticated} = useContext(AppContext);

<<<<<<< HEAD

  return isAuthenticated ? "" : <Onboarding />;
=======
  return isAuthenticated ? "" : <Signin />;
>>>>>>> 860343120c12fc0cfeff72681a48f13da7f292d7
}
