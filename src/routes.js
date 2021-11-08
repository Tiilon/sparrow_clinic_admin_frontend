import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Login = React.lazy(() => import('./components/app/Login'))
const Logout = React.lazy(() => import('./components/app/Logout'))
const NewStaff = React.lazy(() => import('./components/app/Body/NewStaff'))
const Clinic = React.lazy(() => import('./components/app/Body/Clinic'))
const Branches = React.lazy(() => import('./components/app/Body/Branches'))
const Branch = React.lazy(() => import('./components/app/Body/Branch'))
const Staff = React.lazy(() => import('./components/app/Body/Staff'))
const Patients = React.lazy(() => import('./components/app/Body/Patients'))
const StaffDetails = React.lazy(() => import('./components/app/Body/StaffDetails'))
const PatientDetails = React.lazy(() => import('./components/app/Body/PatientDetails'))
const Schedule = React.lazy(() => import('./components/app/Body/Schedule'))
const FeedBackAttendances = React.lazy(() => import('./components/app/Body/FeedBackAttendances'))
const FeedBackForm = React.lazy(() => import('./components/app/Body/FeedbackForm'))
const Analyses = React.lazy(() => import('./components/app/Body/Analyses'))

const routes = [
  { path: "/staff/:id", name: 'Staff Details', component: StaffDetails },
  { path: "/patient/:id", name: 'Patient Details', component: PatientDetails },
  { path: "/feedback/:id", name: 'Feedback Form', component: FeedBackForm },
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/Analyses', name: 'Analyses', component: Analyses },
  { path: '/branches', name: 'Branches', component: Branches },
  { path: '/fbattendances', name: 'Patient Visits', component: FeedBackAttendances },
  { path: '/branch', name: 'Branch', component: Branch },
  { path: '/schedule', name: 'Schedule', component: Schedule },
  { path: '/staff', exact: true, name: 'Staff', component: Staff },
  { path: '/patients', exact: true, name: 'Patients', component: Patients },
  { path: '/login', name: 'Login Page', component: Login },
  { path: '/logout', name: 'Logout Page', component: Logout },
  { path: '/new-staff', name: 'Add New Staff', component: NewStaff },
  { path: '/clinic', name: 'Clinic', component: Clinic },
  
]

export default routes
