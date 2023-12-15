import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, Switch, styled } from '@mui/material';
import './Addleder.css';
import { MyInvoiceContext } from '../../context/context';

const style = {
  position: 'absolute',
  top: '47%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 730,
  borderRadius: '10px',
  backgroundColor: 'white', // Changed "bgcolor" to "backgroundColor"
  color: 'black',
  boxShadow: '24px', // Added "px" for the box shadow size
  overflowY: 'auto', // Changed "overflow-y" to "overflowY"
  scrollBehavior: 'smooth',
};

export default function AddLeder({ submitInvoice, allFieldsFilled, open, setOpen, pdfData, initialPdfValue, viewOnly  }: any) {
  const handleClose = () => setOpen(false);
  const [currentDate, setCurrentDate] = useState(new Date())

  const trueValue = true;
  const falseValue = false;
  const [invoiceDetails, setInvoiceDetails] = useState<any>(pdfData);
  const [editPDF, setEditpdf] = useState({...initialPdfValue});

  const handleContactClick = (field: any, value: any) => {
    if(!viewOnly) setEditpdf({ ...editPDF, [field]: value });
  };

  const handleContactChange = (event: any) => {
    setInvoiceDetails({
      ...invoiceDetails,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Modal
      className="boxsize"
      sx={{ backdropFilter: 'blur(4px)' }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          style={{
            backgroundColor: '#f3f3f3',
            color: 'black',
            overflowY: 'auto',
          }}
        >
          <div style={{ height: '30px', backgroundColor: 'tomato' }}></div>
          
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f3f3f3',
              color: '#333f4f',
              padding: '0px 20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  backgroundColor: 'darkgray',
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                LOGO
              </div>
              <div style={{ lineHeight: '4px', marginLeft: '10px' }}>
                <h3>
                  {pdfData?.userName}
                </h3>
                <h3>Address</h3>
                <h3>{pdfData?.email}</h3>
              </div>
            </div>

            <div>
              <h2>INVOICE</h2>
              <h4>DATE: {pdfData?.date}</h4>
              <h4>INVOICE No. {'INC0001'}</h4>
            </div>
          </div>
          <div style={{background: '#ffffff',}}>
          {/* secound box */}
            <div style={{ padding: '10px 25px', }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#333f4f',
                }}
              >
                <div>
                  <h2 style={{ color: '#1f3864' }}>Bill To</h2>
                  <div
                    style={{ height: '3px', backgroundColor: '#bfbfbf' }}
                  ></div>
                  <h3
                    onClick={() => handleContactClick('companyName', trueValue)}
                    style={{ cursor: `${!viewOnly? 'pointer': ''}` }}
                  >
                    {editPDF?.companyName ? (
                      <input
                        type="text"
                        name="companyName"
                        value={invoiceDetails?.companyName}
                        onChange={handleContactChange}
                        onBlur={() =>
                          handleContactClick('companyName', falseValue)
                        }
                      />
                    ) : (
                      invoiceDetails?.companyName || '< Contact Name >'
                    )}
                  </h3>

                  <h3
                    onClick={() => handleContactClick('clientCompanyName', trueValue)}
                    style={{ cursor: `${!viewOnly? 'pointer': ''}` }}
                  >
                    {editPDF?.clientCompanyName ? (
                      <input
                        type="text"
                        name="clientCompanyName"
                        value={invoiceDetails?.clientCompanyName}
                        onChange={handleContactChange}
                        onBlur={() =>
                          handleContactClick('clientCompanyName', falseValue)
                        }
                      />
                    ) : (
                      invoiceDetails?.clientCompanyName ||  '<Client Company Name >'
                    )}
                  </h3>

                  <h3
                    onClick={() => handleContactClick('companyAddress', trueValue)}
                    style={{ cursor: `${!viewOnly? 'pointer': ''}` }}
                  >
                    {editPDF?.companyAddress ? (
                      <input
                        type="text"
                        name="companyAddress"
                        value={invoiceDetails?.companyAddress}
                        onChange={handleContactChange}
                        onBlur={() =>
                          handleContactClick('companyAddress', falseValue)
                        }
                      />
                    ) : (
                      invoiceDetails?.companyAddress ||  '<Address >'
                    )}
                  </h3>

                  <h3
                    onClick={() => handleContactClick('companyContact', trueValue)}
                    style={{ cursor: `${!viewOnly? 'pointer': ''}` }}
                  >
                    {editPDF?.companyContact ? (
                      <input
                        type="text"
                        name="companyContact"
                        value={invoiceDetails?.companyContact}
                        onChange={handleContactChange}
                        onBlur={() =>
                          handleContactClick('companyContact', falseValue)
                        }
                      />
                    ) : (
                      invoiceDetails?.companyContact ||  '<Phone >'
                    )}
                  </h3>


                  <h3
                    onClick={() => handleContactClick('contactDetails', trueValue)}
                    style={{ cursor: `${!viewOnly? 'pointer': ''}` }}
                  >
                    {editPDF?.contactDetails ? (
                      <input
                        type="text"
                        name="contactDetails"
                        value={invoiceDetails?.contactDetails}
                        onChange={handleContactChange}
                        onBlur={() =>
                          handleContactClick('contactDetails', falseValue)
                        }
                      />
                    ) : (
                      invoiceDetails?.contactDetails ||  '<Email >'
                    )}
                  </h3>
                </div>

                <div>
                  <h2 style={{ color: '#1f3864' }}>Ship To</h2>
                  <div
                    style={{ height: '3px', backgroundColor: '#bfbfbf' }}
                  ></div>
                  <h3>
                    &lt;{invoiceDetails?.companyName || '  Name / Dept '}&gt;
                  </h3>
                  <h3>
                    &lt;
                    {invoiceDetails?.clientCompanyName || 'Client Company Name'}
                    &gt;
                  </h3>
                  <h3>
                    {' '}
                    &lt;{invoiceDetails?.companyAddress || ' Address '}&gt;
                  </h3>
                  <h3>&lt;{invoiceDetails?.companyContact || ' phone '}&gt;</h3>
                  <h3>&lt;{invoiceDetails?.contactDetails || '  Email '}&gt;</h3>
                </div>
              </div>
            </div>

          {/* third  */}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '10px ',
                color: '#333f4f',
              }}
            >
               <Typography color={'error'}> {allFieldsFilled === false && `Please fill all fields!`}</Typography>
              <h2 style={{ backgroundColor: 'pink', padding: '2px 10px', height: '37px', textAlign: 'end', borderRadius: '2px' }}>
                ${pdfData.amount}
              </h2>
            </div>
          </div>
          <div style={{ height: '30px', backgroundColor: 'tomato' }}></div>
        </Box>
        
        <Box style={{float: 'right', padding:'5px 10px'}}>
          {!viewOnly && 
            <Button variant="contained" sx={{ color: '#fff', textTransform: 'capitalize', marginRight: '4px'  }} 
              onClick={()=>submitInvoice(invoiceDetails)}>
              Create Invoice
            </Button>}

            <Button variant="outlined" sx={{ borderColor: '#000',color: '#000', textTransform: 'capitalize'}}
             onClick={()=> {setInvoiceDetails(pdfData); setEditpdf(initialPdfValue);setOpen(false)}}>
              Close
            </Button>
          </Box>
      </Box>
    </Modal>
  );
}

