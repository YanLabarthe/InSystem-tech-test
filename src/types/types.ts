export interface WaterStation {
    code_station: string;
    libelle_station: string;
    date_mesure_temp: string;
    resultat: number;
  }
  

export interface Region {
    code: string;
    label: string;
  }
  
export interface Department {
    code: string;
    label: string;
  }
  
export interface StationGeometry {
    type: string;
    crs: {
      type: string;
      properties: {
        name: string;
      };
    };
    coordinates: number[];
  }

export interface StationReading {
  code_station: string;
  libelle_station: string;
  uri_station: string;
  localisation: string;
  longitude: number;
  latitude: number;
  code_commune: string;
  libelle_commune: string;
  code_cours_eau: string | null;
  libelle_cours_eau: string | null;
  uri_cours_eau: string | null;
  geometry: {
    type: string;
    crs: {
      type: string;
      properties: {
        name: string;
      };
    };
    coordinates: [number, number];
  };
  code_parametre: string;
  libelle_parametre: string;
  date_mesure_temp: string;
  heure_mesure_temp: string;
  resultat: number;
  code_unite: string;
  symbole_unite: string;
  code_qualification: string;
  libelle_qualification: string;
}

  
export interface Station {
    code_station: string;
    libelle_station: string;
    uri_station: string;
    localisation: string;
    coordonnee_x: number;
    coordonnee_y: number;
    code_type_projection: number;
    longitude: number;
    latitude: number;
    code_commune: string;
    libelle_commune: string;
    code_departement: string;
    libelle_departement: string;
    code_region: string;
    libelle_region: string;
    code_troncon_hydro: string | null;
    code_cours_eau: string | null;
    libelle_cours_eau: string | null;
    uri_cours_eau: string | null;
    code_masse_eau: string;
    libelle_masse_eau: string | null;
    uri_masse_eau: string;
    code_sous_bassin: string | null;
    libelle_sous_bassin: string | null;
    code_bassin: string | null;
    libelle_bassin: string | null;
    uri_bassin: string | null;
    pk: number | null;
    altitude: number;
    date_maj_infos: string;
    geometry: StationGeometry;
    libelle_type_projection: string;
    date_mise_en_service: string;
    date_mise_hors_service: string | null;
    code_eu_masse_eau: string | null;
    code_eu_bassin: string | null;
    superficie_topo: number | null;
    superficie_reelle: number;
    premier_mois_etiage: string | null;
    commentaire: string | null;
    nature_station: string;
    type_entite_hydro: string;
    uri_sous_bassin: string | null;
  }