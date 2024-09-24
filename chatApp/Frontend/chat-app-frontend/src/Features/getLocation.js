import {useLocation} from 'react-router-dom'
const getRoute=()=>{
    const location=useLocation();
    return location.pathname;
}
export default getRoute