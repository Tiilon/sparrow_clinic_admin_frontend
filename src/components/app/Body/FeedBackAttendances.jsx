import React from 'react';

import { Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { authAxios } from 'src/services/httpServices';
import { CButton, CCard, CCardBody, CCol, CFormSelect, CRow } from '@coreui/react';
import Datatable from './DataTable';
import CIcon from '@coreui/icons-react';
import { cilPhone } from '@coreui/icons';


const FeedBackAttendances = ()=> {
  const [attendances,setAttendances] = useState([])
  const [branch, setBranch] = useState('')
  const [branches, setBranches] = useState([])

  useEffect(() => {
    async function getAttendances(){
        const {data} = await authAxios.get('marketing/feedback/')
        const {data:branches} = await authAxios.get('management/branches')
        setAttendances(data)
        setBranches(branches)
    }
    getAttendances();
  }, [])


const data = {
  columns: [
      {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 150  
      },
      {  
          label: 'Contact',
          field: 'contact',
          sort: 'asc',
          width: 150  
      },
      {
          label: 'Branch',
          field: 'branch',
          sort: 'asc',
          width: 150  
      },
      {
          label: 'Date',
          field: 'date',
          sort: 'asc',
          width: 150  
      },
      {
        label: 'Action',
        field: 'feedbackIcon',
        sort: 'asc',
        width: 150  
    },
  ],
  rows: attendances.map(attendant => (
      {
          'name': attendant.name,
          'contact':attendant.contact, 
          'branch': attendant.branch,
          'date': attendant.date, 
          'feedbackIcon':    
              attendant.feedback_status=== false ? <Link to={`feedback/${attendant.feedback}`}>
                  <CButton color="info" >
                      <CIcon icon={cilPhone} /> Take Feedback
                  </CButton>
              </Link> :
              'Feedback has already been taken'
      }
  ))
}

const filterBranch = async (e) => {
    const {data} = await authAxios.post('marketing/feedback/', { branch })
    setAttendances(data)
}

  return (
    
    <React.Fragment>
    <CRow className='justify-content-center'>
      <CCol md={2}>
        <CFormSelect aria-label="Default select example" className="mb-3" onChange={(e)=>setBranch(e.target.value)}>
            <option value='all'>All Branches</option>
            {branches.map(g =>
                <option value={g.code} key={g.id}>{g.name}</option>
            )}
        </CFormSelect>
        
      </CCol>
      <CCol>
          <CButton onClick={filterBranch}>
            Search
          </CButton>
        </CCol>
    </CRow>
    <CCard>
      <CCardBody>
      <Datatable data={data}/>
    </CCardBody> 
    </CCard>
    </React.Fragment>
     
  );
}

export default FeedBackAttendances
