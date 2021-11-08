import React, {useState, useEffect} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CInputGroup,CRow } from '@coreui/react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { authAxios } from 'src/services/httpServices';


const FeedBackForm = (props)=> {
  const [reception, setReception] = useState(0)
  const [nurse, setNurse] = useState(0)
  const [doctor, setDoctor] = useState(0)
  const [lab, setLab] = useState(0)
  const [pharmacy, setPharmacy] = useState(0)
  const [overall, setOverall] = useState(0)
  const [cashier, setCashier] = useState(0)
  const [houseKeeper, setHouseKeeper] = useState(0)
  const [bestStaff, setBestStaff] = useState('')
  const [opinion, setOpinion] = useState('')
  const [referal, setReferal] = useState('')
  const [details, setDetails] = useState('')

  const id = props.match.params.id

  useEffect(() => {
    async function getDetails(){
        const {data} = await authAxios.get(`marketing/feedback/${id}`)
        setDetails(data)
    }
    getDetails();
  }, [])

  const submitFeedBack = async () => {
      await authAxios.put(`marketing/feedback/${id}/`, {
        'reception' : reception,
        'nurse' : nurse,
        'doctor' : doctor,
        'lab' : lab,
        'pharmacy' : pharmacy,
        'cashier' : cashier,
        'house_keeper' : houseKeeper,
        'overall' : overall,
        'opinion' : opinion,
        'best_staff' : bestStaff,
        'referal': referal,
      })
      window.location ="/fbattendances/"
      // props.history.push("/fbattendances/")
  }

  return (
    <>
    <CCard>
      <CCardHeader>
        <h4>{details.patient}'s feedback on visit ({details.date})</h4>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol md={6}>
            <CRow className='mb-3'>
              <CCol md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Reception</FormLabel>
                  <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={(e)=>setReception(parseInt(e.target.value))}>
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="4" control={<Radio />} label="4" />
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                  </RadioGroup>
                </FormControl>
              </CCol>
              <CCol md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Nurse</FormLabel>
                  <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={(e)=>setNurse(parseInt(e.target.value))}>
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="4" control={<Radio />} label="4" />
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                  </RadioGroup>
                </FormControl>
              </CCol>
            </CRow>
            <hr />
            <CRow>
              <CCol md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Doctor</FormLabel>
                  <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={(e)=>setDoctor(parseInt(e.target.value))}>
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="4" control={<Radio />} label="4" />
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                  </RadioGroup>
                </FormControl>
              </CCol>
              <CCol md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Laboratory</FormLabel>
                  <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={(e)=>setLab(parseInt(e.target.value))}>
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="4" control={<Radio />} label="4" />
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                  </RadioGroup>
                </FormControl>
              </CCol>
            </CRow>
            <hr />
            <CRow>
              <CCol md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Pharmacy</FormLabel>
                  <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={(e)=>setPharmacy(parseInt(e.target.value))}>
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="4" control={<Radio />} label="4" />
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                  </RadioGroup>
                </FormControl>
              </CCol>
              <CCol md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Cashier</FormLabel>
                  <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={(e)=>setCashier(parseInt(e.target.value))}>
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="4" control={<Radio />} label="4" />
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                  </RadioGroup>
                </FormControl>
              </CCol>
            </CRow>
            <hr />
            <CRow>
              <CCol md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">House Keeper</FormLabel>
                  <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={(e)=>setHouseKeeper(parseInt(e.target.value))}>
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="4" control={<Radio />} label="4" />
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                  </RadioGroup>
                </FormControl>
              </CCol>
              <CCol md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Overall</FormLabel>
                  <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={(e)=>setOverall(parseInt(e.target.value))}>
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="4" control={<Radio />} label="4" />
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                  </RadioGroup>
                </FormControl>
              </CCol>
            </CRow>
  
          </CCol>
          <CCol md={6}>
            <CInputGroup className="mb-3">
                <CFormInput placeholder="Best Staff" autoComplete="bestStaff" type='text' onChange={(e)=>setBestStaff(e.target.value)}/>
            </CInputGroup>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '85ch' },
              }}
              noValidate
              autoComplete="off"
            >
              
              <div>
                <TextField
                  id="filled-textarea"
                  label="How can we do better"
                  placeholder=""
                  multiline
                  variant="filled"
                  rows={6}
                  onChange={(e)=>setOpinion(e.target.value)}
                /> 
              </div>
              <div>
                <TextField
                  id="filled-textarea"
                  label="How did you here about Rabito"
                  placeholder=""
                  multiline
                  variant="filled"
                  rows={2}
                  onChange={(e)=>setReferal(e.target.value)}
                /> 
              </div>
            </Box>
            <div className="m-3">
                  <CButton color="info" onClick={submitFeedBack}>
                    Submit Feedback
                  </CButton>
                </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    </>
  );
}
export default FeedBackForm
