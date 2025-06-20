

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import UseAxiosSecure from "../hooks/UseAxiosSecure"
import useAuth from "../hooks/useAuth"
import toast from "react-hot-toast"


const BidRequests = () => {

  const queryClient=useQueryClient()
 const{user}=useAuth()
 const axiosSecure= UseAxiosSecure()

 const {data:bidRequests=[], 
  isLoading, 
  // refetch, 
  isError, 
  error}= useQuery({ //data get korar jnno useQuery use korete hbe

  queryFn:()=>getData(),
  queryKey:['bidRequests', user?.email]

 })


//  console.log(bids);
console.log(bidRequests);

 

 

   

   //previous way- eta korbo nah
   

    // const [bidRequests, setBidRequests]=useState([])

    // useEffect(()=>{
    
    //   getData() //refresh ui
    // },[user])
    
    const getData=async()=>{
        const{data}=await axiosSecure(`/bid-requests/${user?.email}` )
        
        return data
      }

  const { mutateAsync}=  useMutation({

      mutationFn:async ({id, status})=>{
        const {data}=await axiosSecure.patch(`/bid/${id}`,{status})
        console.log(data);
        return data
     },

     onSuccess:()=>{
      toast.success('Updated')
      console.log('wow data updated');
      //refresh ui for latest data
      // refetch() 

      //refresh ui for latest data (hard way)
      queryClient.invalidateQueries({queryKey:['bidRequests']}) //eta use korle baki onno jaygay refetch kora lagbe nah
      
     },


    })



    const handleStatus=async(id,prevStatus, status)=>{
      if(prevStatus === status)
       {
         
        console.log(id,prevStatus,status);
        return console.log('sorry u cant do this');
        
      }
      
      await mutateAsync({id, status})
        

      //  getData()  //axiossecure use korteci tai eta ar lagbe nahh


    }

    
    if(isLoading) return <p>Data is still loading</p>

    if (isError || error) {
      console.log(isError,error);
      
    }




  return (
    <section className='container px-4 mx-auto pt-12'>
      <div className='flex items-center gap-x-3'>
        <h2 className='text-lg font-medium text-gray-800 '>Bid Requests</h2>

        <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
          {bidRequests.length} Requests
        </span>
      </div>

      <div className='flex flex-col mt-6'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <div className='flex items-center gap-x-3'>
                        <span>Title</span>
                      </div>
                    </th>
                    <th
                      scope='col'
                      className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <div className='flex items-center gap-x-3'>
                        <span>Email</span>
                      </div>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <span>Deadline</span>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <button className='flex items-center gap-x-2'>
                        <span>Price</span>
                      </button>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Category
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Status
                    </th>

                    <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 '>
                    {/* all bid requests */}
                 {
                    bidRequests.map(request=> <tr key={request._id}>
                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                      {request.job_title}
                    </td>
                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                      {request.email}
                    </td>

                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                      {new Date(request.deadline).toLocaleDateString()}
                    </td>

                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                    ${request.price}
                    </td>
                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                      <div className='flex items-center gap-x-2'>
                       <p
                            className={`px-3 py-1 rounded-full ${
                              request.category === 'Web Development' &&
                              'text-blue-500 bg-blue-100/60'
                            } ${
                              request.category === 'Graphics Design' &&
                              'text-emerald-500 bg-emerald-100/60'
                            } ${
                             request.category === 'Digital Marketing' &&
                              'text-pink-500 bg-pink-100/60'
                            } text-xs`}
                          >

                          {request.category}
                        </p>
                      </div>
                    </td>
                    <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
                      <div
                          className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                            request.status === 'Pending' &&
                            'bg-yellow-100/60 text-yellow-500'
                          } ${
                            request.status === 'In Progress' &&
                            'bg-blue-100/60 text-blue-500'
                          } ${
                            request.status === 'Complete' &&
                            'bg-emerald-100/60 text-emerald-500'
                          } ${
                            request.status === 'Rejected' &&
                            'bg-red-100/60 text-red-500'
                          } `}
                        >
                        <span className='h-1.5 w-1.5 rounded-full bg-yellow-500'></span>
                        <h2 className='text-sm font-normal '> <em>{request.status}</em></h2>
                      </div>
                    </td>
                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                      <div className='flex items-center gap-x-6'>
                        {/* accept icon btn */}
                        <button onClick={()=> handleStatus(request._id, request.status, 'In Progress')}
                        disabled={request.status === 'Complete'}
                        className='disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='m4.5 12.75 6 6 9-13.5'
                            />
                          </svg>
                        </button>

                        {/* reject icon btn */}

                        <button
                         onClick={()=>{
                          handleStatus(request._id, request.status, 'Rejected')
                        }}
                         disabled={request.status === 'Complete'}
                        className='disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636'
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>)
                 }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BidRequests