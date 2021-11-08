import React from 'react'
import CIcon from '@coreui/icons-react'
import { Redirect } from 'react-router-dom'
import {useState, useEffect} from 'react'

import {
    CCard,
    CCardBody,
    CCardHeader,
  } from '@coreui/react'
import  {authAxios}  from 'src/services/httpServices'
import Datatable from './DataTable'
import Loading from './Loading'

const Patients = (props) => {
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
                label: 'ID',
                field: 'pat_id',
                sort: 'asc',
                width: 150  
            },
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
                label: 'Marital Status',
                field: 'marital_status',
                sort: 'asc',
                width: 150  
            },
        ],
        rows: patients.map(patient => (
            {
                pat_id: patient.patient_id,
                first_name: patient.first_name,
                last_name: patient.last_name,
                gender: patient.gender,
                contact: patient.contact,
                dob: patient.date_of_birth,
                marital_status: patient.marital_status,  
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
            </div>
                
            </CCardHeader>
            <CCardBody>
                <Datatable data={data}/>
            </CCardBody>
        </CCard>
        </div>  
     );
}
 
export default Patients;