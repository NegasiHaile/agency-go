import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Switch, styled } from '@mui/material';
import { InputWithLabel } from 'renderer/components/Settings/Wallet/Common/ModalComponents';
import { useState } from 'react';
import { useFormik } from 'formik';
import './Addleder.css';
import { API_URL } from 'config';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 570,
  borderRadius: '10px',
  bgcolor: '#121212',
  color: '#fff',
  boxShadow: 24,
};
const frequencyFilter = ['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Yearly'];
export default function AddLeder({ open, setOpen, userData }: any) {
  const handleClose = () => setOpen(false);

  const initialValues = {
    name: `${userData?.firstName} ${userData?.lastName}`,
    amount: 30,
    description: 'string',
    employeeId: userData?._id,
    status: 'true',
    userId: userData?._id,
    date: new Date(),
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      console.log(values);
      await handleCreateInvoice(values);
      handleClose();
    },
  });

  const handleCreateInvoice = async (value: any) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    };
    try {
      const response = await fetch(`${API_URL}/invoicing`, options);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Failed to create the invoice');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (name: any) => {
    console.log(name);
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
      <form onSubmit={handleSubmit}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontSize: '40px', padding: '10px' }}>
              {' '}
              Add Ledger{' '}
            </Typography>
            {/* <Typography onClick={handleClose} sx={{ cursor: 'pointer' }}>
            X
          </Typography> */}
          </Box>
          <div
            className="bvb"
            style={{
              boxSizing: 'border-box',
              backgroundColor: '#625f5f',
              padding: '30px',
            }}
          >
            <div
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <label
                  style={{
                    boxSizing: 'border-box',
                    color: 'white',
                    paddingBottom: '8px',
                  }}
                >
                  Date
                </label>
                <input
                  style={{
                    boxSizing: 'border-box',
                    backgroundColor: '#292929',
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                  }}
                  type="text"
                  placeholder="Select date"
                />
              </div>
              <div
                className="bvb"
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <label
                  style={{
                    boxSizing: 'border-box',
                    color: 'white',
                    paddingBottom: '8px',
                  }}
                >
                  Category
                </label>
                <input
                  style={{
                    boxSizing: 'border-box',
                    backgroundColor: '#292929',
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                  }}
                  type="text"
                  placeholder="Select category"
                />
              </div>
            </div>

            <div
              className="bvb"
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '15px',
              }}
            >
              <label
                style={{
                  boxSizing: 'border-box',
                  color: 'white',
                  paddingBottom: '8px',
                }}
              >
                Description
              </label>
              <input
                style={{
                  boxSizing: 'border-box',
                  backgroundColor: '#292929',
                  padding: '10px',
                  width: '100%',
                  height: '76px',
                  borderRadius: '5px',
                }}
                type="text"
              />
            </div>

            <div
              className="bvb"
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '15px',
              }}
            >
              <label
                style={{
                  boxSizing: 'border-box',
                  color: 'white',
                  paddingBottom: '8px',
                }}
              >
                Reference
              </label>
              <input
                style={{
                  boxSizing: 'border-box',
                  backgroundColor: '#292929',
                  padding: '10px',
                  width: '100%',
                  height: '41px',
                  borderRadius: '5px',
                }}
                type="text"
              />
            </div>

            <div
              className="bvb"
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '15px',
              }}
            >
              <div>
                <p>Recurring</p>
              </div>
              <div
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  width: '100%',
                  flexDirection: 'column',
                  backgroundColor: '#292929',
                  padding: '16px',
                }}
              >
                <div
                  style={{
                    boxSizing: 'border-box',
                    width: '100%',
                    height: 24,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      boxSizing: 'border-box',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      gap: 2,
                      display: 'inline-flex',
                    }}
                  >
                    <div
                      style={{
                        boxSizing: 'border-box',
                        alignSelf: 'stretch',
                        color: 'white',
                        fontSize: 14,
                        fontFamily: 'Inter',
                        fontWeight: '400',
                        lineHeight: 24,
                        wordWrap: 'break-word',
                      }}
                    >
                      Frequency daily
                    </div>
                  </div>
                  <div
                    style={{
                      boxSizing: 'border-box',
                      width: 22,
                      height: 14,
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        boxSizing: 'border-box',
                        width: 20,
                        height: 12,
                        left: 0,
                        top: 1,
                        position: 'absolute',
                        background: 'rgba(255, 255, 255, 0.60)',
                        borderRadius: 12,
                      }}
                    />
                    <div
                      style={{
                        boxSizing: 'border-box',
                        width: 14,
                        height: 14,
                        left: 8,
                        top: 0,
                        position: 'absolute',
                        background: '#04A1FF',
                        borderRadius: 12,
                        border: '2px rgba(255, 255, 255, 0.90) solid',
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    boxSizing: 'border-box',
                    width: '100%',
                    height: 24,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      boxSizing: 'border-box',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      gap: 2,
                      display: 'inline-flex',
                    }}
                  >
                    <div
                      style={{
                        boxSizing: 'border-box',
                        alignSelf: 'stretch',
                        color: 'white',
                        fontSize: 14,
                        fontFamily: 'Inter',
                        fontWeight: '400',
                        lineHeight: 24,
                        wordWrap: 'break-word',
                      }}
                    >
                      Weekly
                    </div>
                  </div>
                  <div
                    style={{
                      boxSizing: 'border-box',
                      width: 22,
                      height: 14,
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        boxSizing: 'border-box',
                        width: 20,
                        height: 12,
                        left: 0,
                        top: 1,
                        position: 'absolute',
                        background: 'rgba(255, 255, 255, 0.60)',
                        borderRadius: 12,
                      }}
                    />
                    <div
                      style={{
                        boxSizing: 'border-box',
                        width: 14,
                        height: 14,
                        left: 8,
                        top: 0,
                        position: 'absolute',
                        background: '#04A1FF',
                        borderRadius: 12,
                        border: '2px rgba(255, 255, 255, 0.90) solid',
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    boxSizing: 'border-box',
                    width: '100%',
                    height: 24,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      boxSizing: 'border-box',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      gap: 2,
                      display: 'inline-flex',
                    }}
                  >
                    <div
                      style={{
                        boxSizing: 'border-box',
                        alignSelf: 'stretch',
                        color: 'white',
                        fontSize: 14,
                        fontFamily: 'Inter',
                        fontWeight: '400',
                        lineHeight: 24,
                        wordWrap: 'break-word',
                      }}
                    >
                      Biweekly
                    </div>
                  </div>
                  <div
                    style={{
                      boxSizing: 'border-box',
                      width: 22,
                      height: 14,
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        boxSizing: 'border-box',
                        width: 20,
                        height: 12,
                        left: 0,
                        top: 1,
                        position: 'absolute',
                        background: 'rgba(255, 255, 255, 0.60)',
                        borderRadius: 12,
                      }}
                    />
                    <div
                      style={{
                        boxSizing: 'border-box',
                        width: 14,
                        height: 14,
                        left: 8,
                        top: 0,
                        position: 'absolute',
                        background: '#04A1FF',
                        borderRadius: 12,
                        border: '2px rgba(255, 255, 255, 0.90) solid',
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    boxSizing: 'border-box',
                    width: '100%',
                    height: 24,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      boxSizing: 'border-box',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      gap: 2,
                      display: 'inline-flex',
                    }}
                  >
                    <div
                      style={{
                        boxSizing: 'border-box',
                        alignSelf: 'stretch',
                        color: 'white',
                        fontSize: 14,
                        fontFamily: 'Inter',
                        fontWeight: '400',
                        lineHeight: 24,
                        wordWrap: 'break-word',
                      }}
                    >
                      Monthly
                    </div>
                  </div>
                  <div
                    style={{
                      boxSizing: 'border-box',
                      width: 22,
                      height: 14,
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        boxSizing: 'border-box',
                        width: 20,
                        height: 12,
                        left: 0,
                        top: 1,
                        position: 'absolute',
                        background: 'rgba(255, 255, 255, 0.60)',
                        borderRadius: 12,
                      }}
                    />
                    <div
                      style={{
                        boxSizing: 'border-box',
                        width: 14,
                        height: 14,
                        left: 8,
                        top: 0,
                        position: 'absolute',
                        background: '#04A1FF',
                        borderRadius: 12,
                        border: '2px rgba(255, 255, 255, 0.90) solid',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bvb"
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '15px',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div>
                  <p>Transcation</p>
                </div>
                <div
                  style={{
                    boxSizing: 'border-box',
                    width: 139,
                    height: 44,
                    background: '#292929',
                    borderRadius: 4,
                    border: '1px #6B6B6B solid',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      boxSizing: 'border-box',
                      height: 44,
                      paddingTop: 12,
                      paddingBottom: 8,
                      paddingLeft: 16,
                      paddingRight: 16,
                      background: '#04A1FF',
                      borderRadius: 4,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 10,
                      display: 'inline-flex',
                    }}
                  >
                    <div
                      style={{
                        boxSizing: 'border-box',
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 14,
                        fontFamily: 'Arimo',
                        fontWeight: '600',
                        lineHeight: 16.8,
                        wordWrap: 'break-word',
                      }}
                    >
                      Debit
                    </div>
                  </div>
                  <div
                    style={{
                      boxSizing: 'border-box',
                      height: 44,
                      paddingTop: 12,
                      paddingBottom: 8,
                      paddingLeft: 16,
                      paddingRight: 16,
                      borderRadius: 4,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 10,
                      display: 'inline-flex',
                    }}
                  >
                    <div
                      style={{
                        boxSizing: 'border-box',
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 14,
                        fontFamily: 'Arimo',
                        fontWeight: '600',
                        lineHeight: 16.8,
                        wordWrap: 'break-word',
                      }}
                    >
                      Credit
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <label
                  style={{
                    boxSizing: 'border-box',
                    color: 'white',
                    paddingBottom: '8px',
                  }}
                >
                  Amount
                </label>
                <input
                  style={{
                    boxSizing: 'border-box',
                    backgroundColor: '#292929',
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                  }}
                  type="text"
                  placeholder="Select date"
                />
              </div>
            </div>
          </div>

          <div
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
            }}
          >
            <div style={{ boxSizing: 'border-box', padding: '10px' }}>
              <button
                style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: 14,
                  fontFamily: 'Arimo',
                  fontWeight: '600',
                  borderRadius: '5px',
                }}
              >
                Cancel
              </button>

              <button
                style={{
                  padding: '10px 20px',
                  background: '#04A1FF',
                  border: 'none',
                  color: 'white',
                  fontSize: 14,
                  fontFamily: 'Arimo',
                  fontWeight: '600',
                  borderRadius: '5px',
                }}
              >
                Save
              </button>
            </div>
          </div>
        </Box>
      </form>
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
