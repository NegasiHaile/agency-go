import React, { useState } from 'react'
import { MyInvoiceContext } from './context'
const Wrapper = ({children} :any) => {



  const[data, setData]=useState<any>(null)
  return (
   <MyInvoiceContext.Provider value={{data, setData}}>
      {children}
   </MyInvoiceContext.Provider>
  )
}

export default Wrapper