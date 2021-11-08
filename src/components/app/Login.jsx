import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import {authAxios} from '../../services/httpServices'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit= async (e) =>{
    e.preventDefault();
    // console.log('success')
        try {
            const {data} = await authAxios.post("token/", {"email":email,"password":password})
            localStorage.setItem("access_token", data.access)
            localStorage.setItem("refresh_token", data.refresh)
            authAxios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem("access_token")
            window.location = `/`;
            
        } catch (ex) {
            if (ex.response && ex.response.status === 400){
                console.log(ex.response.data)
                setError(ex.response.data)
            }
        }
    }
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        
            <CContainer>
                <CRow className="justify-content-center">
                <CCol md={8}>
                    <CCardGroup>
                    <CCard className="p-4">
                        <CCardBody>
                        {/* <form action="" > */}
                        <CForm onSubmit={submit}>
                            <h1>Login</h1>
                            <p className="text-medium-emphasis">Sign In to your account</p>
                            <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput 
                                placeholder="Email"
                                autoComplete="email"
                                type="email"
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                            </CInputGroup>
                            <CInputGroup className="mb-4">
                            <CInputGroupText>
                                <CIcon icon={cilLockLocked} />
                            </CInputGroupText>
                            <CFormInput
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                            </CInputGroup>
                            <CRow>
                            <CCol xs={6}>
                                <CButton color="primary" className="px-4" onClick={submit}>
                                Login
                                </CButton>
                            </CCol>
                            </CRow>
                        </CForm>
                        </CCardBody>
                    </CCard>
                    </CCardGroup>
                </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}
export default Login
