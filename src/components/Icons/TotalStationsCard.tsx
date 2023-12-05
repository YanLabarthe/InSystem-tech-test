import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { CircularProgress } from '@mui/material';

const TotalStationsCard = ({ activeStationsCount, isLoading }) => {
  return (
    <Card sx={{ minWidth: 275, textAlign: 'center', margin: '20px', boxShadow: 'none' }}>
      <CardContent>
        <CorporateFareIcon style={{ fontSize: 60, color: '#1976d2' }} />
        <Typography variant="h5" component="div">
          Total Water Stations
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

export default TotalStationsCard;
