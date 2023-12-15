import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, MenuItem, Select, TextField, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from '../styles.module.css';
import theme from 'renderer/styles/muiTheme';
import Dropzone from 'react-dropzone';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { string } from 'yup';
import { uploadContent } from 'services/content';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: '10px',
  bgcolor: '#121212',
  color: '#fff',
  boxShadow: 24,
  p: 2,
};

export default function UploadFolderModal({
  open,
  folders,
  dialogOpenClose,
  setFolder,
  selectedCreator,
  loadData,
  getImagesInFolder,
  creatorData,
}: any) {
  const [foldername, setfoldername] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [newFolder, setNewFolder] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [creatingNewFolder, setCreatingNewFolder] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const Alert = styled(MuiAlert)(({ theme }) => ({
    backgroundColor: 'green', // Customize the background color
    color: 'white', // Customize the text color
  }));

  const s3Client = new S3Client({
    region: 'us-east-2',
    credentials: {
      secretAccessKey: 'A/8At+QCOyqTNmYItStvUnYlvjq47S34Kxo9Ir21',
      accessKeyId: 'AKIAVMBOR2DKTDXD5PP4',
    },
  });

  const createNewFolderInS3 = async (folderName) => {
    console.log('upload', folderName);
    const params = {
      Bucket: 'dropbox-demo', // Replace with your S3 bucket name
      Key: `${selectedCreator}/${folderName}/`, // The folder name with a trailing slash to represent a folder
    };

    try {
      await s3Client.send(new PutObjectCommand(params));
      console.log(`Folder '${folderName}' created in S3 bucket.`);
      loadData();
    } catch (error) {
      console.error('Error creating folder in S3:', error);
    }
  };

  useEffect(() => {
    console.log('folder', folders);
  }, []);

  const handleClose = () => {
    dialogOpenClose(false);
  };

  const handleSelectFolder = (e: any) => {
    setfoldername(e.target.value);
  };

  const handleCreateFolder = () => {
    setCreatingNewFolder(true); // When "Create New Folder" is selected
    setNewFolder(''); // Clear the new folder input
  };
  const handleInputChange = (e) => {
    // Update the newFolder state when the input changes
    setNewFolder(e.target.value);
  };
  const onDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setSelectedFiles(acceptedFiles);
    console.log('Selected Files:', acceptedFiles);
  };

  const onClick = () => {
    setFolder(foldername);
    dialogOpenClose(false);
  };

  const handleFileSelect = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const createPresignedUrl = async (key: string) => {
    const expiresInSeconds = 7 * 24 * 60 * 60; // 7 days is the max
    const command = new GetObjectCommand({
      Bucket: 'dropbox-demo',
      Key: key,
    });
    const url = await getSignedUrl(s3Client, command, {
      expiresIn: expiresInSeconds,
    });
    return url;
  };
  function getFileExtension(filename: string) {
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1] : '';
  }

  const handleUpload = async () => {
    const uploadToFolder = newFolder ? `${newFolder}` : `${foldername}`;
    if (!uploadToFolder || selectedFiles.length === 0) {
      console.error('Please select a folder and one or more files for upload.');
      return;
    }
    createNewFolderInS3(`${uploadToFolder}`);

    const s3Client = new S3Client({
      region: 'us-east-2',
      credentials: {
        secretAccessKey: 'A/8At+QCOyqTNmYItStvUnYlvjq47S34Kxo9Ir21',
        accessKeyId: 'AKIAVMBOR2DKTDXD5PP4',
      },
    });

    for (const selectedFile of selectedFiles) {
      const key = `${selectedCreator}/${uploadToFolder}/${selectedFile.name}`;
      const params = {
        Bucket: 'dropbox-demo',
        Key: key,
        Body: selectedFile,
      };
      console.log(`${selectedCreator}/${uploadToFolder}/${selectedFile.name}`);

      try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log('Successfully uploaded file to S3', data);
        const presignUrl = await createPresignedUrl(key);

        const payload = {
          createorId: selectedCreator,
          creatorEmail: creatorData.filter((e) => e._id === selectedCreator)[0]
            .ofcreds.email,
          fileName: selectedFile.name,
          mimeType: getFileExtension(selectedFile.name),
          imageKey: key,
          presignUrl: presignUrl,
          bucketName: params.Bucket,
          folderName: uploadToFolder,
        };
        const response = await uploadContent(payload);
        openSnackbar('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading file to S3', error);
      }
    }
    getImagesInFolder(uploadToFolder);

    dialogOpenClose(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={3000} // Adjust this duration as needed
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Modal
        sx={{ backdropFilter: 'blur(4px)' }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '10px 0px',
            }}
          >
            <Typography> Upload</Typography>
            <Typography onClick={handleClose} sx={{ cursor: 'pointer' }}>
              X
            </Typography>
          </Box>
          <Divider sx={{ bgcolor: '#292929' }} />
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'start'}
            gap={'10px'}
          >
            <Typography marginTop={'20px'}>Select Folder</Typography>
            <Select
              native={false}
              id="current-invoice-settings"
              value={foldername}
              onChange={handleSelectFolder}
              sx={{
                color: theme.palette.secondary.contrastText,
                width: '98%',
                height: '45px',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.secondary.light,
                },
                padding: '0px 0px',
                ' & .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
                  {
                    padding: '4px 8px',
                  },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#292929',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#292929',
                },
                '.MuiSvgIcon-root': {
                  fill: 'white !important',
                },
                input: {
                  backgroundColor: 'theme.palette.secondary.contrastText',
                },
              }}
              MenuProps={{
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },

                PaperProps: {
                  style: {
                    backgroundColor: '#292929', // Set the background color to black
                    color: 'white',
                  },
                },
              }}
            >
              {folders.map((folder) => (
                <MenuItem key={folder.id} value={folder.foldername}>
                  {folder.foldername}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {!creatingNewFolder && (
            <Button
              variant="text"
              onClick={handleCreateFolder}
              sx={{
                textTransform: 'capitalize',
                textAlign: 'center',
                width: '100%',
              }}
            >
              Create New Folder
            </Button>
          )}
          {creatingNewFolder && (
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'start'}
              gap={'10px'}
            >
              <Typography marginTop={'20px'}>Name Folder</Typography>
              <input
                type="text"
                placeholder=""
                onChange={handleInputChange} // Use the new folder state here
                className={styles.inputWrap}
                value={newFolder} // Use the new folder state value
              />
            </Box>
          )}
          <Dropzone minSize={0} maxSize={104857600} onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input
                    type="file"
                    id="file-upload"
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                  />
                  <Box
                    sx={{
                      border: '1px dashed #292929',
                      borderRadius: '5px',
                      padding: '10px',
                      textAlign: 'center',
                      marginTop: '10px',
                      width: '370px',
                      height: '120px',
                    }}
                  >
                    <BackupOutlinedIcon
                      style={{ fontSize: '36px', color: '#fff' }}
                    />
                    <Typography variant="body1">
                      {selectedFiles.length === 0
                        ? 'Click to upload file from your computer or drag your file here'
                        : `${selectedFiles.length} image selected`}
                    </Typography>
                  </Box>
                </div>
              </section>
            )}
          </Dropzone>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            gap={'8px'}
            padding={'20px 10px'}
          >
            <Button sx={{ textTransform: 'capitalize' }} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ textTransform: 'capitalize' }}
              onClick={handleUpload}
            >
              <Typography sx={{ color: '#fff' }}> Upload</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export const countryList = [
  {
    label: 'India',
    value: 'india',
  },
  {
    label: 'Nepal',
    value: 'nepal',
  },
];
