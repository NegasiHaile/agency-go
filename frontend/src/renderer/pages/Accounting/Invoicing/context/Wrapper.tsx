import React, { useState } from 'react'
import { MyInvoiceContext } from './context'
const Wrapper = ({children} :any) => {



  const[data, setData]=useState<any>({invoices: []})
  const[creatorInvoices, setCreatorInvoices]=useState<any>([])
  return (
   <MyInvoiceContext.Provider value={{data, setData, creatorInvoices, setCreatorInvoices}}>
      {children}
   </MyInvoiceContext.Provider>
  )
}

export default Wrapper