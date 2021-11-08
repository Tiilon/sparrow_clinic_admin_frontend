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
    CAlert,
  } from '@coreui/react'


import {
    cilBuilding,cilInfo, cilBan
  } from '@coreui/icons'
import  {authAxios}  from 'src/services/httpServices'
import Datatable from './DataTable'
import Loading from './Loading'


const Branches = (props) => {
    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [branches, setBranches] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        async function getBranches(){
          const {data} = await authAxios.get('management/branches')
          setBranches(data)
          setLoading(false)
        }
        getBranches()
    },[])

    const  deleteBranch = async (id) => {
        await authAxios.post(`management/delete-branch/${id}/`)
        window.location.reload()
    }

    const data = {
        columns: [
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 150  
            },
            {
                label: 'Number of Staff',
                field: 'number_of_staff',
                sort: 'asc',
                width: 150  
            },
            {
                label: 'Action',
                field: 'action',
                sort: 'asc',
                width: 150  
            }
        ],
        rows: branches.map(branch => (
            {
                name: branch.name,
                number_of_staff: branch.staffs,
                action: 
                <React.Fragment>
                <CButton color="info">
                <CIcon icon={cilInfo} />
                </CButton>
                <CButton color="danger" className='m-2' onClick={(e)=>(deleteBranch(branch.id))}>
                <CIcon icon={cilBan} />
                </CButton>
                </React.Fragment>
                
                
                
            }
        ))
    }

    const submit = async (e) => {
        e.preventDefault()
        try{
            const res = await authAxios.post("management/branches/", {
                'name': name
            });
            if(res.data.error){
                setError(res.data.error)
            }else{
                window.location = '/branches';
            }
            
        }catch (ex) {
            if (ex.response && ex.response.status === 400){
                console.log(ex.response.data)
                setError(ex.response.data)
            }
        }
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
                    <h4>All Branches</h4>
                </div>
                
                <div className="p-2 ">
                    <CButton color='primary' onClick={() => setVisible(!visible)}>
                        + <CIcon icon={cilBuilding} title="New Branch" />
                    </CButton>
                    <CModal visible={visible} onDismiss={() => setVisible(false)}>
                    <CModalHeader onDismiss={() => setVisible(false)}>
                        <CModalTitle>New Branch</CModalTitle>
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
                            <CIcon icon={cilBuilding} />
                            </CInputGroupText>
                            <CFormInput placeholder="Name" autoComplete="name" onChange={(e)=>setName(e.target.value)}/>
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
 
export default Branches;