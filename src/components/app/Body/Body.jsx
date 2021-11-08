import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer } from '@coreui/react'
import NewStaff from './NewStaff';
import Clinic from './Clinic'
// routes config
import Dashboard from 'src/views/dashboard/Dashboard';
import Branches from './Branches';
import Branch from './Branch';
import Patients from './Patients';
import StaffDetails from './StaffDetails';
import Staff from './Staff';
import Schedule from './Schedule';
import Loading from './Loading';
import PatientDetails from './PatientDetails';
import FeedBackAttendances from './FeedBackAttendances';
import FeedBackForm from './FeedbackForm';
import Analyses from './Analyses';


const AppContent = () => {
  return (
    <CContainer fluid={true}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/fbattendances/" component={FeedBackAttendances} />
          <Route path="/patient/:id" component={PatientDetails} />
          <Route path="/analyses" component={Analyses} />
          <Route path="/feedback/:id" component={FeedBackForm} />
          <Route path="/staff/:id" component={StaffDetails} />
          <Route path="/new-staff" component={NewStaff}/>
          <Route path="/clinic" component={Clinic}/>
          <Route path="/branches" component={Branches}/>
          <Route path="/branch"  component={Branch}/>
          <Route path="/patients" exact={true} component={Patients}/>
          <Route path="/staff" component={Staff}/>
          <Route path="/schedule" component={Schedule}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Redirect from='/'  to='/dashboard'/>
        </Switch>
      </Suspense>
    </CContainer>
  )
}
export default React.memo(AppContent)
