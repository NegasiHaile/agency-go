import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useContext, useState } from 'react';
import './TrdPDF.css';
import { Button, Typography, colors } from '@mui/material';
import { MyInvoiceContext } from '../../context/context';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 600,
  borderRadius: '10px',
  bgcolor: '#121212',
  color: '#fff',
  boxShadow: 24,
};

export default function TrdPDF({ open, setOpen, name, viewOnly }: any) {
  const [editDescription, setEditDescription] = useState(false);
  const [editDate, setEditDate] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');

  const [editaddress, setEditAddress] = useState(false);
  const [newAddress, setnewAdress] = useState('');
  const { data } = useContext(MyInvoiceContext);

  const pdfData = {
    userName: data?.firstName,
    companyName: '',
    clientCompanyName: '',
    companyAddress: '',
    companyContact: '',
    contactDetails: '',
    description: '',
    qty: 11,
    unitPrice: 12.11,
    total: 0,
    userId: data?._id,
    employeeId: data?._id,
    email: data?.email,
    amount: 0,
    status: true,
    address: 'test',
    invoiceNo: 'INC0001',
    paymentTerms: 'test',
    contactName: 'test',
    nameDept: 'test',
    addresss: 'test',
    phone: 'test',
    invoiceTitle: 'test',
    paymentInstructions: 'test',
    subtotal: 0,
    discount: 0,
    subtotalLessDiscount: 0,
    taxRate: 'test',
    totalTax: 0,
    shippingHandling: 0,
    balanceDue: '$25310',
    date: '2023-11-06',
    addressShipTo: 'test',
    phoneShipTo: 'test',
  };
  // },[name])
  const truevalue = true;
  const falsevalue = false;

  const [invoicedetails, setInvoiceDeails] = useState<any>(pdfData);

  const [editpdf, setEditpdf] = useState({
    companyName: false,
    clientCompanyName: false,
    companyAddress: false,
    companyContact: false,
    contactDetails: false,
    description: false,
    qty: false,
    unitPrice: false,
  });

  const handleContactClick = (field: any, value: any) => {
    if(!viewOnly) setEditpdf({ ...editpdf, [field]: value });
  };

  const handleContactChange = (event: any) => {
    console.log(invoicedetails);

    setInvoiceDeails({
      ...invoicedetails,
      [event.target.name]: event.target.value,
    });
    // console.log(invoicedetails, '===>>invoice data');
  };

  const handlePDF = async () => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(invoicedetails),
    };

    try {
      const response = await fetch(
        `http://localhost:3000/invoicing/create?templateName=template3`,
        options
      );
      const responseData = await response.json();

      console.log(responseData.data);

      window.location.href = responseData.data;
      // setpdfURl(responseData.data)
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setEditDescription(false);
    setEditDate(false);
    setOpen(false);
  };

  const handleDescriptionClick = () => {
    setEditDescription(true);
  };

  const handleDescriptionChange = (event: any) => {
    setNewDescription(event.target.value);
  };

  const handleDateClick = () => {
    setEditDate(true);
  };

  const handleDateChange = (event: any) => {
    setNewDate(event.target.value);
  };

  //   address

  const handleAddressClick = () => {
    setEditAddress(true);
  };

  const handleAddressChange = (event: any) => {
    setnewAdress(event.target.value);
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
        <Typography
          style={{
            float: 'right',
            background: '#333',
            padding: '8px',
            borderRadius: '100%'
          }}
          onClick={handleClose}
          sx={{ cursor: 'pointer' }}
        >
          X
        </Typography>
        <div className="main-divv">
          <div className="header-div">
            <h2>ALDENAIRE & PARTNERS</h2>
          </div>
          <div className="d-flex justify-content-center pt-19">
            <div className="invoice">
              <h1>
                <span
                  style={{
                    textAlign: 'center',
                    fontSize: '150px',
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
                    style={{ cursor: 'pointer' }}
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
                    onClick={() =>
                      handleContactClick('companyContact', truevalue)
                    }
                    style={{ cursor: 'pointer' }}
                  >
                    {editpdf?.companyContact ? (
                      <input
                        type="text"
                        name="companyContact"
                        value={invoicedetails?.companyContact}
                        onChange={handleContactChange}
                        onBlur={() => () =>
                          handleContactClick('companyContact', falsevalue)}
                      />
                    ) : (
                      invoicedetails?.companyContact || '<Phone >'
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="new-item">
              <div className="d-flex" style={{ marginTop: '15px' }}>
                <div className="new-item-sub">
                  <h4 style={{ margin: '0px 0px' }}>DATE:</h4>
                </div>
                <div className="new-item-75">
                  <p onClick={handleDateClick} style={{ cursor: 'pointer' }}>
                    {editDate ? (
                      <input
                        type="text"
                        value={newDate}
                        onChange={handleDateChange}
                        onBlur={() => setEditDate(false)}
                      />
                    ) : (
                      newDate || '23/01/2000'
                    )}
                  </p>
                </div>
                <div className="new-item-sub">
                  <h4 style={{ margin: '0px 0px' }}>NUMBER:</h4>
                </div>
                <div className="new-item-75">
                  <p style={{ margin: '0px 0px' }}>000010</p>
                </div>
                <div className="new-item-sub">
                  <h4 style={{ margin: '0px 0px' }}>DUE:</h4>
                </div>
                <div className="new-item-75">
                  <p style={{ margin: '0px 0px' }}>January 31, 2021</p>
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
                    style={{ cursor: 'pointer' }}
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
                    onClick={() =>
                      handleContactClick('companyAddress', truevalue)
                    }
                    style={{ cursor: 'pointer' }}
                  >
                    {editpdf?.companyAddress ? (
                      <input
                        type="text"
                        name="companyAddress"
                        value={invoicedetails?.companyAddress}
                        onChange={handleContactChange}
                        onBlur={() => () =>
                          handleContactClick('companyAddress', falsevalue)}
                      />
                    ) : (
                      invoicedetails?.companyAddress || '<Address >'
                    )}
                  </p>
                  <p
                    onClick={() =>
                      handleContactClick('contactDetails', truevalue)
                    }
                    style={{ cursor: 'pointer' }}
                  >
                    {editpdf?.contactDetails ? (
                      <input
                        type="text"
                        name="contactDetails"
                        value={invoicedetails?.contactDetails}
                        onChange={handleContactChange}
                        onBlur={() => () =>
                          handleContactClick('contactDetails', falsevalue)}
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
                style={{ justifyContent: 'center', backgroundColor: 'gray' }}
              >
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <h2 style={{ color: '#ffff' }}>TOTAL DUE:</h2>
                </div>
                <div
                  style={{
                    backgroundColor: 'rgb(255, 255, 255)',
                    padding: '0px 86px',
                    borderBottom: '10px gray solid',
                  }}
                >
                  <h1 style={{ color: 'gray' }}>$26.26</h1>
                </div>
              </div>
            </div>

            <table style={{ width: '100%' }}>
              <tr>
                <th onClick={handleDescriptionClick}>DESCRIPTION</th>
                <th>PRICE</th>
                <th>QTY</th>
                <th>TOTAL</th>
              </tr>
              <tr>
                <td>
                  <p
                    onClick={() => handleContactClick('description', truevalue)}
                    style={{ cursor: 'pointer' }}
                  >
                    {editpdf.description ? (
                      <input
                        type="text"
                        name="description"
                        value={invoicedetails?.description}
                        onChange={handleContactChange}
                        onBlur={() =>
                          handleContactClick('description', falsevalue)
                        }
                      />
                    ) : (
                      invoicedetails?.description || 'Item 1'
                    )}
                  </p>
                </td>
                <td>
                  <p
                    onClick={() => handleContactClick('qty', truevalue)}
                    style={{ cursor: 'pointer' }}
                  >
                    {editpdf.qty ? (
                      <input
                        type="number"
                        name="qty"
                        value={invoicedetails?.qty}
                        onChange={handleContactChange}
                        onBlur={() => handleContactClick('qty', falsevalue)}
                      />
                    ) : (
                      invoicedetails?.qty || '0'
                    )}
                  </p>
                </td>
                <td>
                  <p
                    onClick={() => handleContactClick('unitPrice', truevalue)}
                    style={{ cursor: 'pointer' }}
                  >
                    $
                    {editpdf.unitPrice ? (
                      <input
                        type="number"
                        name="unitPrice"
                        value={invoicedetails?.unitPrice}
                        onChange={handleContactChange}
                        onBlur={() =>
                          handleContactClick('unitPrice', falsevalue)
                        }
                      />
                    ) : (
                      invoicedetails?.unitPrice || '0'
                    )}
                  </p>
                </td>
                <td>${invoicedetails?.qty * invoicedetails?.unitPrice}</td>
              </tr>
              <tr>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
              <tr>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
              <tr>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
              <tr>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
              <tr>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
              <tr>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
            </table>

            <div className="width-70"></div>
            <div className="width-30">
              <div className="d-flex" style={{ marginTop: '15px' }}>
                <div className="new-item-sub">
                  <h4 style={{ fontWeight: 'lighter' }}>SUBTOTAL:</h4>
                </div>
                <div className="new-item-75"></div>
                <div className="new-item-sub">
                  <h4 style={{ fontWeight: 'lighter' }}>TAX:</h4>
                </div>
                <div className="new-item-75"></div>
                <div className="new-item-sub">
                  <h4 style={{ fontWeight: 'lighter' }}>SHIPPING:</h4>
                </div>
                <div className="new-item-75"></div>
                <div className="new-item-sub">
                  <h4 style={{ fontWeight: 'bold' }}>TOTAL:</h4>
                </div>
                <div className="new-item-75"></div>
                {viewOnly? 
                <Button
                variant="outlined"
              sx={{ borderColor: '#fff',color: '#fff', textTransform: 'capitalize' }}
              onClick={()=> {setOpen(false)}}
            >
              close
            </Button>: 
                <Button
                  variant="contained"
                  sx={{
                    color: '#fff',
                    textTransform: 'capitalize',
                    float: 'right',
                  }}
                  onClick={handlePDF}
                >
                  Create Invoice
                </Button>}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
