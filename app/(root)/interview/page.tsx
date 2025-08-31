"use client"
import { auth,authStateChanged } from '@/firebase/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import Agent from "@/components/Agent";
// import { getCurrentUser } from "@/lib/actions/auth.action";
// import { getInterviewsByUserId } from "@/lib/actions/general.action";
import {SubmitHandler, useForm} from 'react-hook-form'

type FormFields={
  type:String;
  role:String;
  level:String;
  techstack:String;
  amount:String;
  userid:String;
}

const Page = () => {

  const router = useRouter()

  useEffect(()=>{
    authStateChanged(auth,(user)=>{
      if(user){
        // console.log('UID',user.uid)
        setValue("userid",user.uid)
      }
      else{
        console.log('user not found')
      }
    })
  },)
  const {register,handleSubmit,formState:{errors,isSubmitting},setValue} = useForm<FormFields>()
  //the reason we are got getting the form event directly because we will pass below funtion in handleSubmit method from react-hook-form
  const onSubmit: SubmitHandler<FormFields>=async (data)=>{
    // await new Promise((resolve)=>setTimeout(resolve,7000));
    try{

      const response = await fetch('https://interview-iq-seven.vercel.app/api/vapi/generate',{
        method:"POST",
        headers:{
          'content-Type':'application/json',
        },
        body:JSON.stringify(data)
      })
      
      const response_data = await response.json();
      if(response_data.success){
        alert("Your Interview has created successfully, you will navigate to home page automatically and check the first interview card below")
        router.push("/")
      }
      else{
        alert("OOPS!..."+response_data.error.toString())
      }
      
    }
    catch(error){
      console.log("error:",error)
    }
  }

  return (
    //Note: when user click on submit button first it will go to handleSubmit function and that function will do some work like prevent from reload , same like (e.preventdefault) okay and also check the FormField are also valid before calling the onSubmit method , after that it will call
    
    <form className="flex flex-col p-8 rounded-md" onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col'>
        <label className='mb-2 font-sans'>Enter the Type</label>
        <input className='bg-gray-800 p-2 rounded-sm' {...register("type",{required:"Type field is required",})} type="text" placeholder="(Technology, Analysis, Mixed)" />
        {errors.type && <div className='text-red-500'>{errors.type.message}</div>}<br/>
      </div>
    
      <div className='flex flex-col'>
        <label className='mb-2 font-sans'>What kind of role you want to practicing for</label>
        <input className='bg-gray-800 p-2 rounded-sm' {...register("role",{required:"Role field is required",})} type="text" placeholder="FrontEnd, Backend, etc" />
        {errors.role && <div className='text-red-500'>{errors.role.message}</div>}<br/>
      </div>

      <div className='flex flex-col'>
        <label className='mb-2 font-sans'>Experienced or Fresher</label>
        <input className='bg-gray-800 p-2 rounded-sm' {...register("level",{required:"level field is required",})} type="text" />
        {errors.level && <div className='text-red-500'>{errors.level.message}</div>}<br/>
      </div>

      <div className='flex flex-col'>
        <label className='mb-2 font-sans'>Type TechStack like MERN, MEAN, AI/ML, etc</label>
        <input className='bg-gray-800 p-2 rounded-sm' {...register("techstack",{required:"techstack field is required",})} type="text" />
        {errors.techstack && <div className='text-red-500'>{errors.techstack.message}</div>}<br/>
      </div>

      <div className='flex flex-col'>
        <label className='mb-2 font-sans'>How many questions would you like me to ask ?</label>
        <input className='bg-gray-800 p-2 rounded-sm' {...register("amount",{required:"This field is required",})} type="text"/>
        {errors.amount && <div className='text-red-500'>{errors.amount.message}</div>}<br/>
      </div>
    
      <div className='flex flex-col'>
        <input className='bg-gray-800 p-2 rounded-sm' {...register("userid",{required:false,})} type="text" readOnly hidden /><br/>
      </div>

      <div className='flex justify-center'>
        <button className='w-[200px] bg-gray-600 px-2 py-4 rounded-sm hover:cursor-pointer hover:bg-gray-700' type="submit" disabled={isSubmitting}>{isSubmitting?"setting up...":"Setup the Interview"}</button>
      </div>
    </form>
  );
};

export default Page;
