import { _Object } from '@aws-sdk/client-s3';
import { calculateFolderSize } from 'renderer/utils';
function delay(milliseconds: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

const isArray = (item: any): boolean => {
  return Array.isArray(item);
};

const arrGenerator = (val: number): number[] =>
  Array.from({ length: val }, (_, i) => i + 1);



const formatDate = (inputDate: string | number | Date | undefined) => {
  const date = new Date(inputDate);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleString('en-US', options);
};

const calculateFolderSize=(Contents: _Object[] | undefined)=> {
  if (Contents) {
    let totalSize = 0;
    for (const content of Contents) {
      totalSize += content.Size;
    }

    let sizeLabel;
    let formattedSize;

    if (totalSize < 1024) {
      sizeLabel = 'B';
      formattedSize = totalSize.toFixed(2);
    } else if (totalSize < 1024 * 1024) {
      sizeLabel = 'KB';
      formattedSize = (totalSize / 1024).toFixed(2);
    } else if (totalSize < 1024 * 1024 * 1024) {
      sizeLabel = 'MB';
      formattedSize = (totalSize / (1024 * 1024)).toFixed(2);
    } else {
      sizeLabel = 'GB';
      formattedSize = (totalSize / (1024 * 1024 * 1024)).toFixed(2);
    }
    return ` ${formattedSize} ${sizeLabel}`

  }
}

const calculateFolderSizeTotal = (
  Contents: _Object[] | undefined,
  accumulatedTotal = 0
) => {
   if (!Contents || Contents.length === 0) {
     return {
       totalSize: accumulatedTotal,
       unit: 'B',
       formattedSize: '0 B',
     };
   }

   const sizeUnits = ['B', 'KB', 'MB', 'GB'];
   let totalSize = accumulatedTotal;

   for (const content of Contents) {
     totalSize += content.Size;
   }

   let sizeLabel = 'B';
   let formattedSize = totalSize.toFixed(2);

   for (const unit of sizeUnits) {
     if (totalSize < 1024) {
       sizeLabel = unit;
       break;
     }
     totalSize /= 1024;
     formattedSize = totalSize.toFixed(2);
   }

   return {
     totalSize: accumulatedTotal + totalSize,
     unit: sizeLabel,
     formattedSize: ` ${formattedSize} ${sizeLabel}`,
   };
};

const getUnitfromSize = (Contents: _Object[] | undefined) => {
  if (Contents) {

    let totalSize = 0;
    for (const content of Contents) {
      totalSize += content.Size;
    }

    let sizeLabel;
    let formattedSize;

    if (totalSize < 1024) {
      sizeLabel = 'B';
      formattedSize = totalSize.toFixed(2);
    } else if (totalSize < 1024 * 1024) {
      sizeLabel = 'KB';
      formattedSize = (totalSize / 1024).toFixed(2);
    } else if (totalSize < 1024 * 1024 * 1024) {
      sizeLabel = 'MB';
      formattedSize = (totalSize / (1024 * 1024)).toFixed(2);
    } else {
      sizeLabel = 'GB';
      formattedSize = (totalSize / (1024 * 1024 * 1024)).toFixed(2);
    }
    return `  ${sizeLabel}`;
  }
};
const convertToKB = (value: number, unit: string) => {
  const unitLower = unit.toLowerCase();
  switch (unitLower) {
    case 'b':
      return value /1024
    case 'kb':
      return value;
    case 'mb':
      return value * 1024;
    case 'gb':
      return value * 1024 * 1024;
    default:
      throw new Error( 'Invalid unit provided');
  }
};

const calculatePercentage=(folderSize: string,limit: number,limitUnit: string)=>{

    let used = folderSize?.trimStart()?.split(' ')[0] as unknown as number;
    let usedUnit = folderSize?.trimStart().split(' ')[1] as unknown as string;

    const usedInKB = convertToKB(used, usedUnit);

    const limitInKB = convertToKB(limit, limitUnit);
    const percentage = (usedInKB / limitInKB) * 100;
    return percentage;
}


export {
  delay,
  isArray,
  arrGenerator,
  formatDate,
  calculateFolderSize,
  convertToKB,
  calculatePercentage,
  calculateFolderSizeTotal,
};
