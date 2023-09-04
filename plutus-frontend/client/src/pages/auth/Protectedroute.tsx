
import { useLocation, Navigate } from "react-router-dom";



 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const ProtectedRoute = ({children}:any) => {
    const location = useLocation()

    const isAuthenticated = localStorage.getItem('token')


      
    if(!isAuthenticated || isAuthenticated == undefined){
        return (
            <Navigate to="/" state={{from:location} }/>
        )
    }
    return children
}

export default ProtectedRoute 



 