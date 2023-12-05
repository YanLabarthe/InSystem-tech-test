import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, TextField, Checkbox, debounce, IconButton,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from 'react-router-dom';


interface Station {
    code_station: string;
    libelle_station: string;
    libelle_commune: string;
    libelle_departement: string;
    libelle_region: string;
  }
  
  interface FilterState {
    station: string;
    commune: string;
    department: string;
    region: string;
  }
  

const StationsTable: React.FC = () => {
  const [allStations, setAllStations] = useState<Station[]>([]);
  const [displayStations, setDisplayStations] = useState<Station[]>([]);
  const [page, setPage] = useState<number>(1);
  
  const [filter, setFilter] = useState<FilterState>({ station: '', commune: '', department: '', region: '' });
  const [selectedStations, setSelectedStations] = useState<string[]>([]);
  const stationsPerPage = 20;


  useEffect(() => {
    const fetchStations = async () => {
      const response = await axios.get(`https://hubeau.eaufrance.fr/api/v1/temperature/station`);
      setAllStations(response.data.data);
      setDisplayStations(response.data.data.slice(0, stationsPerPage));
    };
    fetchStations();
  }, []);

  const applyFilters = debounce(() => {
    const filtered = allStations.filter(station => 
      (station.libelle_station?.toLowerCase().includes(filter.station.toLowerCase()) || filter.station === '') &&
      (station.libelle_commune?.toLowerCase().includes(filter.commune.toLowerCase()) || filter.commune === '') &&
      (station.libelle_departement?.toLowerCase().includes(filter.department.toLowerCase()) || filter.department === '') &&
      (station.libelle_region?.toLowerCase().includes(filter.region.toLowerCase()) || filter.region === '')
    );
    setDisplayStations(filtered.slice(0, stationsPerPage));
  }, 500);
  

  useEffect(() => {
    applyFilters();
  }, [applyFilters, filter]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    const startIndex = (newPage - 1) * stationsPerPage;
    setDisplayStations(allStations.slice(startIndex, startIndex + stationsPerPage));
  };


  const handleSelectStation = (code: string) => {
    setSelectedStations(
      selectedStations.includes(code) 
      ? selectedStations.filter(selectedCode => selectedCode !== code)
      : [...selectedStations, code]
    );
  };

  return (
    <>
    <h1 className='pb-4'>Toutes les stations</h1>
      <TextField label="Station" name="station" onChange={handleFilterChange} />
      <TextField label="Commune" name="commune" onChange={handleFilterChange} />
      <TextField label="Department" name="department" onChange={handleFilterChange} />
      <TextField label="Region" name="region" onChange={handleFilterChange} />
      <TableContainer component={Paper}>
        <Table aria-label="stations table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Station</TableCell>
              <TableCell>Commune</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Region</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayStations.map((station) => (
              <TableRow key={station.code_station}>
                <TableCell padding="checkbox">
                  <Checkbox 
                    checked={selectedStations.includes(station.code_station)}
                    onChange={() => handleSelectStation(station.code_station)}
                  />
                </TableCell>
                  <TableCell><Link to={`/stations/${station.code_station}`}>{station.libelle_station}</Link></TableCell>
                <TableCell>{station.libelle_commune}</TableCell>
                <TableCell>{station.libelle_departement}</TableCell>
                <TableCell>{station.libelle_region}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="download"
                    onClick={() => window.open(`https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station=${station.code_station}&size=5&sort=desc&pretty`, '_blank')}
                    >
                    <DownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination count={Math.ceil(allStations.length / stationsPerPage)} page={page} onChange={handleChangePage} />
    </>
  );
};

export default StationsTable;
