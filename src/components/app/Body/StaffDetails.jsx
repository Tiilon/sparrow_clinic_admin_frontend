import React, {useState, useEffect} from 'react'
import  {authAxios}  from 'src/services/httpServices'
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
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBuilding,cilInfo, cilBan, cilUser, cilPhone, cilUserX, cilLockLocked, cilPen
} from '@coreui/icons'


const StaffDetails = (props) => {

  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(false)
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
  const [error, setError] = useState({})

  const genders = [
    {id:1, name:'MALE'},
    {id:2, name:'FEMALE'},
]

const roles = [
  {id:1, post:'ADMIN'},
  {id:2, post:'CEO'},
  {id:3, post:'NURSE'},
  {id:4, post:'DOCTOR'},
  {id:5, post:'HR'},
  {id:6, post:'MARKETING'},
]


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

  const staffId = props.match.params.id;
        if (staffId === 'new') return;

  useEffect(() => {
    setLoading(true);
    async function getStaffDetails() {
      try {
        const {data} = await authAxios.get(`management/user/${staffId}`)
        const {data:branches} = await authAxios.get('management/branches')
        setDetails(data)
        setBranches(branches)
        setLoading(false);
      } catch (ex) {
        return ex;
      }
    }
    getStaffDetails()
},[])

const submit= async (e) =>{
  e.preventDefault();
  console.log('yes')
      try {
          await authAxios.put(`management/user/${staffId}/`, {
          "first_name":first_name ? first_name : details.first_name,
          "last_name":last_name ? last_name : details.last_name,
          "email":email ? email : details.email,
          "contact":contact ? contact : details.contact,
          "gender":gender ? gender : details.gender,
          "staff_id":staff_id ? staff_id : details.staff_id,
          "branch":branch ? branch : details.branch,
          "role":role ? role : details.role,
          "profile":profile ? profile : details.profile,
          })
          window.location = `/staff`;
      } catch (ex) {
          // if (ex.response && ex.response.status === 400){
          //     console.log(ex.response.data)
          //     setError(ex.response.data)
          // }
          console.log(ex)
      }
  }

  const deleteUser= async (e) =>{
    e.preventDefault();
        try {
            await authAxios.delete(`management/user/${staffId}/`)
            window.location = `/staff`;
        } catch (ex) {
            if (ex.response && ex.response.status === 400){
                console.log(ex.response.data)
                setError(ex.response.data)
            }
        }
    }
    return (
        <>
          <CRow >
          
            <CCard className="mx-4">
              <CCardBody className="p-4">
              <CForm onSubmit={submit}>
              <CRow>
                <CCol md={9} lg={7} xl={6}>
                <h1>Edit Staff</h1>
              
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    First Name
                    {/* <CIcon icon={cilUser} /> */}
                  </CInputGroupText>
                  <CFormInput placeholder={details.first_name} defaultValue={details.first_name} autoComplete="first_name" onChange={(e)=>setFirstName(e.target.value)}/>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    Last Name
                    {/* <CIcon icon={cilUser} /> */}
                  </CInputGroupText>
                  <CFormInput placeholder={details.last_name} defaultValue={details.last_name} autoComplete="last_name" onChange={(e)=>setLastName(e.target.value)}/>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>Email</CInputGroupText>
                  <CFormInput placeholder={details.email} autoComplete="email" defaultValue={details.email} onChange={(e)=>setEmail(e.target.value)}/>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    Contact
                    {/* <CIcon icon={cilPhone} />  */}
                  </CInputGroupText>
                  <CFormInput placeholder={details.contact} defaultValue={details.contact} autoComplete="contact" onChange={(e)=>setContact(e.target.value)}/>
                </CInputGroup>
                <CFormSelect aria-label="Default select example" defaultValue={details.gender} className="mb-3" onChange={(e)=>setGender(e.target.value)}>
                <option>{details.gender ? details.gender : 'Assign a gender'}</option>
                  {genders.map(g =>
                      <option value={g.name} key={g.id}>{g.name}</option>
                  )}
                </CFormSelect>
                <CFormSelect aria-label="Default select example" defaultValue={details.role} className="mb-3" onChange={(e)=>setRole(e.target.value)}>
                <option>{details.role ? details.role : 'Assign a role'}</option>
                {roles.map(r =>
                    <option value={r.post} key={r.id}>{r.post}</option>
                )}
              </CFormSelect>
              <CInputGroup className="mb-3">
                <CInputGroup className="mt-3">
                    <CInputGroupText>Staff ID</CInputGroupText>
                    <CFormInput placeholder={details.staff_id} defaultValue={details.staff_id} autoComplete="staff_id" onChange={(e)=>setStaff_id(e.target.value)}/>
                </CInputGroup>
              </CInputGroup>
              <CFormSelect aria-label="Default select example" defaultValue='' className="mb-3" onChange={(e)=>setBranch(e.target.value)}>
              <option>{details.branch ? details.branch : 'Assign a branch'}</option>
                {branches.map(g =>
                    <option value={g.code} key={g.id}>{g.name}</option>
                )}
              </CFormSelect>
                </CCol>
                <CCol md={9} lg={7} xl={6} className='mt-5'>
              <CCard >
                <CCardBody className='pl-5'>
                  <img src={details.profile ? details.profile : '/avatars/index.png'} height='200px' width='200px'/>
                </CCardBody>
              </CCard>
              Change Picture
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUserX}/>
                </CInputGroupText>
                <CFormInput placeholder="Profile" autoComplete="profile" type="file" onChange={handleFileInputChange}/>
              </CInputGroup>
              
              
              </CCol> 
              </CRow>
            <div className="d-grid">
              <CButton color="success" onClick={submit}>Update Account</CButton>
            </div>
            <div className="d-grid mt-3">
              <CButton color="danger" onClick={deleteUser}>Delete Account</CButton>
            </div>
          </CForm>
        
              </CCardBody>
            </CCard>
          
          
        </CRow>
     
        </>
        
     );
}
 
export default StaffDetails;