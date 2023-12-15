import Dashboard from 'renderer/components/Dashboard';
import SearchInput from 'renderer/components/SearchInput';
import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import managers from 'renderer/utils/managerSuiteConstant';
import UserCardWImage from 'renderer/components/UserCardWImage';
import PageTopbar from 'renderer/components/PageTopbar';
import PageAside from 'renderer/components/PageAside';
import styles from './styles.module.css';
import localisation from '../../components/localisation.json';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import {
  formatDate,
  calculateFolderSizeTotal,
  convertToKB,
  calculatePercentage,
  calculateFolderSize,
} from 'renderer/utils';
import { Box, Button, Icon, Stack, Typography, useTheme } from '@mui/material';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import Link from '@mui/material/Link';
import ProfilePic from 'renderer/assets/png/profile.jpg';
import InsertLinkSharpIcon from '@mui/icons-material/InsertLinkSharp';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import theme from 'renderer/styles/muiTheme';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateFolderModal from '../ContentHub/CreateFolderModal';
import UploadFolderModal from './UploadFolderModal';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Menu, MenuItem, IconButton, Divider } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

import {
  DeleteObjectsCommand,
  ListObjectsCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';

import DeleteConfirmationDialog from './CreateFolderModal/confirmDelete';
import MediaTypeItem from './MediaTypeItem';
import axios from 'axios';
import JSZip from 'jszip';
import ContentHubStorageBar from 'renderer/components/Progress';
import GridSelectionItem from 'renderer/components/GridSelection';
import useQuery from 'renderer/hooks/useQuery';
import RegenerateModal from './RegenerateModal';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  deleteContentData,
  getContentData,
  updatePresignedUrl,
} from 'services/content';

export default function ContentHub() {
  const [search, setSearch] = useState('');
  const [isCreateFolderModalOpen, setOpen] = useState(false);
  const [isRegenerateModalOpen, setRegenerateModalOpen] = useState(false);
  const [isUploadFolderModalOpen, setUploadOpen] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [rows, setRows] = useState([{ id: 1, foldername: '' }]);
  const [images, setImages] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState('');
  const [hoveredImage, setHoveredImage] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletingImage, setDeletingImage] = useState(null);
  const [inFolderView, setInFolderView] = useState(false);
  const { isLoading, data } = useQuery({ key: 'get-creator' });
  const [headerText, setHeaderText] = useState('Folder Uploaded');
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // Or specify the appropriate type
  const [showDownloadButton, setShowDownloadButton] = useState(true);
  const [showDeleteButton, setShowDeleteButton] = useState(true);
  const [totalStorageUsedInPercent, setTotalStorageUsedInPercent] = useState(0);
  const [maxSizeLimit, setMaxSizeLimit] = useState(25);
  const [sizeUsed, setSizeUsed] = useState(0);
  const [sizeUsedUnit, setSizeUsedUnit] = useState('B');
  const [selectedStatus, setSelectedStatus] = useState('Filter');
  const [signedImageList, setSignedImageList] = useState([]);
  const [presignedLink, setPresignedLink] = useState('');

  // Function to toggle image selection
  const handleToggleImageSelection = (imageKey: string) => {
    let updatedSelectedImages;

    if (selectedImages.includes(imageKey)) {
      // If the image is already selected, remove it from the selectedImages array
      updatedSelectedImages = selectedImages.filter(
        (selectedImage) => selectedImage !== imageKey
      );
    } else {
      // If the image is not selected, add it to the selectedImages array
      updatedSelectedImages = [...selectedImages, imageKey];
    }

    // Update the selected images state
    setSelectedImages(updatedSelectedImages);

    // Check if there are any selected images to determine button visibility
    const shouldShowButtons = updatedSelectedImages.length > 0;

    // Update the visibility of download and delete buttons
    setShowDownloadButton(shouldShowButtons);
    setShowDeleteButton(shouldShowButtons);
  };

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  const s3Client = new S3Client({
    region: 'us-east-2',
    credentials: {
      secretAccessKey: 'A/8At+QCOyqTNmYItStvUnYlvjq47S34Kxo9Ir21',
      accessKeyId: 'AKIAVMBOR2DKTDXD5PP4',
    },
  });

  console.log('data', data);

  const createNewFolderInS3 = async (folderName) => {
    const folderWithManagerId = `${selectedCreator}/${folderName}/`;
    console.log('folder', folderWithManagerId);
    const params = {
      Bucket: 'dropbox-demo',
      Key: folderWithManagerId,
    };

    try {
      await s3Client.send(new PutObjectCommand(params));
      console.log(`Folder '${folderWithManagerId}' created in S3 bucket.`);
      await getFolderList();
    } catch (error) {
      console.error('Error creating folder in S3:', error);
    }
  };

  const deleteFolderFromS3 = async (key) => {
    try {
      const listObjectsCommand = {
        Bucket: 'dropbox-demo',
        Prefix: `${key}/`,
      };
      const { Contents } = await s3Client.send(
        new ListObjectsCommand(listObjectsCommand)
      );
      const deleteObjectsCommand = {
        Bucket: 'dropbox-demo',
        Delete: {
          Objects: Contents.map(({ Key }) => ({ Key })),
          Quiet: false,
        },
      };

      await s3Client.send(new DeleteObjectsCommand(deleteObjectsCommand));
      console.log('Folder deleted successfully.');
      setRows([]);
      await getFolderList();
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingImage) {
      try {
        // Delete the image from S3 here using the `deletingImage` state.
        const params = {
          Bucket: 'dropbox-demo', // Replace with your S3 bucket name
          Key: `${deletingImage}`, // Construct the full key to the image
        };

        console.log('deletingImage', params.Key);
        await s3Client.send(new DeleteObjectCommand(params));
        console.log(`Image '${deletingImage}' deleted from S3 bucket.`);

        // delete api
        await deleteContentData({ type: 'keys', keyList: [deletingImage] });
        // Remove the deleted image from the state
        setImages((prevImages) =>
          prevImages.filter((image) => image !== deletingImage)
        );

        // Clear the `deletingImage` state and close the confirmation dialog
        setDeletingImage(null);
        setConfirmDelete(false);
      } catch (error) {
        console.error('Error deleting image from S3:', error);
      }
    }
  };

  const showDeleteConfirmationDialog = () => {
    setConfirmDelete(true);
  };

  const handleDeleteImage = (imageKey) => {
    setDeletingImage(imageKey);

    console.log('imageKey', imageKey);
    showDeleteConfirmationDialog();
  };

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  const columns: GridColDef[] = [
    {
      field: 'foldername',
      headerName: 'Folder name',
      flex: 1,
      headerClassName: 'gridheader',
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <Box
          height={100}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box
            height={40}
            width={40}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            borderRadius={10}
            bgcolor={isDarkTheme ? '#292929' : '#EAF1FF'}
          >
            <FolderOpenIcon style={{ height: 20, width: 20 }} />
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'flex-start'}
          >
            <Typography fontSize="16px" fontWeight={700} paddingLeft={'15px'}>
              {params.row.foldername}
            </Typography>
            <Typography fontSize="16px" color="#7B7E85" paddingLeft={'15px'}>
              {params.row.itemCount > 0 ? `${params.row.itemCount} Items` : ''}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'foldersize',
      headerName: 'Folder Size',
      width: 150,
      headerClassName: 'blue-header',
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <Box
          height={100}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography fontSize="16px" color="#7B7E85">
            {params.row.folderSize}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'datauploaded',
      headerName: 'Data uploaded',
      width: 150,
      headerClassName: 'blue-header',
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <Box
          height={100}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography fontSize="16px" color="#7B7E85">
            {params.row.lastUpdated}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'lastupdated',
      headerName: 'Last updated',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      headerClassName: 'blue-header',
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <Box
          height={100}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography fontSize="16px" color="#7B7E85">
            {params.row.lastUpdated}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 10,
      cellClassName: 'actions',
      renderCell: (params) => <ActionsCell row={params.row} />,
      // getActions: (e) => {

      //   return [
      //     <GridActionsCellItem
      //       icon={<MoreVertIcon />}
      //       label="More"
      //       className="textPrimary"
      //       onClick={handleMoreClick(e)}
      //       color="inherit"
      //     />
      //   ];
      // },
    },
  ];

  useEffect(() => {
    // Clear selected images when leaving the folder view
    if (showGrid && inFolderView) {
      setSelectedImages([]);
    }
    // Update the inFolderView state
    setInFolderView(!showGrid);
  }, [showGrid]);
  useEffect(() => {
    console.log('manager', selectedCreator);
    console.log('data.data', data?.data);

    getFolderList().then((r) => console.log(r));
  }, [selectedCreator]);
  useEffect(() => {
    // Select the first manager when the component mounts
    if (!selectedCreator && data?.data?.creators.length > 0) {
      handleManagerSelection(data.data.creators[0]._id);
    }
  }, [data]);

  const handleManagerSelection = (manager) => {
    setSelectedCreator(manager);

    setShowGrid(true);
    setHeaderText('Folder Uploaded');
    // cId = manager;

    // Check if selectedCreator is not null before logging.
    if (manager !== null) {
      console.log('manager', manager);
    }

    setRows([{ id: 1, foldername: '' }]);
  };

  const getFolderList = async () => {
    const params = {
      Bucket: 'dropbox-demo', // Replace with your S3 bucket name
      Delimiter: '/',
      Prefix: `${selectedCreator}/`, // Use an empty prefix to list objects from the root of the bucket
    };
    console.log('selectedCreator', selectedCreator);

    try {
      let folder = await s3Client.send(new ListObjectsV2Command(params));
      console.log('folder', folder);

      //
      // const newRows = folder.CommonPrefixes.filter(
      //   (item: { Prefix: string }) => item.Prefix !== '/'
      // ) // Exclude items with single forward slash
      //   .map((item: { Prefix: string }, index: number) => ({
      //     id: rows.length + index + 1,
      //     foldername: item.Prefix.replace(/\//g, ''), // Removing forward slashes from the string
      //   }));
      // setRows(newRows);

      ////////////////internal detail///////////////////

      const newData = [];
      let totalFileSize = 0;
      let _sizeUsed = 0;
      let accumulatedTotal = 0;

      if (folder.CommonPrefixes) {
        // const newRows1 = folder.CommonPrefixes.filter(
        //   (item: { Prefix: string }) => item.Prefix !== '/'
        // ); // Exclude items with single forward slash

        for (const prefix of folder.CommonPrefixes) {
          const prefixParams = {
            Bucket: 'dropbox-demo',
            Delimiter: '/',
            Prefix: prefix.Prefix,
          };

          const prefixData = await s3Client.send(
            new ListObjectsV2Command(prefixParams)
          );
          ////// get size of s3 objects ////////////
          let size = calculateFolderSizeTotal(prefixData.Contents);

          accumulatedTotal += size.totalSize;

          let _percentage = calculatePercentage(size.formattedSize, 25, 'GB');
          totalFileSize += _percentage;

          const lastUpdated = prefixData.Contents.reduce((prev, current) =>
            prev.LastModified > current.LastModified ? prev : current
          ).LastModified;
          const formattedDate = formatDate(lastUpdated);

          const itemCount = prefixData.KeyCount - 1;
          newData.push({
            id: newData.length + 1,
            foldername: prefix.Prefix.split('/')[1].replace(/\//g, ''),
            lastUpdated: formattedDate,
            itemCount: itemCount,
            folderSize: size.formattedSize,
          });
        }
        setRows([]);
        if (newData.length > 0) {
          setRows(newData);
          console.log('percentage', totalFileSize);
          setTotalStorageUsedInPercent(totalFileSize);
          setSizeUsed(accumulatedTotal.toFixed(2));
        }
      }

      //////////////////////////////////////////////////
    } catch (error) {
      console.error('Error creating folder in S3:', error);
    }
  };

  // Function to download a folder from S3
  const downloadFolderFromS3 = async (folderKey) => {
    const s3Client = new S3Client({
      region: 'us-east-2',
      credentials: {
        secretAccessKey: 'A/8At+QCOyqTNmYItStvUnYlvjq47S34Kxo9Ir21',
        accessKeyId: 'AKIAVMBOR2DKTDXD5PP4',
      },
    });

    try {
      const listParams = {
        Bucket: 'dropbox-demo',
        Prefix: folderKey, // The key of the folder to download
      };

      const { Contents } = await s3Client.send(
        new ListObjectsV2Command(listParams)
      );

      const zip = new JSZip();

      for (const object of Contents) {
        const getObjectParams = {
          Bucket: 'dropbox-demo',
          Key: object.Key,
        };

        const { Body } = await s3Client.send(
          new GetObjectCommand(getObjectParams)
        );
        const data = await new Response(Body).arrayBuffer();
        zip.file(object.Key, data);
      }

      const blob = await zip.generateAsync({ type: 'blob' });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${folderKey.split('/')[1]}.zip`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading and zipping folder from S3:', error);
    }
  };

  const downloadImageFromS3 = async (imageKey) => {
    console.log('image', imageKey);
    window.electron.ipcRenderer.sendMessage('download', { url: imageKey });
  };
  const getImagesInFolder = async (key: string) => {
    try {
      const params = {
        Bucket: 'dropbox-demo', // Replace with your S3 bucket name
        Prefix: `${selectedCreator}/` + key + '/', // Use an empty prefix to list objects from the root of the bucket
      };
      let folder = await s3Client.send(new ListObjectsV2Command(params));
      const modifiedData = folder.Contents.slice(1); // Removing the first item

      const response = await getContentData(selectedCreator, key);
      setSignedImageList(response.data.data);

      console.log('modifiedData', modifiedData);
      const keyList = modifiedData.map((item: { Key: any }) => item.Key);
      setImages(keyList);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleRowClick = (params: { row: any }, event: any) => {
    console.log(params.row.foldername);

    // change to s3 delete below
    getImagesInFolder(params.row.foldername);

    toggleGrid();
    setHeaderText(params.row.foldername);
    setInFolderView(!showGrid);
  };
  const ActionsCell = (row) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
      console.log(row.row.foldername);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    const handleDeleteFolder = async () => {
      handleMenuClose();
      deleteFolderFromS3(selectedCreator + '/' + row.row.foldername);
      await deleteContentData({
        type: 'folder',
        folderName: row.row.foldername,
      });
    };

    const handleDownloadFolder = () => {
      handleMenuClose();

      downloadFolderFromS3(selectedCreator + '/' + row.row.foldername);
    };

    return (
      <div>
        <IconButton onClick={handleMenuClick}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={
            {
              // '& .MuiPaper-root': {
              //   backgroundColor: '#1a1a1a',
              //   color: 'white',
              // },
            }
          }
        >
          <MenuItem onClick={handleDownloadFolder}>
            <DownloadIcon />
            <Typography paddingLeft={'15px'}>Download folder</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ContentCopyIcon />
            <Typography paddingLeft={'15px'}>Copy Link</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <InsertLinkOutlinedIcon />
            <Typography paddingLeft={'15px'}> Regenerate Link</Typography>
          </MenuItem>
          <Divider sx={{ my: 0.5, backgroundColor: '#292929' }} />
          <MenuItem onClick={handleDeleteFolder}>
            <DeleteOutlineOutlinedIcon />
            <Typography paddingLeft={'15px'}> Delete Folder</Typography>
          </MenuItem>
        </Menu>
      </div>
    );
  };
  const dialogOpenClose = (data: boolean) => {
    setOpen(data);
  };
  const RegeneratedialogOpenClose = (data: boolean) => {
    createPresignedUrl(data);
  };
  const dialogUploadOpenClose = (data: boolean) => {
    setUploadOpen(data);
  };
  const handleFolderNameChange = useCallback(
    (foldername: string) => {
      console.log('parent', foldername);
      createNewFolderInS3(foldername);
    },
    [selectedCreator]
  );
  const onSearch = (value: string) => {
    setSearch(value);
  };
  const handleOpen = () => setOpen(true);
  const handleUploadOpen = () => setUploadOpen(true);
  const handleRegeneratedialogOpen = () => setRegenerateModalOpen(true);

  // S3 functions

  // create presignde url
  const createPresignedUrl = async (key: string) => {
    const expiresInSeconds = 7 * 24 * 60 * 60; // 7 days is the max
    const command = new GetObjectCommand({
      Bucket: 'dropbox-demo',
      Key: key,
    });
    const url = await getSignedUrl(s3Client, command, {
      expiresIn: expiresInSeconds,
    });
    setPresignedLink(url);
    setRegenerateModalOpen(true);
  };
  // Function to delete selected images
  const deleteSelectedImages = async () => {
    setShowDownloadButton(false); // Hide the download button
    setShowDeleteButton(false); // Hide the delete button
    try {
      // Create a list of images to delete and a list of images to keep
      const imagesToDelete = [];
      let updatedImages = [];
      for (const imageKey of selectedImages) {
        // Specify the S3 object to delete
        const deleteObjectParams = {
          Bucket: 'dropbox-demo', // Replace with your S3 bucket name
          Key: imageKey, // The key of the image to delete
        };
        console.log('Deleted', imageKey);
        // Initiate the delete operation for each selected image
        await s3Client.send(new DeleteObjectCommand(deleteObjectParams));

        // Add the deleted image to the list of images to delete
        imagesToDelete.push(imageKey);
      }
      await deleteContentData({ type: 'keys', keyList: imagesToDelete });
      // Remove the deleted images from the state
      updatedImages = images.filter((image) => !imagesToDelete.includes(image));

      // Update the state with the updated list of images
      setImages(updatedImages);
      getFolderList();
      // Clear the `deletingImage` state and close the confirmation dialog
      setDeletingImage(null);
      setConfirmDelete(false);
      setSelectedImages([]);
    } catch (error) {
      console.error('Error deleting images:', error);
      // Handle the error, e.g., show an error message to the user.
    }
  };
  // Function to download selected images
  const downloadSelectedImages = async () => {
    setShowDownloadButton(false); // Hide the download button
    setShowDeleteButton(false); // Hide the delete button

    try {
      // Create an array to store promises for each image download
      const downloadPromises = selectedImages.map((imageKey) => {
        return new Promise(async (resolve, reject) => {
          const params = {
            Bucket: 'dropbox-demo', // Replace with your S3 bucket name
            Key: imageKey, // The key of the image to download
          };

          try {
            const { Body } = await s3Client.send(new GetObjectCommand(params));

            const data = await new Response(Body).arrayBuffer();
            const blob = new Blob([data]);
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = imageKey;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            resolve(imageKey);
          } catch (error) {
            reject(error);
          }
        });
      });

      // Use Promise.all to execute all download promises
      Promise.all(downloadPromises)
        .then((downloadedImages) => {
          console.log('Downloaded images:', downloadedImages);
          // After successfully downloading the selected images, reset the selectedImages state
          setSelectedImages([]);
        })
        .catch((error) => {
          console.error('Error downloading images:', error);
          // Handle the error, e.g., show an error message to the user.
          // The selectedImages state will not be reset in case of an error.
        });
    } catch (error) {
      console.error('Error downloading images:', error);
      // Handle the error, e.g., show an error message to the user.
    }
  };

  const renderActions = () => {
    if (selectedImages.length > 0) {
      return (
        <div>
          {showDownloadButton && (
            <Button
              variant="contained"
              onClick={downloadSelectedImages}
              sx={{ color: '#fff', marginRight: '10px' }}
            >
              Download Selected
            </Button>
          )}
          {showDeleteButton && (
            <Button
              variant="contained"
              onClick={deleteSelectedImages}
              sx={{ color: '#fff' }}
            >
              Delete Selected
            </Button>
          )}
        </div>
      );
    }
    return null;
  };

  const getSignedUrlFromDb = () => {
    const signedUrl = signedImageList.filter(
      (e) => e.imageKey === selectedImages[0]
    );

    setPresignedLink(signedUrl[0].presignUrl);
    setRegenerateModalOpen(!isRegenerateModalOpen);
  };

  const updateLink = async () => {
    const expiresInSeconds = 7 * 24 * 60 * 60; // 7 days is the max
    const command = new GetObjectCommand({
      Bucket: 'dropbox-demo',
      Key: selectedImages[0],
    });
    const url = await getSignedUrl(s3Client, command, {
      expiresIn: expiresInSeconds,
    });

    setPresignedLink(url);
    try {
      const payload = {
        presignUrl: url,
        imageKey: selectedImages[0],
      };
      await updatePresignedUrl(payload);
    } catch (err) {
      console.log('Err', err);
    }
  };

  return (
    <Dashboard>
      <section className={styles.wrapper}>
        <PageTopbar>
          <PageTopbar.HeaderText>{localisation.content}</PageTopbar.HeaderText>
          <Box
            gap={'10px'}
            marginRight={'10px'}
            display={'flex'}
            justifyContent={'center'}
          >
            <Box
              gap={'2px'}
              width={'350px'}
              marginRight={'20px'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignSelf={'end'}
            >
              <Box
                gap={'10px'}
                marginRight={'5px'}
                display={'flex'}
                justifyContent={'space-between'}
              >
                <Typography fontSize="18px" sx={{ marginBottom: '2px' }}>
                  {' '}
                  Storage
                </Typography>
                <Link href="#" color="primary" underline="none">
                  Upgrade
                </Link>
              </Box>

              <ContentHubStorageBar percentage={totalStorageUsedInPercent} />

              <Typography fontSize="14px" sx={{ marginTop: '4px' }}>
                <span style={{ color: '#04A1FF' }}>{sizeUsed} MB </span> of{' '}
                {maxSizeLimit} GB
              </Typography>
            </Box>
            {showGrid && (
              <Box
                gap={'10px'}
                marginRight={'10px'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Stack direction="row" spacing={3} alignItems="center">
                  <Stack direction="row" alignItems="center">
                    <FormatListBulletedOutlinedIcon />
                    <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 18 }} />
                  </Stack>

                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    onClick={handleUploadOpen}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    Upload
                  </Button>
                </Stack>
                <Button
                  variant="contained"
                  sx={{
                    height: '36px',
                    color: '#fff',
                    textTransform: 'capitalize',
                  }}
                  onClick={handleOpen}
                >
                  Create
                </Button>
              </Box>
            )}
            {!showGrid && (
              <Box
                gap={'20px'}
                marginRight={'5px'}
                display={'flex'}
                justifyContent={'center'}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button
                    component="label"
                    variant="contained"
                    sx={{ color: '#fff', textTransform: 'capitalize' }}
                    startIcon={<InsertLinkSharpIcon />}
                    onClick={getSignedUrlFromDb}
                    disabled={!(selectedImages.length == 1)}
                  >
                    Regenerate link
                  </Button>
                  <SearchOutlinedIcon />

                  <GridSelectionItem />

                  <Stack direction="row" alignItems="center">
                    <NorthOutlinedIcon sx={{ fontSize: 20 }} />

                    <div style={{ fontSize: '10px' }}>
                      <div>Z</div>
                      <div>A</div>
                    </div>
                  </Stack>
                </Stack>
              </Box>
            )}
          </Box>
        </PageTopbar>
        <Box display="flex" gap="5px" padding={'6px'}>
          <Stack>
            <PageAside>
              <div className={styles.search}>
                <SearchInput
                  value={search}
                  onUpdateSearch={onSearch}
                  onSearch={() => {}}
                >
                  <SearchInput.ReloadButton onRefresh={() => {}} />
                </SearchInput>
              </div>

              {data?.data &&
                data.data.creators.map((c) => (
                  <UserCardWImage
                    key={c._id}
                    id={c.id}
                    autoRelink={false}
                    name={c.creatorName}
                    profileImage={ProfilePic}
                    notificationCount={0}
                    messageCount={0}
                    selected={selectedCreator === c._id}
                    onClick={() => handleManagerSelection(c._id)}
                  />
                ))}
            </PageAside>
          </Stack>
          <Stack
            width={'75%'}
            borderRadius="16px"
            gap="15px"
            sx={{
              paddingTop: '10px',
              paddingLeft: '0',

              border: `1px solid ${theme.palette.primary.contrastText}`,
            }}
          >
            <Box
              height={'50px'}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography fontSize="22px" paddingLeft={'15px'}>
                {headerText}
              </Typography>
              {renderActions()}
              {!showGrid && (
                <Button
                  variant={'contained'}
                  onClick={toggleGrid}
                  sx={{ color: '#fff', marginRight: '10px' }}
                >
                  {' '}
                  Go to folders
                </Button>
              )}
            </Box>
            <div className={styles.tableContainer}>
              {showGrid && (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  onRowClick={handleRowClick}
                  rowHeight={72}
                  rowSpacingType="border"
                  components={{
                    Pagination: () => null, // Hide the pagination component
                  }}
                  sx={
                    {
                      // minWidth: '100%',
                      // color: '#fff',
                      // '& .MuiDataGrid-columnHeadersInner': {
                      //   backgroundColor: '#292929',
                      // },
                      // '& .MuiSvgIcon-root': {
                      //   color: 'white',
                      // },
                      // border: '1px solid #292929',
                    }
                  }
                />
              )}
              {!showGrid && (
                <div className={styles.imagegridcontainer}>
                  {images.map((image, index) => (
                    <MediaTypeItem
                      key={index.toString()}
                      image={image}
                      handleDeleteImage={handleDeleteImage}
                      handleDownloadImage={downloadImageFromS3}
                      // handleZoomImage={handleZoomImage}
                      handleSelectImage={() =>
                        handleToggleImageSelection(image)
                      }
                      isSelected={selectedImages.includes(image)}
                    />
                  ))}
                </div>
              )}
            </div>

            <DeleteConfirmationDialog
              open={confirmDelete} // Ensure confirmDelete is a boolean
              onClose={() => setConfirmDelete(false)}
              onConfirm={handleConfirmDelete}
            />
          </Stack>

          {isRegenerateModalOpen && (
            <RegenerateModal
              link={presignedLink}
              open={isRegenerateModalOpen}
              dialogOpenClose={() =>
                setRegenerateModalOpen(!isRegenerateModalOpen)
              }
              updateLink={updateLink}
            />
          )}
          {isCreateFolderModalOpen && (
            <CreateFolderModal
              setFolder={handleFolderNameChange}
              open={isCreateFolderModalOpen}
              dialogOpenClose={dialogOpenClose}
            />
          )}
          {isUploadFolderModalOpen && (
            <UploadFolderModal
              loadData={getFolderList}
              folders={rows}
              setFolder={handleFolderNameChange}
              selectedCreator={selectedCreator}
              open={isUploadFolderModalOpen}
              dialogOpenClose={dialogUploadOpenClose}
              getImagesInFolder={getImagesInFolder}
              creatorData={data.data.creators}
            />
          )}
        </Box>
      </section>
    </Dashboard>
  );
}
