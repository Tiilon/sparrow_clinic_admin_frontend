import jwtDecode from "jwt-decode";


export function getCurrentUser() {
    try {
      const jwt = localStorage.getItem('access_token');
      return jwtDecode(jwt);
    } catch (ex) {
      return ex;
    }
  }

  export async function getStaffDetails(id) {
    try {
      const {data} = await authAxios.get(`management/user/${id}`)
    } catch (ex) {
      return ex;
    }
  }

export default{
    getCurrentUser
}
