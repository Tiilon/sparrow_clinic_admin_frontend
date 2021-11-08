import React, {useState, useEffect} from 'react'
import {authAxios} from '../../../services/httpServices'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
  CCardHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilUserX, cilPhone } from '@coreui/icons'


const Register = (props) => {
    const roles = [
        {id:1, post:'ADMIN'},
        {id:2, post:'CEO'},
        {id:3, post:'NURSE'},
        {id:4, post:'DOCTOR'},
        {id:5, post:'HR'},
        {id:6, post:'MARKETING'},
    ]
    const genders = [
        {id:1, name:'MALE'},
        {id:2, name:'FEMALE'},
    ]
    const [first_name, setFirstName]=useState('')
    const [last_name, setLastName]=useState('')
    const [username, setUsername]=useState('')
    const [email, setEmail]=useState('')
    const [contact, setContact]=useState('')
    const [gender, setGender]=useState('')
    const [staff_id, setStaff_id]=useState('')
    const [role, setRole]=useState('')
    const [password, setPassword]=useState('')
    const [profile, setProfile]=useState('')
    const [branch, setBranch]=useState('')
    const [branches, setBranches] = useState([])

    useEffect(() => {
        async function getBranches(){
          const {data} = await authAxios.get('management/branches')
          setBranches(data) 
          console.log(data) 
        }
        console.log(getBranches())
    },[])

    const  getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;
            console.log(baseURL);
            resolve(baseURL);
          };
          console.log(fileInfo);
        });
      };

    const  handleFileInputChange = e => {
            let file
        
            file = e.target.files[0];
        
            getBase64(file)
            .then(result => {
                setProfile(result)
            })
            .catch(err => {
                console.log(err);
            });
    }
    
        const submit= async (e) =>{
            e.preventDefault();
                try {
                    await authAxios.post("management/user/", {
                    "first_name":first_name,
                    "last_name":last_name,
                    "username":username,
                    "email":email,
                    "contact":contact,
                    "gender":gender,
                    "staff_id":staff_id,
                    "branch":branch,
                    "role":role,
                    "profile":profile,
                    "password":password,
                    })
                    window.location = `/staff`;    
                } catch (ex) {
                    if (ex.response && ex.response.status === 400){
                        console.log(ex.response.data)
                        setError(ex.response.data)
                    }
                }
            }


  return (
    <div className="bg-light d-flex flex-row align-items-center">
      <CContainer fluid>
        <CRow className="justify-content-center">
          <CCol md={9} lg={12} xl={12}>
            <CCard className="mx-4">
              <CCardHeader><h4>Add New Staff</h4></CCardHeader>
              <CCardBody className="p-3">
                <CForm onSubmit={submit}> 
                  <CRow className="justify-content-center">
                  <CCol md={9} lg={7} xl={6} className="d-none d-md-block">
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="First Name" autoComplete="first_name" onChange={(e)=>setFirstName(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Last Name" autoComplete="last_name" onChange={(e)=>setLastName(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" onChange={(e)=>setUsername(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" onChange={(e)=>setEmail(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                       <CIcon icon={cilPhone} /> 
                    </CInputGroupText>
                    <CFormInput placeholder="Contact" autoComplete="contact" onChange={(e)=>setContact(e.target.value)}/>
                  </CInputGroup>
                  <CFormSelect aria-label="Default select example" className="mb-3" onChange={(e)=>setGender(e.target.value)}>
                    <option>Select Gender</option>
                    {genders.map(g =>
                        <option value={g.name} key={g.id}>{g.name}</option>
                    )}
                  </CFormSelect>
                  <div className="mb-1 justify-content-center">
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUserX}/>
                      </CInputGroupText>
                      <CFormInput placeholder="Profile" autoComplete="profile" type="file" onChange={handleFileInputChange}/>
                    </CInputGroup>
                  </div>
                  
                  <CFormSelect aria-label="Default select example" className="mb-3" onChange={(e)=>setRole(e.target.value)}>
                    <option>Select Role To Occupy</option>
                    {roles.map(r =>
                        <option value={r.post} key={r.id}>{r.post}</option>
                    )}
                  </CFormSelect>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                    <CInputGroup className="mt-3">
                        <CInputGroupText>@</CInputGroupText>
                        <CFormInput placeholder="Staff ID" autoComplete="staff_id" onChange={(e)=>setStaff_id(e.target.value)}/>
                    </CInputGroup>
                  </CInputGroup>
                  <CFormSelect aria-label="Default select example" className="mb-3" onChange={(e)=>setBranch(e.target.value)}>
                    <option>Assign Branch</option>
                    {branches.map(g =>
                        <option value={g.code} key={g.id}>{g.name}</option>
                    )}
                  </CFormSelect>
                  </CCol>
                  <CCol md={9} lg={7} xl={6} className="d-none d-md-block">
                    {profile ? 
                    <CCard>
                      <CCardBody className="p-1">
                        <img src={profile} height={550} width={730}/>
                      </CCardBody>
                    </CCard> : 
                    <CCard>
                    <CCardBody className="p-1">
                      <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' height={550} width={730}/>
                    </CCardBody>
                  </CCard>}
                  </CCol>
                  </CRow>
                  <div className="d-grid">
                    <CButton color="success" onClick={submit}>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
