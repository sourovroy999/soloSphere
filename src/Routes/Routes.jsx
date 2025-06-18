import {createBrowserRouter} from 'react-router'
import MainLayout from '../Layouts/MainLayout'
import Home from '../Pages/Authentication/Home';
import Login from '../Pages/Authentication/Login';
import Registration from '../Pages/Authentication/Register';
import JobDetails from '../Pages/jobDetails';
import AddJob from '../Pages/AddJob';
import ErrorPage from '../Pages/ErrorPage';
import MyPostedJobs from '../Pages/MyPostedJobs';
import UpdateJob from '../Pages/UpdateJob';
import PrivateRoute from './PrivateRoute';
import MyBids from '../Pages/MyBids';
import BidRequests from '../Pages/BidRequest';
import AllJobs from '../Pages/AllJobs';




const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        errorElement:<ErrorPage/>,
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
                element:<PrivateRoute>
                    <JobDetails/>
                </PrivateRoute> ,
                loader: ({params})=> fetch(`http://localhost:9000/job/${params.id}`)
                
            },
            {
                path:'/update/:id',
                element:<PrivateRoute>
                    <UpdateJob/>
                </PrivateRoute>,
                loader: ({params})=> fetch(`http://localhost:9000/job/${params.id}`)
                
            },
            {
                path:'/add-job',
                element:<PrivateRoute>
                    <AddJob/>
                </PrivateRoute>
            },
            {
                path:'/my-posted-jobs',
                element:<PrivateRoute>
                    <MyPostedJobs/>
                </PrivateRoute>
            },
            {
                path:'/my-bids',
                element:<PrivateRoute>
                    <MyBids/>
                </PrivateRoute>
            },
            {
                path:'/bid-requests',
                element:<PrivateRoute>
                    <BidRequests/>
                </PrivateRoute>
            },{
                path:'/jobs',
                element:<AllJobs/>
            }
        ]
    }
])

export default router;