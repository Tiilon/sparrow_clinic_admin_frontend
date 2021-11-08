import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilGroup,
  cilMoney,
  cilHospital,
  cilBuilding,
  cilBarChart,
  cilFolder,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const navList = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavItem,
    name: 'Branches',
    to: '/branches',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />, 
  },
  {
    component: CNavItem,
    name: 'Patients',
    to: '/patients',
    icon: <CIcon icon={cilFolder} customClassName="nav-icon" />, 
  },
  {
    component: CNavItem,
    name: 'Staff',
    to: '/staff',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Clinic',
    to: '/clinic',
    icon: <CIcon icon={cilHospital} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },

  
  // {
  //   component: CNavItem,
  //   name: 'Accounts',
  //   to: '/accounts',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,

  // },
  {
    component: CNavGroup,
    name: 'Marketing',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Make a Report',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'FeedBack Data',
        to: '/fbattendances',
      },
      {
        component: CNavItem,
        name: '+ Add Partner',
        to: '/404',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Schedule',
    to: '/schedule',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavItem,
    name: 'Weekly Analyses Graph',
    to: '/analyses',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
]

export default navList
