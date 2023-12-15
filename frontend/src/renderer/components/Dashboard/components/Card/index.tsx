import { Avatar, Card, CardContent, Divider, Typography } from '@mui/material';

function CardDemo({ Logo, Amount, Earnings, RiseUpdate }) {
  return (
    <Card
      sx={{
        maxWidth: '25rem',
        margin: '3rem auto',
        borderRadius: '16px',
        padding: '20px 20px 10px 10px',
      }}
    >
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Move the Avatar to the left */}
          <Avatar
            sx={{
              width: 80,
              height: 80,
              backgroundColor: 'primary.main',
              marginTop: '1rem',
            }}
          >
            {Logo}
          </Avatar>
        </div>
        <Divider sx={{ my: '1rem' }} />
        <div style={{ display: 'flex' }}>
          <Typography variant="body2" color="textSecondary">
            {Earnings}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginLeft: '20px' }}
          >
            {RiseUpdate}%
          </Typography>
        </div>

        <Typography
          variant="h5"
          component="div"
          sx={{
            marginTop: '1rem',
            fontWeight: 700,
            fontSize: 53,
            color: 'rgba(170, 170, 170, 1)',
          }}
        >
          {Amount}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardDemo;
