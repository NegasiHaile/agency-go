import React, { useState } from 'react'
import { MyContext } from './context'
const Wrapper = ({children} :any) => {


const [fromData,setFormData]=useState<any>(null)

const [tags,setTags]=useState<any>(null)
  const getTags =()=>{
    console.log("sd")
    setTags(localStorage.getItem("Tags"))
  }
  return (
   <MyContext.Provider value={{getTags,setFormData,fromData,tags}}>
      {children}
   </MyContext.Provider>
  )
}

export default Wrapper