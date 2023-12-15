import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface paginationProps {
  count?: number;
  handleGetCurrentPage?: any;
}
export default function PaginationPage({
  count,
  handleGetCurrentPage,
}: paginationProps) {
  return (
    <Stack marginTop={'10px'}>
      {count && (
        <Pagination
          count={count}
          onChange={(e, page) => handleGetCurrentPage(e, page)}
          color="primary"
        />
      )}
    </Stack>
  );
}
