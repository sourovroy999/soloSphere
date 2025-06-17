import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure= axios.create({
    baseURL: 'http://localhost:9000',
    withCredentials:true,
    
})

const UseAxiosSecure = () => {

    const{logOut}=useAuth()
    const navigate=useNavigate()
    
    //interceptor

    //response interceptor
    axiosSecure.interceptors.response.use(
         res=>{
            console.log('i intercept what is inside',res);
            
            return res
         },
        async error=>{
            console.log('error from axios interceptor', error.response);
            if(error.response.status === 401 || error.response.status === 403 ){
               await logOut()
                navigate('/login')
            }
            return Promise.reject(error)
         }

    )

    //request interceptor
    // axios.interceptors.request
   
    return axiosSecure 
};

export default UseAxiosSecure;