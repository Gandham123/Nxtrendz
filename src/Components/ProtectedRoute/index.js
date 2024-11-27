import'./index.css'
import Cookies from 'js-cookie'
import { Redirect,Route } from 'react-router-dom/cjs/react-router-dom.min'
const ProtectedRoute=(props)=>{
    const token=Cookies.get('AccessToken')
    if(token===undefined){
        return <Redirect to='/login'/>
    }
    else{
       return <Route {...props}/>
    }
}
export default ProtectedRoute