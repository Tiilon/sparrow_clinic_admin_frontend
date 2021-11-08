import { MDBDataTable } from 'mdbreact';
import Clockloader from "react-spinners/ClipLoader";

const Loading = ({loading, color}) => {
    return ( 
        <div className="align-items-center">
            <Clockloader color={color} loading={loading} size={150} />
        </div>
     );
}
 
export default Loading;