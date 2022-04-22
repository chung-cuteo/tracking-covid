import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { getMapDataByCountryId } from '../apis';
import LineChart from './LineChart';
import HighMaps from './HighMaps';

const Summary = ({ countryId, report }) => {
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    if (!countryId) return
    const getCountryId = async () => {
      try {
      const res = await getMapDataByCountryId(countryId)
      setMapData(res);
      } catch (error) {
        console.log(error)
      }
    }
    getCountryId()
  }, [countryId]);

  return (
    <div style={{ height: '500px', marginTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart data={report} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMaps mapData={mapData} />
        </Grid>
      </Grid>
    </div>
  );
}
export default  Summary
