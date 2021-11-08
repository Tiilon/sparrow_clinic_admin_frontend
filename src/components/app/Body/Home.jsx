import React from 'react'
import Body from './Body'
import Footer from '../Footer/Footer'
import NavBar from '../Header/NavBar'
import SideNav from './SideNav'

const Home = () => {
  return (
    <div>
      <SideNav/>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <NavBar/>
        <div className="body flex-grow-1 px-3">
          <Body />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home