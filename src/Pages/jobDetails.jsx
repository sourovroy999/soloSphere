import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router"
import { AuthContext } from "../Provider/AuthProvider";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import UseAxiosSecure from "../hooks/UseAxiosSecure";

const JobDetails = () => {

const axiosSecure=UseAxiosSecure()
const {user}=useContext(AuthContext)


    const job=useLoaderData()

    const {
  
  job_title,
  deadline,
  description,
  min_price,
  max_price,

  category,
  _id,
  buyer
} = job || {}

console.log(buyer);



      const [startDate, setStartDate] = useState(new Date());


      const navigate=useNavigate()

const handleFormSubmission=async(e)=>{

    e.preventDefault()
    if (user?.email === buyer.buyer_email) 
        return toast.error('action not permittes')

    const form=e.target 
    const jobId=_id 
    const price=parseFloat(form.price.value)

    if(price < parseFloat(min_price)) 
      
          {
            console.log('helloooo');
            
            return toast.error('Offer more or at least equal to minimum price')
          }
    if(price > parseFloat(max_price)) 
      
          {
            console.log('helloooo');
            
            return toast.error('Offer less or at least equal to maximum price')
          }

      

    const comment= form.comment.value 
    const email=user?.email
    // const buyer_email= buyer_email
    const status='Pending'
    const deadline=startDate


    const bidData={
        jobId,
        price,
        comment, 
        email,
        buyer,
     
         status,
         deadline, 
        category, 
        job_title,   
       
    }

    console.table(bidData)
   
    try{
        const{data}=await axiosSecure.post('/bid', bidData)
        console.log(data);
        toast.success('Bid Placed Successfully')
        navigate('/my-bids')
        

    }catch(err){
        console.log(err);
        toast.error(err.response.data)
        e.target.reset()
    }

  }



  





  return (
    <div className='flex my-10 flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-5xl mx-auto '>

      <div className='flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-light text-gray-800 '>
            Deadline: {new Date(deadline).toLocaleDateString()}
          </span>
          <span className='px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full '>
            {category}
          </span>
        </div>

        <div>
          <h1 className='mt-2 text-3xl font-semibold text-gray-800 '>
            {job_title}
          </h1>

          <p className='mt-2 text-lg text-gray-600 '>
            {description}
          </p>
          <p className='mt-6 text-sm font-bold text-gray-600 '>
            Buyer Details:
          </p>
          <div className='flex items-center gap-5'>
            <div>
              <p className='mt-2 text-sm  text-gray-600 '>Name: {buyer?.name}</p>
              <p className='mt-2 text-sm  text-gray-600 '>
                Email: {buyer?.buyer_email}
              </p>
            </div>
            <div className='rounded-full object-cover overflow-hidden w-14 h-14'>
              <img src={buyer?.photo} alt='' />
            </div>
          </div>
          <p className='mt-6 text-lg font-bold text-gray-600 '>
            Range: ${min_price} - ${max_price}
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className='p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]'>
        <h2 className='text-lg font-semibold text-gray-700 capitalize '>
          Place A Bid
        </h2>

        <form onSubmit={handleFormSubmission}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className='text-gray-700 ' htmlFor='price'>
                Price
              </label>
              <input required
                id='price'
                type='number'
                name='price'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='emailAddress'>
                Email Address
              </label>
              <input defaultValue={user?.email}
                id='emailAddress'
                type='email'
                name='email'
                disabled
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='comment'>
                Comment
              </label>
              <input
                id='comment'
                name='comment'
                type='text'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker className="text-blue-400 border p-2 rounded-lg" selected={startDate} onChange={(date)=> setStartDate(date)}/>
            </div>
          </div>

          <div className='flex justify-end mt-6'>
            <button
              type='submit'
              className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
            >
              Place Bid
            </button>
 
          </div>
        </form>
      </section>

    </div>
  )
}

export default JobDetails