import {createBrowserRouter} from 'react-router'
import MainLayout from '../Layouts/MainLayout'
import Home from '../Pages/Authentication/Home';
import Login from '../Pages/Authentication/Login';
import Registration from '../Pages/Authentication/Register';
import JobDetails from '../Pages/jobDetails';




const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                index:true,
                element:<Home/>,
                // loader:()=> fetch(`${import.meta.env.VITE_API_URL}/jobs`),
                // loader:()=>fetch('http://localhost:9000/jobs')
                
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/registration',
                element:<Registration/>
            },
            {
                path:'/job/:id',
                element:<JobDetails/>,
                loader: ({params})=> fetch(`http://localhost:9000/job/${params.id}`)
            },
        ]
    }
])

export default router;