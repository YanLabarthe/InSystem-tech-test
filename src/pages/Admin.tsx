import axios from 'axios';
import { useEffect, useState } from 'react';
import { Station } from '../types/types';
import ActiveStationsCard from '../components/Icons/ActiveStationCard';
import TotalStationsCard from '../components/Icons/TotalStationsCard';


const Admin = () => {
  const [stations, setStations] = useState<Station[]>([])
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);

  const [isStationsLoading, setIsStationsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);

const filterStationsByDate = (stations: Station[]): Station[] => {
  return stations.filter(station => {
    const dateMajInfos = new Date(station.date_maj_infos);
    return dateMajInfos.getFullYear() == 2023;
  });
};

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get('https://hubeau.eaufrance.fr/api/v1/temperature/station', {
        });
        setStations(response.data.data)
        const filtered = filterStationsByDate(response.data.data);
        setFilteredStations(filtered);
        console.log("fetchStation", response)
        console.log("filteredStations", filtered)
        setIsStationsLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(`Error: ${err.response.status} - ${err.response.statusText}`);
        } else {
          setError('An unexpected error occurred');
        }
      }
    };
    fetchStations()
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <>
      <h1>HubEau - dashboard</h1>
      <div className='flex'>
      <TotalStationsCard activeStationsCount={stations.length} isLoading={isStationsLoading} />
      <ActiveStationsCard activeStationsCount={filteredStations.length} isLoading={isStationsLoading} />
      </div>
    </>
  );
};

export default Admin;
