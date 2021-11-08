import React from 'react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CAvatar,
  } from '@coreui/react'


import {
    cilPen
  } from '@coreui/icons'
import  {authAxios}  from 'src/services/httpServices'
import Datatable from './DataTable'
import Loading from './Loading'

const Staff = (props) => {
    const [visible, setVisible] = useState(false)
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
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true);
        async function getData(){
          const {data} = await authAxios.get('management/branches')
          const {data:users} = await authAxios.get('management/user/')
          setUsers(users)
          setBranches(data)
          setLoading(false);
        }
        
        getData()
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

      const decodeFileBase64 = (baseString) => {
        return decodeURIComponent(
            atob(baseString)
            .split("")
            .map(function (c){
                return "%" + ("00"+ c.charCodeAt(0).toString(16).slice(-2))
            })
            .join("")
            );
        };

        const decodeBase64 = (base) =>{
            return base.substring(base.indexOf(",")+1)
        }
      
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
                // window.location = `/staff`;    
            } catch (ex) {
                // if (ex.response && ex.response.status === 400){
                //     console.log(ex.response.data)
                //     setError(ex.response.data)
                // }
                console.log(ex)
            }
        }
    const data = {
        columns: [
            {
                label: '',
                field: 'profile',
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
                label: 'Role',
                field: 'role',
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
                label: 'Email',
                field: 'email',
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
                label: 'Date Joined',
                field: 'date_joined',
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
        rows: users.map(use => (
            {
                profile: <CAvatar size="md" src={use.profile ? use.profile : '/avatars/index.png'} status="success" />,
                first_name: use.first_name,
                last_name: use.last_name,
                gender: use.gender,
                role: use.role,
                contact: use.contact,
                email: use.email,
                branch: use.branch_code===null ? 'N/A' : use.branch,
                date_joined: use.date_joined,
                details: 
                <React.Fragment>
                <Link to={`/staff/${use.staff_id}`}>
                  <CButton color="primary">
                  <CIcon icon={cilPen} />
                  </CButton>
                </Link>
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
                    <h4>All Staff</h4>
                </div>
                <div className="p-2 ">
                    <Link to='/new-staff'>
                      <CButton color='primary'>
                          + <CIcon icon={cilUser} title="New Staff" />
                      </CButton>
                    </Link>
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
 
export default Staff;