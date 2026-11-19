
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export type FromData = {
  name: string
  category: string
  description: string
  price: string
  location: string
  image: string   
}

export const CreateMenuItems= async(data: FromData)=>{
  
  const res=await fetch(`${BASE_URL}/menus`,{
    method:"POST",
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify(data),
  })
  return res.json()
}

