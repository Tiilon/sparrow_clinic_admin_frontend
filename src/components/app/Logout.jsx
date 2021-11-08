import { Component } from 'react'
import { authAxios } from 'src/services/httpServices';


class Logout extends Component {
    
    componentDidMount(){
        authAxios.post("logout/blacklist/", {
            refresh_token: localStorage.getItem('refresh_token'),
        })
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        authAxios.defaults.headers['Authorization'] = null;
        window.location = '/login';
    }

    render() { 
        return null
    }
}
 
export default Logout;