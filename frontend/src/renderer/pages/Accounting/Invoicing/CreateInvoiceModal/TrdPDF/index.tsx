import {useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './TrdPDF.css';
import { Button, Typography} from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 650,
  borderRadius: '10px',
  bgcolor: '#121212',
  color: '#fff',
  boxShadow: 24,
};

export default function TrdPDF({ submitInvoice, allFieldsFilled, open, setOpen, pdfData, initialPdfValue, viewOnly }: any) {
  const [editDate, setEditDate] = useState(false);
  const [newDate, setNewDate] = useState(pdfData?.date);

  const truevalue = true;
  const falsevalue = false;
  const [invoicedetails, setInvoiceDetails] = useState<any>(pdfData);
  const [editpdf, setEditpdf] = useState({...initialPdfValue });

  const handleContactClick = (field: any, value: any) => {
    if(!viewOnly) setEditpdf({ ...editpdf, [field]: value });
  };

  const handleContactChange = (event: any) => {
    setInvoiceDetails({
      ...invoicedetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => {
    setEditDate(false);
    setOpen(false);
  };

  const handleDateClick = () => {
    setEditDate(true);
  };

  const handleDateChange = (event: any) => {
    setNewDate(event.target.value);
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
        <div className="main-div">
          <div className="d-flex justify-content-center pt-19">
            <div className="invoice">
              <h1>
                <span
                  style={{
                    textAlign: 'center',
                    fontSize: '130px',
                    fontWeight: 'lighter',
                    margin: '0px 0px',
                    fontFamily: 'Caveat, cursive',
                  }}
                >
                  I
                </span>
                NVOICE
              </h1>
            </div>
          </div>

          <div className="d-flex">
            <div className="new-item">
              <div className="d-flex">
                <div className="new-item-sub">
                  <h6>FROM:</h6>
                </div>
                <div className="new-item">
                  <p
                    onClick={() => handleContactClick('companyName', truevalue)}
                    style={{ cursor: `${!viewOnly? 'pointer': ''}` }}
                  >
                    {editpdf?.companyName ? (
                      <input
                        type="text"
                        name="companyName"
                        value={invoicedetails?.companyName}
                        onChange={handleContactChange}
                        onBlur={() =>
                          handleContactClick('companyName', falsevalue)
                        }
                      />
                    ) : (
                      invoicedetails?.companyName || '< Contact Name >'
                    )}
                  </p>
                  <p
                    onClick={() => handleContactClick('companyContact', truevalue)}
                    style={{ cursor: `${!viewOnly? 'pointer': ''}` }}
                  >
                    {editpdf?.companyContact ? (
                      <input
                        type="text"
                        name="companyContact"
                        value={invoicedetails?.companyContact}
                        onChange={handleContactChange}
                        onBlur={() =>
                          handleContactClick('companyContact', falsevalue)
                        }
                      />
                    ) : (
                      invoicedetails?.companyContact || '<Phone >'
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="new-item">
              <div className="d-flex" style={{ marginTop: '15px', alignItems: 'center' }}>
                <div className="new-item-sub">
                  <h4 style={{ margin: '0px 0px' }}>DATE:</h4>
                </div>
                <div className="new-item-75">
                  <p onClick={handleDateClick} style={{ cursor: `${!viewOnly? 'pointer': ''}` }}>
                    {editDate ? (
                      <input
                        type="text"
                        value={newDate}
                        onChange={handleDateChange}
                        onBlur={() => setEditDate(false)}
                      />
                    ) : (
                      newDate || pdfData?.date
                    )}
                  </p>
                </div>
                <div style={{display: 'flex', gap: '5px'}}>
                  <h4 style={{ margin: '0px 0px' }}>INVOICE No:</h4>
                  <p style={{ margin: '0px 0px' }}>{pdfData?.invoiceNo}</p>
                </div>
              </div>
            </div>

            <div className="new-item">
              <div className="d-flex">
                <div className="new-item-sub">
                  <h6>Company Name:</h6>
                </div>
                <div className="new-item">
                  <p
                    onClick={() =>
                      handleContactClick('clientCompanyName', truevalue)
                    }
                    style={{ cursor: `${!viewOnly? 'pointer': ''}` }}
                  >
                    {editpdf?.clientCompanyName ? (
                      <input
                        type="text"
                        name="clientCompanyName"
                        value={invoicedetails?.clientCompanyName}
                        onChange={handleContactChange}
                        onBlur={() =>
                          handleContactClick('clientCompanyName', falsevalue)
                        }
                      />
                    ) : (
                      invoicedetails?.clientCompanyName ||
                      '<Client Company Name >'
                    )}
                  </p>

                  <p
                    onClick={() => handleContactClick('companyAddress', truevalue)}
                    style={{ cursor: `${!viewOnly? 'pointer': ''}` }}
                  >
                    {editpdf?.companyAddress ? (
                      <input
                        type="text"
                        name="companyAddress"
                        value={invoicedetails?.companyAddress}
                        onChange={handleContactChange}
                        onBlur={() =>
                          handleContactClick('companyAddress', falsevalue)
                        }
                      />
                    ) : (
                      invoicedetails?.companyAddress || '<Address >'
                    )}
                  </p>

                  <p
                    onClick={() => handleContactClick('contactDetails', truevalue)}
                    style={{ cursor: `${!viewOnly? 'pointer': ''}` }}
                  >
                    {editpdf?.contactDetails ? (
                      <input
                        type="text"
                        name="contactDetails"
                        value={invoicedetails?.contactDetails}
                        onChange={handleContactChange}
                        onBlur={() =>
                          handleContactClick('contactDetails', falsevalue)
                        }
                      />
                    ) : (
                      invoicedetails?.contactDetails || '<Email >'
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="new-item">
              <div
                className="d-flex"
                style={{ justifyContent: 'center', backgroundColor: 'gray', borderRadius: '2px' }}
              >
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <h2 style={{ color: '#ffff', }}>TOTAL DUE:</h2>
                </div>
                <div
                  style={{
                    backgroundColor: 'rgb(255, 255, 255)',
                    padding: '0px 86px',
                    borderBottom: '10px gray solid',
                    borderRadius: '2px'
                  }}
                >
                  <h1 style={{ color: 'gray' }}>${pdfData?.total}</h1>
                </div>
              </div>
            </div>
            <Typography color={'error'} height={'5px'}> {allFieldsFilled === false && `Please fill all fields!`}</Typography>
          </div>

          <Box sx={{ width: '100%', display: 'flex', padding: '5px', justifyContent: 'end', gap: '4px'}}>
          {!viewOnly &&<Button
            variant="contained"
            sx={{ color: '#fff', textTransform: 'capitalize' }}
            onClick={()=>submitInvoice(invoicedetails)}
          >
            Create Invoice
          </Button>}
                <Button
                variant="outlined"
              sx={{ borderColor: '#fff',color: '#fff', textTransform: 'capitalize' }}
              onClick={()=> {setInvoiceDetails(pdfData); setEditpdf(initialPdfValue); setOpen(false); }}>
            
              close
            </Button> 
          </Box>
        </div>
      </Box>
    </Modal>
  );
}
