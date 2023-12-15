import React, { useState } from 'react';
import styles from '../styles.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
interface ImageProps {
  image: string;
  handleDeleteImage: (image: string) => void;
  handleSelectImage: (image: string) => void;
  handleDownloadImage: (image: string) => void;
  isSelected: boolean;
}

export default function MediaTypeItem({
  image,
  handleDeleteImage,
  handleSelectImage,
  handleDownloadImage,
  isSelected,
}: ImageProps) {
  const [hovered, setHovered] = useState(false);
  const [isZoomed, setZoomed] = useState(false);

  const toggleZoom = () => {
    setZoomed(!isZoomed);
  };
  return (
    <div>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`${styles.imageContainer} ${
          isSelected ? styles.selected : ''
        }`}
      >
        <div
          className={styles.CheckIcon}
          onClick={() => handleSelectImage(image)}
        >
          {isSelected ? (
            <CheckCircleOutlinedIcon className={styles.Icon} />
          ) : (
            <CircleOutlinedIcon className={styles.Icon} />
          )}
        </div>
        <img
          src={`https://dropbox-demo.s3.us-east-2.amazonaws.com/${image}`}
          alt="Image"
          className={styles.imageitem}
        />
        {hovered && (
          <div className={styles.actions}>
            <div
              className={styles.icon}
              onClick={() => handleDeleteImage(image)}
            >
              <DeleteIcon />
            </div>
            <div className={styles.icon} onClick={toggleZoom}>
              <ZoomInIcon />
            </div>

            <div
              className={styles.icon}
              onClick={() =>
                handleDownloadImage(
                  `https://dropbox-demo.s3.us-east-2.amazonaws.com/${image}`
                )
              }
            >
              <FileDownloadOutlinedIcon />
            </div>
          </div>
        )}
      </div>
      <div>
        {isZoomed && (
          <div className={styles.zoomedImageContainer} onClick={toggleZoom}>
            <img
              src={`https://dropbox-demo.s3.us-east-2.amazonaws.com/${image}`}
              alt="Zoomed Image"
              className={styles.zoomedImage}
            />
            <div className={styles.closeIcon} onClick={toggleZoom}>
              <CloseIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
