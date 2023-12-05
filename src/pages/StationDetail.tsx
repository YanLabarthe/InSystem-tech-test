import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { StationReading } from '../types/types';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';


const StationDetails: React.FC = () => {
  const { code_station } = useParams();
  const [stationReadings, setStationReadings] = useState<StationReading[]>([]);
  const [lastMeasurementDate, setLastMeasurementDate] = useState<string | null>(null);
  const [medianTemperature, setMedianTemperature] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const stationInfo = stationReadings[0];


  useEffect(() => {
    const fetchStationDetails = async () => {
      try {
        const response = await axios.get(`https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station=${code_station}&size=100&sort=desc&pretty`);
        setStationReadings(response.data.data);
        calculateMedianTemperature(response.data.data);
        setLastMeasurementDate(response.data.data[0]?.date_mesure_temp || null);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(`Error: ${err.response.status} - ${err.response.statusText}`);
        } else {
          setError('An unexpected error occurred');
        }
      }
      setIsLoading(false);
    };

    fetchStationDetails();
  }, [code_station]);

  const calculateMedianTemperature = (readings: StationReading[]) => {
    if (readings.length > 0) {
      const mostRecentDate = readings[0].date_mesure_temp;
      const mostRecentReadings = readings.filter(reading => reading.date_mesure_temp === mostRecentDate);
      const medianTemp = mostRecentReadings.reduce((sum, reading) => sum + reading.resultat, 0) / mostRecentReadings.length;
      setMedianTemperature(Math.round(medianTemp * 10) / 10);
    } else {
      setMedianTemperature(null);
    }
  };

  return (
    <>
    <div className='flex'>
    <Card sx={{ minWidth: 275, textAlign: 'center', margin: '20px', boxShadow: 'none' }}>
      <CardContent>
        <DeviceThermostatIcon style={{ fontSize: 60, color: '#1976d2' }} />
        <Typography variant="h5" component="div">
          Temperature moyenne (jour)
        </Typography>
        {isLoading ? (
          <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
            ) : (
              <Typography variant="h4" component="div" style={{ margin: '20px 0' }}>
            {medianTemperature !== null ? `${medianTemperature} °C` : 'N/A'}
          </Typography>
        )}
      </CardContent>
    </Card>
    <Card sx={{ minWidth: 275, textAlign: 'center', margin: '20px', boxShadow: 'none' }}>
        <CardContent>
          <CalendarMonthIcon style={{ fontSize: 60, color: '#1976d2' }} />
          <Typography variant="h5" component="div">
            Dernier relevé
          </Typography>
          <Typography variant="h4" component="div" style={{ margin: '20px 0' }}>
            {lastMeasurementDate || 'N/A'}
          </Typography>
        </CardContent>
      </Card>
    </div>
     <Card sx={{ minWidth: 275, textAlign: 'left', margin: '20px', boxShadow: 'none'  }}>
     <CardContent>
       <LocationOnIcon style={{ fontSize: 60, color: '#1976d2' }} />
       <Typography variant="h5" component="div">
         Station Information
       </Typography>
       <Typography variant="body1" component="div" style={{ margin: '10px 0' }}>
         <strong>Station Name:</strong> {stationInfo?.libelle_station || 'N/A'}
       </Typography>
       <Typography variant="body1" component="div" style={{ margin: '10px 0' }}>
         <strong>Location:</strong> {stationInfo?.localisation || 'N/A'}
       </Typography>
       <Typography variant="body1" component="div" style={{ margin: '10px 0' }}>
         <MapIcon style={{ verticalAlign: 'middle' }} />
         <strong> Coordinates:</strong> {stationInfo ? `${stationInfo.latitude}, ${stationInfo.longitude}` : 'N/A'}
       </Typography>
     </CardContent>
   </Card>
   </>
  );
};

export default StationDetails;
