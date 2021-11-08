import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
    CButton,
    CCard,
    CCardBody,
    CFormInput,
    CInputGroup,
    CAlert,
    CHeader,
    CListGroupItem,
    CListGroup,
    CRow,
    CCol,
    CImage,
  } from '@coreui/react'
import { authAxios } from 'src/services/httpServices';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const PatientDetails = (props) => {
    const [visible, setVisible] = useState(false)
    const [patient,setPatient] = useState({})
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [error, setError] = useState('')
    const [weight, setWeight] = React.useState(0)
    const [pulse, setPulse] = React.useState(0)
    const [diastolic, setDiastolic] = React.useState(0)
    const [systolic, setSystolic] = React.useState(0)
    const [respiration, setRespiration] = React.useState(0)
    const [temperature, setTemperature] = React.useState(0)
    const [attendances, setAttendances] = useState([])
    const [vitals, setVitals] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const patientId = props.match.params.id
    // setLoading(true);
    async function getAllPatients(){
        const {data} = await authAxios.get(`hospital/patient/${patientId}/`)
        const {data:attendances} = await authAxios.get(`hospital/attendance/${patientId}/`)
        const {data:vitals} = await authAxios.get(`hospital/patient/vitals/${patientId}/`)
        setPatient(data);
        setAttendances(attendances);
        setVitals(vitals);
        // setLoading(false);
    }
    getAllPatients();
}, [])


  const submit = async (e) => {
    e.preventDefault()
    setVisible(!visible)
    const patientId = props.match.params.id
    try{
        const res = await authAxios.post(`hospital/attendance/${patientId}/`, {});
        if(res.data.error){
            setError(res.data.error)           
        }else{
            window.location.reload(true);
        }
        
    }catch (ex) {
        // if (ex.response && ex.response.status === 400){
        //     console.log(ex.response.data)
        //     setError(ex.response.data)
        // }
        console.log(ex)
    }
  }

  const submitVitals = async (e) => {
    e.preventDefault()
    
    const patientId = props.match.params.id
    try{
        const res = await authAxios.post(`hospital/patient/vitals/${patientId}/`, {
            'weights':weight,
            'sys':systolic,
            'dias':diastolic,
            'respiration':respiration,
            'pulse':pulse,
            'temperature':temperature
        });
        if(res.data.error){
            setError(res.data.error)           
        }else{
            window.location.reload(true);
        }
        
    }catch (ex) {
        // if (ex.response && ex.response.status === 400){
        //     console.log(ex.response.data)
        //     setError(ex.response.data)
        // }
        console.log(ex)
    }
  }

  return (
   <>
   {error && <CAlert>{error}</CAlert>}            
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Personal Details" {...a11yProps(0)} />
          <Tab label="Medical History" {...a11yProps(1)} />
          <Tab label="Vitals" {...a11yProps(2)} />
          <Tab label="Diagnosis" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CRow className='justify-content-center'>
            <CCol md={4}>
                {/* <CCard> */}
                    {/* <CCardBody> */}
                        <CImage
                        src={patient.gender === 'FEMALE' ? "https://media.istockphoto.com/vectors/person-gray-photo-placeholder-woman-vector-id1133765698?b=1&k=20&m=1133765698&s=612x612&w=0&h=TUwwjOjv_PJF8lEZ0kh_AvYo8MuzQtsGgJok5ftIg1Q=" : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNreoO6YwWWxBdsUzF1ajEd6Z_inQT_Sbz3g&usqp=CAU'}
                        className="d-inline-block align-top"
                        alt="CoreuiVue"
                        height="380"
                        width="400"
                        />
                    {/* </CCardBody> */}
                {/* </CCard> */}
            </CCol>
            <CCol md={8} lg={6}>
                <CCard className="mb-4">
                    <CCardBody>
                        <p className="text-medium-emphasis small">
                        <strong>On display is the personal information of Patient.</strong>
                        </p>
                        <CListGroup>
                            <CListGroupItem>
                                ID : {patient.patient_id}
                            </CListGroupItem>
                            <CListGroupItem>
                                First Name : {patient.first_name}
                            </CListGroupItem>
                            <CListGroupItem>
                                Last Name: {patient.last_name}
                            </CListGroupItem>
                            <CListGroupItem>
                                Gender : {patient.gender}
                            </CListGroupItem>
                            <CListGroupItem>
                                Contact : {patient.contact}
                            </CListGroupItem>
                            <CListGroupItem>
                                Maital Status : {patient.marital_status}
                            </CListGroupItem>
                            <CListGroupItem>
                                Date Of Birth : {patient.date_of_birth}
                            </CListGroupItem>
                        </CListGroup>
                    </CCardBody>
                </CCard>
      
            </CCol>
        </CRow>
       
      </TabPanel>
      <TabPanel value={value} index={1}>
        Medical History Go Here
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CRow>
            <CCol md={4}>
            {error && <CAlert>{error}</CAlert>}
                <CCard>
                    <CHeader>
                        <strong>New Vitals</strong>
                    </CHeader>
                    <CCardBody>
                        <CRow m-3>
                            <CCol>
                                Weight
                                <CInputGroup className="mb-3">
                                    <CFormInput
                                    placeholder="Enter Weight"
                                    aria-label="Enter Weight"
                                    aria-describedby="basic-addon1"
                                    type='number'
                                    onChange={(e)=>{setWeight(e.target.value)}}
                                />
                                </CInputGroup>
                            </CCol>
                            <CCol>
                                Pulse
                                <CInputGroup className="mb-3">
                                    <CFormInput
                                    placeholder="Enter Pulse"
                                    aria-label="Enter Pulse"
                                    aria-describedby="basic-addon1"
                                    type='number'
                                    onChange={(e)=>{setPulse(e.target.value)}}
                                />
                                </CInputGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                Diastolic
                                <CInputGroup className="mb-3">    
                                    <CFormInput
                                    placeholder="Enter Diastolic"
                                    aria-label="Enter Diastolic"
                                    aria-describedby="basic-addon1"
                                    type='number'
                                    onChange={(e)=>{setDiastolic(e.target.value)}}
                                />
                                </CInputGroup>
                            </CCol>
                            <CCol>
                                Systolic
                                <CInputGroup className="mb-3">
                                    <CFormInput
                                    placeholder="Enter Systolic"
                                    aria-label="Enter Systolic"
                                    aria-describedby="basic-addon1"
                                    type='number'
                                    onChange={(e)=>{setSystolic(e.target.value)}}
                                />
                                </CInputGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                Respiration
                                <CInputGroup className="mb-3">
                                    <CFormInput
                                    placeholder="Enter Respiration"
                                    aria-label="Enter Respiration"
                                    aria-describedby="basic-addon1"
                                    type='number'
                                    onChange={(e)=>{setRespiration(e.target.value)}}
                                />
                                </CInputGroup>
                            </CCol>
                            <CCol>
                                Temperature
                                <CInputGroup className="mb-3">
                                    <CFormInput
                                    placeholder="Enter Temperature"
                                    aria-label="Enter Temperature"
                                    aria-describedby="basic-addon1"
                                    type='number'
                                    onChange={(e)=>{setTemperature(e.target.value)}}
                                />
                                </CInputGroup>
                            </CCol>
                        </CRow>
                        <div className="d-grid mt-3">
                            <CButton
                            color='primary'
                            className='block'
                            onClick={submitVitals}
                            >
                            Add
                        </CButton>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Diagnosis Go Here
      </TabPanel>
    </div>
  </>
  );
}
export default PatientDetails;