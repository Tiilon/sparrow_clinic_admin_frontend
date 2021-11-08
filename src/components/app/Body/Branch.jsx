import React from 'react'
import CIcon from '@coreui/icons-react'
import {useState, useEffect} from 'react'

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CModal,
    CModalHeader,
    CModalFooter,
    CModalTitle,
    CModalBody,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CFormSelect,
    CAlert,
  } from '@coreui/react'


import {
    cilInfo, cilBan, cilUser, cilPhone, cilCalendar
  } from '@coreui/icons'
import  {authAxios}  from 'src/services/httpServices'
import Datatable from './DataTable'
import Loading from './Loading'

const Branch = (props) => {
    const [visible, setVisible] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [contact, setContact] = useState('')
    const [gender, setGender] = useState('')
    const [maritalStatus, setMaritalStatus] = useState('')
    const [dob, setDob] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [patients, setPatients] = useState([])
    const genders = [
        {id:1, name:'MALE'},
        {id:2, name:'FEMALE'},
    ]
    const status = [
        {id:1, name:'SINGLE'},
        {id:2, name:'MARRIED'},
    ]

    useEffect(() => {
        setLoading(true);
        async function getAllPatients(){
            const {data} = await authAxios.get('hospital/patients/')
            setPatients(data);
            setLoading(false);
        }
        getAllPatients();
    }, [])

    const submit = async (e) => {
        e.preventDefault()
        try{
            const res = await authAxios.post("hospital/patients/", {
                'first_name': firstName,
                'last_name': lastName,
                'contact': contact,
                'gender': gender,
                'marital_status':maritalStatus,
                'dob': dob,
            });
            if(res.data.error){
                setError(res.data.error)
            }else{
                window.location = '/patients';
            }
            
        }catch (ex) {
            if (ex.response && ex.response.status === 400){
                console.log(ex.response.data)
                setError(ex.response.data)
            }
        }
    }
    const data = {
        columns: [
            {
                label: 'First Name',
                field: 'first_name',
                sort: 'asc',
                width: 150  
            },
            {
                label: 'Last Name',
                field: 'last_name',
                sort: 'asc',
                width: 150  
            },
            {
                label: 'Gender',
                field: 'gender',
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
                label: 'Date Of Birth',
                field: 'dob',
                sort: 'asc',
                width: 150  
            },
            {
                label: 'Details',
                field: 'details',
                sort: 'asc',
                width: 150  
            },
        ],
        rows: patients.map(patient => (
            {
                first_name: patient.first_name,
                last_name: patient.last_name,
                gender: patient.gender,
                contact: patient.contact,
                dob: patient.date_of_birth,
                details: 
                <React.Fragment>
                <CButton color="info">
                <CIcon icon={cilInfo} />
                </CButton>
                </React.Fragment>
                
                
                
            }
        ))
    }
    {if(loading) return (
        <div className="justify-content-center">
            <Loading loading={loading} color='primary'/>
        </div>
    
    )}
    return ( 
        <div className="div">
            <CCard>
            
            <CCardHeader>
            <div className="d-flex ">
                <div className="p-2 flex-grow-1 ">
                    <h4>All Patients</h4>
                </div>
                
                <div className="p-2 ">
                    <CButton color='primary' onClick={() => setVisible(!visible)}>
                        + <CIcon icon={cilUser} title="New Branch" />
                    </CButton>
                    <CModal visible={visible} onDismiss={() => setVisible(false)}>
                    <CModalHeader onDismiss={() => setVisible(false)}>
                        <CModalTitle>New Patient</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm onSubmit={submit}>{error && 
                            <div className="">
                                <CAlert color='danger'>
                                {error}
                                </CAlert>
                            </div>}
                            
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                            {/* <CIcon icon={cilBuilding} /> */}
                            </CInputGroupText>
                            <CFormInput placeholder="First Name" autoComplete="first_name" onChange={(e)=>setFirstName(e.target.value)}/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                            {/* <CIcon icon={cilBuilding} /> */}
                            </CInputGroupText>
                            <CFormInput placeholder="Last Name" autoComplete="last_name" onChange={(e)=>setLastName(e.target.value)}/>
                        </CInputGroup>
                        <CFormSelect aria-label="Default select example" className="mb-3" onChange={(e)=>setGender(e.target.value)}>
                            <option>Select Gender</option>
                            {genders.map(g =>
                                <option value={g.name} key={g.id}>{g.name}</option>
                            )}
                        </CFormSelect>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                            <CIcon icon={cilPhone} /> 
                            </CInputGroupText>
                            <CFormInput placeholder="Contact" autoComplete="contact" type='number' onChange={(e)=>setContact(e.target.value)}/>
                        </CInputGroup>
                        <CFormSelect aria-label="Default select example" className="mb-3" onChange={(e)=>setMaritalStatus(e.target.value)}>
                            <option>Select Marital Staus</option>
                            {status.map(g =>
                                <option value={g.name} key={g.id}>{g.name}</option>
                            )}
                        </CFormSelect>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                            <CIcon icon={cilCalendar} /> 
                            </CInputGroupText>
                            <CFormInput placeholder="Date Of Birth" autoComplete="dob" type='date' onChange={(e)=>setDob(e.target.value)}/>
                        </CInputGroup>
                        </CForm>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                        </CButton>
                        <CButton color="success" onClick={submit}>Add</CButton>
                    </CModalFooter>
                    </CModal> 
                </div>
            </div>
                
            </CCardHeader>
            <CCardBody>
                <Datatable data={data}/>
            </CCardBody>
        </CCard>
        </div>  
     );
}
 
export default Branch;