import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Stack, useTheme } from '@mui/material';
import AlignmentSvg from 'renderer/assets/svg/AlignmentSvg';
import { useContext, useState } from 'react';
import AddLeder from './AddLeder/index';
import ScndPDF from './ScndPDF';
import FourthPDF from './FourthPDF';
import TrdPDF from './TrdPDF';
import { MyInvoiceContext } from '../context/context';
import { agencyCreatorSplit } from 'renderer/utils/invoice';
import { API_URL } from 'config';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  borderRadius: '10px',
  boxShadow: 24,
  p: 2,
};

const initialPdfValue = {
  companyName: false,
  clientCompanyName: false,
  companyAddress: false,
  companyContact: false,
  contactDetails: false,
  description: false,
  qty: false,
  unitPrice: false,
}

export default function CreateInvoiceModal({ open, setOpen }: any) {
  const { data, creatorInvoices, setCreatorInvoices } = useContext(MyInvoiceContext);
  const handleClose = () => setOpen(false);
  const [pdfURL, setpdfURl] = useState('');
  const [viewOnly, setViewOnly] = useState<any>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>('')
  const [allFieldsFilled, setAllFieldsFilled] = useState<boolean | ''>('')

  
  const {agencyShare} = agencyCreatorSplit(data?.currentModalBalance, data?.agencyPer);

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
    total: agencyShare,
    userId: data?._id,
    employeeId: data?._id,
    email: data?.email,
    amount: agencyShare,
    status: true,
    invoiceNo: 'INC0001',
    address: 'test',

    paymentTerms: 'test',
    contactName: 'test',
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
    date: new Date().toLocaleString(),
    addressShipTo: 'test',
    phoneShipTo: 'test',
  };


  const handleViewTemplate = async (name: any) => {
    setSelectedTemplate(name);
    setViewOnly(true);
  };

  const handleCreateInvoice = async (name: any) => {
    setSelectedTemplate(name);
    setViewOnly(false);
  };

  const submitInvoice = async ( invoiceDetails:any) => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(invoiceDetails),
    };
    
    const haveAllInvoiceFieldsValue = !!(invoiceDetails.contactDetails != '' && invoiceDetails.companyName != '' && 
    invoiceDetails.companyAddress!= '' && invoiceDetails.clientCompanyName != ''  && invoiceDetails.companyContact != '')
    setAllFieldsFilled(haveAllInvoiceFieldsValue);
    
    if(haveAllInvoiceFieldsValue === true){
      try {
      const response = await fetch(
        `${API_URL}/invoicing/create?templateName=${selectedTemplate}`,
        options
      );
      const responseData = await response.json();
      const invoices = [...creatorInvoices]
      invoices.push(responseData?.data?.invoicing);
      setCreatorInvoices([...invoices])
      console.log(responseData.data);
      if (responseData?.data?.pdfUrl) {
        setOpen(false)
      }
      // window.location.href = responseData.data;
    } catch (error) {
      console.log(error);
    }
    }else{
      // alert("Please fill all the fields!")
    }
  };

  const invoiceTemplates = [
    {
      id: 1,
      icon: true,
      title: 'Invoice Template 1',
      name: 'template1',
      pdf: 'true',
    },
    {
      id: 2,
      icon: true,
      title: 'Invoice Template 2',
      name: 'template2',
      pdf: 'true',
    },
    {
      id: 3,
      icon: true,
      title: 'Invoice Template 3',
      name: 'template3',
      pdf: 'true',
    },
    {
      id: 4,
      icon: true,
      title: 'Invoice Template 4',
      name: 'template4',
      pdf: 'true',
    },
    // {
    //   id: 5,
    //   icon: true,
    //   title: 'Invoice Template 5',
    //   name: 'template5',
    //   pdf: 'true',
    // },
  ];

   const theme = useTheme();
   const isDarkTheme = theme.palette.mode === 'dark';



  return (
    <>
      <Modal
        sx={{ backdropFilter: 'blur(4px)', }}
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} bgcolor={isDarkTheme ? '#111' : '#fff'}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '10px 0px',
            }}
          >
            <Typography> Create Invoiceee </Typography>
            <Typography onClick={handleClose} sx={{ cursor: 'pointer', padding: '2px 8px', borderRadius: '100%' }}>
              X
            </Typography>
          </Box>
          <Divider sx={{ bgcolor: '#292929' }} />
          <Typography margin={'12px 0px'}>
            Pick a template or create an invoice from scratch
          </Typography>
          <Box
            display={'flex'}
            justifyContent={'center'}
            flexWrap={'wrap'}
            gap={'10px'}
          >
            {invoiceTemplates.map((template) => (
              <Box>
                <Stack
                  key={template.id}
                  width={'100%'}
                  borderRadius="8px"
                  gap="15px"
                  sx={{
                    border: `1px solid ${theme.palette.primary.contrastText}`,
                    bgcolor: isDarkTheme ? '#121212' : '#EAF1FF',
                  }}
                >
                  <Box
                    style={{
                      padding: '10px 20px',
                    }}
                  >
                    <Box
                      margin={'10px 0px 20px'}
                      sx={{ visibility: template.icon ? 'visible' : 'hidden' }}
                    >
                      <AlignmentSvg />
                    </Box>
                    <Typography>{template.title}</Typography>
                  </Box>
                </Stack>

                <Box
                    sx={{ marginTop: '3px', padding: '0px', display: 'flex', justifyContent: 'space-between'}}
                    fontSize={'small'}
                  >
                    <Button size="small" sx={{fontSize: '12px'}} onClick={()=>handleViewTemplate(template.name)}> View </Button>
                    <Button size="small"  sx={{fontSize: '12px'}} onClick={()=>handleCreateInvoice(template.name)}> Create Invoice </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
      <AddLeder submitInvoice={submitInvoice} allFieldsFilled={allFieldsFilled} open={selectedTemplate === 'template1'} setOpen={setSelectedTemplate} pdfData={pdfData} initialPdfValue={initialPdfValue} viewOnly={viewOnly} />
      <ScndPDF submitInvoice={submitInvoice} allFieldsFilled={allFieldsFilled} open={selectedTemplate === 'template2'} setOpen={setSelectedTemplate} pdfData={pdfData} initialPdfValue={initialPdfValue} viewOnly={viewOnly}  />
      <TrdPDF submitInvoice={submitInvoice} allFieldsFilled={allFieldsFilled} open={selectedTemplate === 'template3'} setOpen={setSelectedTemplate} pdfData={pdfData} initialPdfValue={initialPdfValue} viewOnly={viewOnly} />
      <FourthPDF submitInvoice={submitInvoice} allFieldsFilled={allFieldsFilled} open={selectedTemplate === 'template4'} setOpen={setSelectedTemplate} pdfData={pdfData} initialPdfValue={initialPdfValue} viewOnly={viewOnly} />
    </>
  );
}