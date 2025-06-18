import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios'

const TabCategory = () => {

  const[jobs,setJobs]=useState([])

  useEffect(()=>{
    const getData=async()=>{
      const {data}=await axios('https://solosphere-server-three.vercel.app/jobs')
      setJobs(data)
    }
    getData()
  },[])

  console.log(jobs);
  
  
    return (
   
              <Tabs>
   <div className='container px-6 mx-auto py-10'>
    <h1 className='text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl '>
        Browse job by categories
    </h1>


        <p className='max-w-2xl mx-auto my-6 text-center text-gray-500'>
            these categories available for the time being. They are web development, graphics designing and degital marketing. Browse them by clicking on the tabs below
        </p>


    <div className='flex flex-col '>


         <TabList className={'flex justify-center items-center'}>
      <Tab>Web Development</Tab>
      <Tab>Graphics Design</Tab>
      <Tab>Digital Marketing</Tab>
    </TabList>



    <TabPanel className={''}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-5 mt-5  md:flex-row max-w-4xl mx-auto'>
          {
            jobs
            .filter(j=>j.category === 'Web Development')
            .map(job=>(
             
              
              <JobCard key={job._id} job={job}/>   
            )
          )
          }

    
        </div>
      
    </TabPanel>

    <TabPanel >
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-5 mt-5  md:flex-row max-w-4xl mx-auto'>
          {
            jobs
            .filter(j=>j.category === 'Graphics Design')
            .map(job=>(
             
              
              <JobCard key={job._id} job={job}/>   
            )
          )
          }

    
        </div>
      
    </TabPanel>
    <TabPanel>
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-5 mt-5  md:flex-row max-w-4xl mx-auto'>
          {
            jobs
            .filter(j=>j.category === 'Digital Marketing')
            .map(job=>(
             
              
              <JobCard key={job._id} job={job}/>   
            )
          )
          }

    
        </div>
    </TabPanel>

    </div>
   </div>
  </Tabs>
       
    );
};

export default TabCategory;