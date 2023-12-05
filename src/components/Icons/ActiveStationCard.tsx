import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BusinessIcon from '@mui/icons-material/Business';
import { CircularProgress } from '@mui/material';

const ActiveStationsCard = ({ activeStationsCount, isLoading }) => {
  return (
    <Card sx={{ minWidth: 275, textAlign: 'center', margin: '20px', boxShadow: 'none' }}>
      <CardContent>
        <BusinessIcon style={{ fontSize: 60, color: '#1976d2' }} />
        <Typography variant="h5" component="div">
          Active Water Stations
        </Typography>
        {isLoading ? (
        <CircularProgress />
      ) : (
        <Typography variant="h4" component="div" style={{ margin: '20px 0' }}>
          {activeStationsCount}
        </Typography>
      )}
      </CardContent>
    </Card>
  );
};

export default ActiveStationsCard;
