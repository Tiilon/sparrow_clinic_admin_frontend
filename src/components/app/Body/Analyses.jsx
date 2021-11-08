import React, {useState, useEffect, useRef} from 'react'
import CIcon from '@coreui/icons-react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormSelect,
  CListGroupItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,PieChart,Pie
} from 'recharts';

import { authAxios } from 'src/services/httpServices';
import { cilCheck, cilFile, cilX } from '@coreui/icons';
import { DocsExample } from 'src/components';
import FeedBackForm from './FeedbackForm';


const Analyses = (props) => {
  const [patient_count,setPatientCount] = useState([])
  const [pieChart,setPieChart] = useState([])
  const [totalPatCount, setTotalPatCount] = useState([])
  const [reportSummary, setReportSummary] = useState([])
  const [showReportYear, setShowReportYear] = useState(false)
  const [weekList, setWeekList] = useState([])
  const [week, setWeek] = useState('')


  const pdfGenerate = async () => {
    const {data} = await authAxios.post('marketing/analyses/', {
      'date':week
    })
    setPatientCount(data.patient_count)
    setPieChart(data.pie_chart)
    setTotalPatCount(data.total_patient_count_data)
    setReportSummary(data.report_summary)
  }

  useEffect(() => {
    async function getPatientCountData() {
      const {data} = await authAxios.get('marketing/analyses/')
      const {data:reports} = await authAxios.get('marketing/reports/')
      setWeekList(reports.week_list)
      setPatientCount(data.patient_count)
      setPieChart(data.pie_chart)
      setTotalPatCount(data.total_patient_count_data)
      setReportSummary(data.report_summary)
    }
    getPatientCountData()
  }, [])

  const showInput = (object) => {
    return setShowReportYear(true ? object=true : false)
  }
  
  const renderLabel = (entry) => {
    return `${entry.name} - ${entry.value}%`;
}
let options = {year: 'numeric', month: 'long', day: 'numeric' };

  const COLORS = ['#82ca9d', '#8884d8', '#FFBB28', '#FF8042'];
  return (
      <div id='pdf'>
        <CRow>
          {showReportYear && 
            <div className="">
              <CRow>
                <CCol className="m-1" md={5}>
                  <CFormSelect aria-label="Default select example" className="mb-3" onChange={(e)=>setWeek(e.target.value)}>
                  <option value='current'>Current Week</option>
                  {weekList.map(g =>
                    <option value={g.week[0]} key={g.number}>Week {g.number} - From {new Date(g.week[0]).toLocaleDateString("en-US", options)} to {new Date(g.week[1]).toLocaleDateString("en-US", options)}</option>
                  )}
                  </CFormSelect>
                </CCol>
                <CCol>
                  <CButton color='primary' className="m-1">
                    <CIcon icon={cilCheck} onClick={()=>pdfGenerate()}/>
                  </CButton>
                  <CButton color='danger' onClick={()=>setShowReportYear(false)}>
                    <CIcon icon={cilX} />
                  </CButton>
                </CCol>
              </CRow>
            </div>
          }
          {!showReportYear && 
          <CCol className="m-1">
            <CButton color='primary' onClick={(showReportYear)=>showInput(showReportYear)}>
              <CIcon icon={cilFile} title="PDF" /> Retrieve a report
            </CButton> 
          </CCol>}
        </CRow>
        <CCard>
        <CCardHeader className="mb-3">
        <div className="d-flex ">
          <div className="p-2 flex-grow-1 ">
          Visual Representations
          </div> 
          {/* <div className="p-2 ">
          <CButton color='primary' onClick={pdfGenerate}>
            <CIcon icon={cilFile} title="PDF" /> Get PDF
          </CButton>
          </div>  */}
        </div>
        </CCardHeader>
        <CCardBody>
          <CRow className='mb-5'>
            <CTable hover responsive align="middle" className="mb-0 border">
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell className="text-center">Branch</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Total Visits</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">First Time Visits</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Patients Reached</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody></CTableBody>
                  <CTableBody>
                    {reportSummary.map(report => 
                      <CTableRow>
                        <CTableDataCell className="text-center">
                          {report.branch}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {report.total_visits}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {report.first_time}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {report.patients_reached}
                        </CTableDataCell>
                      </CTableRow>
                    )}
              </CTableBody>
            </CTable>
          </CRow>
          <CRow>
            <CCol className="m-3">
              <h3>Patient's Satisfaction Level - Branch Per Branch</h3>
              <BarChart
                width={700}
                height={400}
                data={patient_count}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <Legend layout="horizontal" verticalAlign="top" align="center" />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="satisfied" fill="#8884d8" />
                <Bar dataKey="unsatisfied" fill="#82ca9d" />
              </BarChart>
            </CCol>
            <CCol className="m-3">
              <h3>Overall Patient Satisfaction Level - Percentage Split</h3>

              <PieChart width={500} height={400}>
              <Legend layout="horizontal" verticalAlign="top" align="center" />
                
                <Pie 
                  data={pieChart} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  fill="#82ca9d" 
                  label
                  // label={renderLabel}
                >
                  	{
                      pieChart.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
              </PieChart>
            </CCol>
          </CRow>
          <hr className="mb-5"/>
          <CRow>
            <CCol className="m-3">
              <h3>Patient Count Comparison Week On Week (Branches)</h3>
              <BarChart
                width={700}
                height={400}
                data={patient_count}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <Legend layout="horizontal" verticalAlign="top" align="center" />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="previous" fill="#8884d8" />
                <Bar dataKey="current" fill="#82ca9d" />
              </BarChart>
            </CCol>
            <CCol className="m-3">
              <h3>Overall Patient Count Comparison Week On Week</h3>
              <BarChart
                width={700}
                height={400}
                data={totalPatCount}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <Legend layout="horizontal" verticalAlign="top" align="center" />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="previous" fill="#8884d8" />
                <Bar dataKey="current" fill="#82ca9d" />
              </BarChart>
            </CCol>
          </CRow>
          <hr />
          
          <CRow>
            <CCard className="mb-4">
              <CCardHeader>
                <h3 className='text-primary'><strong>HIGHLIGHTS</strong></h3>
              </CCardHeader>
               <CCardBody>
                 <CRow>
                 {reportSummary.map(report => 
                  <CCol md={4}>
                      <h4><strong>{report.branch}</strong></h4>
                      <hr />
                      <h5><strong>Patient Count Highlights</strong></h5>
                      <CListGroupItem className="d-flex justify-content-between align-items-center">
                        Total Patient Count
                        <CBadge color="primary" shape="rounded-pill">
                          {report.current_patient_count}
                        </CBadge>
                        <CBadge color="primary" shape="rounded-pill">
                          Previous figure was {report.previous_patient_count}
                        </CBadge>
                      </CListGroupItem>
                      <hr />
                      <h5><stong>Feedback Highlights</stong></h5>
                      {/* <hr /> */}
                      <CTable hover responsive align="middle" className="mb-0 border">
                            <CTableBody></CTableBody>
                            <CTableBody>
                                <CTableRow>
                                  <CTableDataCell className="text-center">
                                    <strong>Excellent</strong>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                  <CBadge color="primary" shape="rounded-pill">
                                    {report.excellent_feedback.toFixed(1)}%
                                  </CBadge>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                  <CBadge color="primary" shape="rounded-pill">
                                    {report.excellent_comment}
                                  </CBadge>
                                  </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                  <CTableDataCell className="text-center">
                                    <strong>Very Good</strong>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                  <CBadge color="primary" shape="rounded-pill">
                                    {report.very_good_feedback.toFixed(1)}%
                                  </CBadge> 
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                  <CBadge color="primary" shape="rounded-pill">
                                    {report.very_good_comment}
                                  </CBadge>
                                  </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                  <CTableDataCell className="text-center">
                                    <strong>Good</strong>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                  <CBadge color="primary" shape="rounded-pill">
                                    {report.good_feedback.toFixed(1)}%
                                  </CBadge>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                  <CBadge color="primary" shape="rounded-pill">
                                    {report.good_comment}
                                  </CBadge>
                                  </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                  <CTableDataCell className="text-center">
                                    <strong>Fair</strong>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                  <CBadge color="primary" shape="rounded-pill">
                                    {report.fair_feedback.toFixed(1)}%
                                  </CBadge>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                  <CBadge color="primary" shape="rounded-pill">
                                    {report.fair_comment}
                                  </CBadge>
                                  </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                  <CTableDataCell className="text-center">
                                    <strong>Bad</strong>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                  <CBadge color="primary" shape="rounded-pill">
                                    {report.bad_feedback.toFixed(1)}%
                                  </CBadge>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                  <CBadge color="primary" shape="rounded-pill">
                                    {report.bad_comment}
                                  </CBadge>
                                  </CTableDataCell>
                                </CTableRow>
                        </CTableBody>
                      </CTable>                  
                   </CCol>
                  )}
                 </CRow>   
                </CCardBody>
              </CCard>
          </CRow>
          <CRow>
            <CCol xs={12}>
            <h3 className='text-primary'><strong>FeedBack Comments</strong></h3>
              {reportSummary.map(report => 
                report.feedback_comments.map(fb => fb ?
              <CTable hover responsive align="middle" className="mb-0 border">
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell className="text-center"><h4><strong>Branch</strong></h4></CTableHeaderCell>
                        <CTableHeaderCell className="text-center"><h4><strong>Patient</strong></h4></CTableHeaderCell>
                        <CTableHeaderCell className="text-center"><h4><strong>Comment</strong></h4></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody></CTableBody>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell className="text-center">
                            <strong>{fb.branch}</strong>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              <strong>{fb.patient}</strong>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              <strong>{fb.comment}</strong>
                            </CTableDataCell>
                        </CTableRow>    
                </CTableBody>
              </CTable>
               : 'There is no Data to Show')
              )}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      </div> 
     );
}
 
export default Analyses;