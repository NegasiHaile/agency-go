import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useContext, useState } from 'react';
import { MyInvoiceContext } from '../../context/context';
// import './ScndPDF.css';

const style = {
  position: 'absolute',
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

export default function ScndPDF({ open, setOpen, name, viewOnly }: any) {
  const handleClose = () => setOpen(false);

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
        <div
          className="main_boxx"
          style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '20px',
            boxSizing: 'border-box',
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <Typography
            style={{
              float: 'right',
              background: '#858585',
              padding: '2px 8px',
              marginBottom: '5px',
              borderRadius: '100%',
              textAlign: 'center'
            }}
            onClick={handleClose}
            sx={{ cursor: 'pointer' }}
          >
            X
          </Typography>
          {/* First box */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div
              className=""
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                className=""
                style={{
                  width: '70px',
                  height: '70px',
                  backgroundColor: '#576474',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '5px',
                }}
              >
                LOGO
              </div>
              <div
                className=""
                style={{
                  lineHeight: '4px',
                  backgroundColor: '#f1f4ff',
                  marginLeft: '10px',
                }}
              >
                <h3>
                  {data?.firstName} {data?.lastName}
                </h3>
                <p>Address</p>
                <p>{data?.email}</p>
              </div>
            </div>
            <div className="">
              <div
                className=""
                style={{ lineHeight: '4px', backgroundColor: '#f1f4ff' }}
              >
                <h3>Invoice#00000</h3>
                <p>issue date</p>
                <p>mm/dd/yyyy</p>
              </div>
            </div>
          </div>

          <div
            style={{
              margin: '20px 0px',
              height: '10px',
              backgroundColor: '#576474',
              boxSizing: 'border-box',
            }}
          ></div>

          <div>
            <h1
              style={{
                backgroundColor: '#f1f4ff',
                color: '#576474',
                padding: '10px 0px',
              }}
            >
              Business Name
            </h1>
            <h5
              style={{
                backgroundColor: '#f1f4ff',
                color: '#576474',
                padding: '10px 0px',
              }}
            >
              Add a message her for your customer
            </h5>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ lineHeight: '4px' }}>
              <div
                style={{
                  height: '5px',
                  backgroundColor: '#576474',
                  borderRadius: '2px',
                }}
              ></div>
              <h3 style={{ color: '#576474' }}>Bill To </h3>
              <h5
                onClick={() => handleContactClick('companyName', truevalue)}
                style={{ cursor: 'pointer', color: '#576474' }}
              >
                {editpdf?.companyName ? (
                  <input
                    type="text"
                    name="companyName"
                    value={invoicedetails?.companyName}
                    onChange={handleContactChange}
                    onBlur={() => handleContactClick('companyName', falsevalue)}
                  />
                ) : (
                  invoicedetails?.companyName || '< Contact Name >'
                )}
              </h5>
              <h5
                onClick={() =>
                  handleContactClick('clientCompanyName', truevalue)
                }
                style={{ cursor: 'pointer', color: '#576474' }}
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
                  invoicedetails?.clientCompanyName || '<Client Company Name >'
                )}
              </h5>
              <h5
                onClick={() => handleContactClick('companyAddress', truevalue)}
                style={{ cursor: 'pointer', color: '#576474' }}
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
              </h5>
              <h5
                onClick={() => handleContactClick('companyContact', truevalue)}
                style={{ cursor: 'pointer', color: '#576474' }}
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
              </h5>
              <h5
                onClick={() => handleContactClick('contactDetails', truevalue)}
                style={{ cursor: 'pointer', color: '#576474' }}
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
              </h5>
            </div>

            <div style={{ lineHeight: '4px' }}>
              <div
                style={{
                  height: '5px',
                  backgroundColor: '#576474',
                  borderRadius: '2px',
                }}
              ></div>
              <h3 style={{ color: '#576474' }}> Details </h3>

              <h4 style={{ color: '#576474' }}>Customer Name</h4>
              <h5 style={{ color: '#576474' }}>
                &lt;{invoicedetails?.companyName || '  Name / Dept '}&gt;
              </h5>
              <h5 style={{ color: '#576474' }}>
                &lt;
                {invoicedetails?.clientCompanyName || 'Client Company Name'}
                &gt;
              </h5>
              <h5 style={{ color: '#576474' }}>
                {' '}
                &lt;{invoicedetails?.companyAddress || ' Address '}&gt;
              </h5>
              <h5 style={{ color: '#576474' }}>
                &lt;{invoicedetails?.companyContact || ' phone '}&gt;
              </h5>
              <h5 style={{ color: '#576474' }}>
                &lt;{invoicedetails?.contactDetails || '  Email '}&gt;
              </h5>
            </div>

            <div style={{ lineHeight: '4px' }}>
              <div
                style={{
                  height: '5px',
                  backgroundColor: '#576474',
                  borderRadius: '2px',
                }}
              ></div>
              <h3 style={{ color: '#576474' }}>Payment</h3>

              <h5 style={{ color: '#576474' }}>
                &lt;{invoicedetails?.companyName || '  Name / Dept '}&gt;
              </h5>
              <h5 style={{ color: '#576474' }}>
                &lt;
                {invoicedetails?.clientCompanyName || 'Client Company Name'}
                &gt;
              </h5>
              <h5 style={{ color: '#576474' }}>
                {' '}
                &lt;{invoicedetails?.companyAddress || ' Address '}&gt;
              </h5>
              <h5 style={{ color: '#576474' }}>
                &lt;{invoicedetails?.companyContact || ' phone '}&gt;
              </h5>
              <h5 style={{ color: '#576474' }}>
                &lt;{invoicedetails?.contactDetails || '  Email '}&gt;
              </h5>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '100%', display: 'flex' }}>
              <div style={{ width: '60%' }}>ITM</div>
              <div style={{ width: '10%' }}>QTY</div>
              <div style={{ width: '10%' }}>PRICE</div>
              <div style={{ width: '10%' }}>AMOUNT</div>
            </div>

            <div style={{ width: '100%', display: 'flex', margin: '20px 0px' }}>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
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
              </div>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
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
              </div>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
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
                      onBlur={() => handleContactClick('unitPrice', falsevalue)}
                    />
                  ) : (
                    invoicedetails?.unitPrice || '0'
                  )}
                </p>
              </div>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
                ${invoicedetails?.qty * invoicedetails?.unitPrice}
              </div>
            </div>

            <div style={{ width: '100%', display: 'flex', margin: '20px 0px' }}>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
                Item name
              </div>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
                0
              </div>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
                $0.00
              </div>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
                $0.00
              </div>
            </div>

            <div style={{ width: '100%', display: 'flex', margin: '20px 0px' }}>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
                Item name
              </div>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
                0
              </div>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
                $0.00
              </div>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
                $0.00
              </div>
            </div>

            <div style={{ width: '100%', display: 'flex', margin: '20px 0px' }}>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
                Item name
              </div>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
                0
              </div>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
                $0.00
              </div>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
                $0.00
              </div>
            </div>

            <div style={{ width: '100%', display: 'flex', marginTop: '20px' }}>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
                subtotal
              </div>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
                0
              </div>
            </div>

            <div
              style={{
                width: '100%',
                display: 'flex',
                marginTop: '20px',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ width: '60%', padding: '10px', color: 'black' }}>
                subtotal
              </div>
              <div
                style={{
                  width: '60%',
                  backgroundColor: '#f1f4ff',
                  padding: '10px',
                }}
              >
                0
              </div>
            </div>
          </div>

          {/* <div>
            <div className="Business-name">
              <h1>Business Name</h1>
            </div>
            <div className="Business-p">
              <p>add address Lorem ipsum dolor sit amet.</p>
            </div>
          </div> */}

          {/* <div className="billing-div-main">
            <div className="sub-billing-div-main">
              <p style={{ padding: '50px 0px 0px 0px', marginLeft: '10px', borderTop: '3px solid #8080805c' }}>
                BILL TO
              </p>
              <div className="companyName">
                <p style={{ margin: '1px 0px' }}>Your Company Name</p>
                <p style={{ margin: '1px 0px' }}>email address</p>
                <p style={{ margin: '1px 0px' }}>phone number</p>
                <p style={{ margin: '1px 0px' }}>Street address</p>
                <p style={{ margin: '1px 0px' }}>country/code</p>
              </div>
            </div>
            <div className="sub-billing-div-main">
              <p style={{ padding: '50px 0px 0px 0px', marginLeft: '10px', borderTop: '3px solid #8080805c' }}>
                DETAILS
              </p>
              <div className="companyName">
                <p style={{ margin: '1px 0px' }}>Your Company Name</p>
                <p style={{ margin: '1px 0px' }}>Your address</p>
                <p style={{ margin: '1px 0px' }}>Your contact details</p>
              </div>
            </div>
            <div className="sub-billing-div-main">
              <p style={{ padding: '50px 0px 0px 0px', marginLeft: '10px', borderTop: '3px solid #8080805c' }}>
                PAYMENT
              </p>
              <div className="companyName">
                <p style={{ margin: '1px 0px' }}>Your Company Name</p>
                <p style={{ margin: '1px 0px' }}>Your address</p>
              </div>
            </div>
          </div> */}

          {/* 3 boxes */}

          <div>{/* Additional content if needed */}</div>

          {viewOnly? 
                <Button
                variant="outlined"
              sx={{ borderColor: '#000',color: '#000', textTransform: 'capitalize' }}
              onClick={()=> {setOpen(false)}}
            >
              close
            </Button>:<Button
            variant="contained"
            sx={{ color: '#fff', textTransform: 'capitalize' }}
            onClick={handlePDF}
          >
            Create Invoice
          </Button>}
        </div>
      </Box>
    </Modal>
  );
}
