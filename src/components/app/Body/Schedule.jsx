import { useState, useEffect } from "react";
import { authAxios } from "src/services/httpServices";
import "react-datepicker/dist/react-datepicker.css";
import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormTextarea, CHeader, CInputGroup, CInputGroupText, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCalendar } from "@coreui/icons";
//date and time pickers
import 'react-google-flight-datepicker/dist/main.css';
import { TimePicker, MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';


const Scheduler = () => {
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    // const [endDate, setEndDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    useEffect(() => {
        // async function getData(){
        //   const {data} = await authAxios.get('user/schedule')
        //   setSchedules(data)
        // }    
        // getData()
    },[])

    const handleAddEvent = async (e) => {
        await authAxios.post('user/schedule/', {
            'description':description,
            'date':date,
            'start_time':startTime,
            'end_time':endTime,
        })
        window.location = '/schedule'
    }
   const today = new Date()
    
    return ( 
        <>
        <CRow>
            <CCol md={6} lg={4} >
                <CCard className='justify-content-center'>
                    <CHeader>
                        <h4>Create A New Schedule</h4>
                    </CHeader>
                    <CCardBody>
                        <CForm>
                        <CInputGroup className="mb-3">
                            {/* <CInputGroupText id="basic-addon1">@</CInputGroupText> */}
                            <CFormTextarea placeholder="Description" aria-label="Description" aria-describedby="basic-addon1" onChange={(e)=>setDescription(e.target.value)}/>
                        </CInputGroup>
                        <CCard className="mb-3">
                            <CCardBody>
                               <CRow className='justify-content-center'>
                                    <CCol>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                                                <DatePicker
                                                    label="Date"
                                                    inputVariant="outlined"
                                                    value={date ? date : today} 
                                                    onChange={(date)=>setDate(date)}
                                                    className='mt-2'
                                                />
                                        </MuiPickersUtilsProvider>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>        
                        <CCard>
                            <CCardBody>
                                <CRow>
                                    <CCol lg={6}>
                                
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    Start
                                        <TimePicker
                                            // label="Start"
                                            inputVariant="outlined"
                                            value={startTime ? startTime : today} 
                                            onChange={(startTime)=>setStartTime(startTime)}
                                            className='mt-2'
                                            format='HH:ii a'
                                        />
                                </MuiPickersUtilsProvider>
                            </CCol>
                                    <CCol lg={6}>
                                    
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        End
                                        <TimePicker
                                            // label="End"
                                            inputVariant="outlined"
                                            value={endTime ? endTime : today} 
                                            onChange={(endTime)=>setEndTime(endTime)}
                                            className='mt-2'
                                            format='HH:ii a'
                                        />
                                    </MuiPickersUtilsProvider>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                        <div className="d-grid">
                          <CButton color="success" onClick={handleAddEvent}>Add Schedule</CButton>
                        </div>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol md={6} lg={6}>
                <CCard>
                    <CHeader>
                        <CIcon icon={cilCalendar} style={{width:'60px', height:'45px'}} className='mr-3'/>
                        <h4>Schedule</h4>
                    </CHeader>
                    <CCardBody>
                        <h2>hi</h2>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
      </>
     );
}
 
export default Scheduler;