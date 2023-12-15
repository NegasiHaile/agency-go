import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Switch, styled } from '@mui/material';
import { InputWithLabel } from 'renderer/components/Settings/Wallet/Common/ModalComponents';
import { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import './Addleder.css';
import { MyInvoiceContext } from '../../context/context';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 750,
  borderRadius: '10px',
  backgroundColor: 'white', // Changed "bgcolor" to "backgroundColor"
  color: 'black',
  boxShadow: '24px', // Added "px" for the box shadow size
  overflowY: 'auto', // Changed "overflow-y" to "overflowY"
  scrollBehavior: 'smooth',
};

const frequencyFilter = ['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Yearly'];
export default function AddLeder({ open, setOpen, name, viewOnly  }: any) {
  const handleClose = () => setOpen(false);
  const { data } = useContext(MyInvoiceContext);
  const [currentDate, setCurrentDate] = useState(new Date());


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
        `http://localhost:3000/invoicing/create?templateName=template1`,
        options
      );
      const responseData = await response.json();

      // console.log(responseData.data);
if (responseData?.data?.pdfUrl) {
  setOpen(false)
}
      // window.location.href = responseData.data;
      // setpdfURl(responseData.data)
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(()=>{
  //   handlePDF

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
    invoiceNo: 'INC0001',
    address: 'test',

    

    paymentTerms: 'test',
    contactName: 'test',
    amonut:0,
    delivery:true,
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

  useEffect(() => {
    if (!invoicedetails?.unitPrice?.length === null) {
      setInvoiceDeails({
        ...invoicedetails,
        ['total']: invoicedetails?.unitPrice * invoicedetails?.qty,
      });
    }
    const intervalId = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, [invoicedetails?.unitPrice]);

  // right side end
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
          style={{
            backgroundColor: '#f3f3f3',

            color: 'black',
            overflowY: 'auto',
          }}
        >
           <Typography
          style={{
            float: 'right',
            background: '#858585',
            padding: '2px 8px',
            marginBottom: '5px',
            borderRadius: '100%'
          }}
          onClick={handleClose}
          sx={{ cursor: 'pointer' }}
        >
          X
        </Typography>
          <div style={{ height: '30px', backgroundColor: 'tomato' }}></div>
          
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f3f3f3',
              color: '#333f4f',
              padding: '20px',
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
                  {data?.firstName} {data?.lastName}
                </h3>
                <h3>Address</h3>
                <h3>{data?.email}</h3>
              </div>
            </div>

            <div>
              <h2>INVOICE</h2>
              <h4>DATE: {currentDate.toLocaleString()}</h4>
              <h4>INVOICE No. {'INC0001'}</h4>
            </div>
          </div>
            
<div style={{background: '#ffffff',}}>
          {/* secound box */}
          <div style={{ padding: '20px' }}>
            <div
              style={{
                color: 'bfbfbf',
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              &lt;Payment terms due on receipt, due in X days&gt;
            </div>
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
                </h3>
                <h3
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
                </h3>
                <h3
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
                </h3>
                <h3
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
                </h3>
                <h3
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
                </h3>
              </div>

              <div>
                <h2 style={{ color: '#1f3864' }}>Ship To</h2>
                <div
                  style={{ height: '3px', backgroundColor: '#bfbfbf' }}
                ></div>
                <h3>
                  &lt;{invoicedetails?.companyName || '  Name / Dept '}&gt;
                </h3>
                <h3>
                  &lt;
                  {invoicedetails?.clientCompanyName || 'Client Company Name'}
                  &gt;
                </h3>
                <h3>
                  {' '}
                  &lt;{invoicedetails?.companyAddress || ' Address '}&gt;
                </h3>
                <h3>&lt;{invoicedetails?.companyContact || ' phone '}&gt;</h3>
                <h3>&lt;{invoicedetails?.contactDetails || '  Email '}&gt;</h3>
              </div>
            </div>
          </div>

          {/* third  */}

          <div style={{ padding: '20px' }}>
            <table style={{ border: '1' }}>
              <tr style={{ backgroundColor: 'tomato ' }}>
                <th style={{ backgroundColor: 'tomato' }}>DESCRIPTION</th>
                <th style={{ backgroundColor: 'tomato' }}>QTY</th>
                <th style={{ backgroundColor: 'tomato' }}>UNIT PRICE</th>
                <th style={{ backgroundColor: 'tomato' }}>TOTAL</th>
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
              <tr style={{ backgroundColor: 'f3f3f3' }}>
                <td>Item 2</td>
                <td>0</td>
                <td>$0.00</td>
                <td>$0.00</td>
              </tr>
              <tr>
                <td>Item 3</td>
                <td>2</td>
                <td>$0.00</td>
                <td>$0.00</td>
              </tr>
            </table>
          </div>

          {/* fourth */}

          <div
            style={{
              display: 'flex',
              width: '100%',
              padding: ' 20px ',
              color: '#333f4f',
            }}
          >
            <div
              style={{
                width: '60%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              Remarks / Payment Instructions
            </div>
            <div style={{ width: '40%', display: 'flex' }}>
              <div>
                <h3>Subtotal</h3>
                <h3>Subtotal</h3>
                <h3>Subtotal</h3>
                <h3>Subtotal</h3>
                {/* <h2>$ Balance due</h2> */}
              </div>

              <div>
                <h3>_____________0.00</h3>
                <h3>_____________0.00</h3>
                <h3>_____________0.00</h3>
                <h3>_____________0.00</h3>
                <h2 style={{ backgroundColor: 'pink', height: '50px' }}>
                  ${invoicedetails?.qty * invoicedetails?.unitPrice}
                </h2>
              </div>
              <div style={{ height: '4px', backgroundColor: 'black' }}></div>
            </div>
          </div>
  </div>

          <div style={{ height: '30px', backgroundColor: 'tomato' }}></div>
        </div>


<div style={{
            float: 'right',
           padding:'10px 10px'
          }}>

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

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const FrequencySelector = ({ frequencyFilter }: any) => {
  const [selected, setSelected] = useState(1);
  return (
    <Box
      sx={{
        display: 'flex',
        border: '1px solid #04A1FF',
        width: 'fit-content',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      {frequencyFilter.map((data: string, index: number) => (
        <Box
          sx={{
            bgcolor: index + 1 === selected ? '#04A1FF' : 'transparent',
            cursor: 'pointer',
            padding: '8px 10px',
            border: '1px solid #04A1FF',
          }}
          key={index}
          onClick={() => setSelected(index + 1)}
        >
          {data}
        </Box>
      ))}
    </Box>
  );
};
