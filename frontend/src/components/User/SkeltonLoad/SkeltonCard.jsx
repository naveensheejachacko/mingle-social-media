import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';



function Media(props) {

  return  (
     <Grid item xs={12} sm={6} md={4}> 
  <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>
    <Skeleton variant="rectangular" width={210} height={118} />
    <Box sx={{ pr: 2 }}>
      <Typography gutterBottom variant="body2"></Typography>
      <Typography display="block" variant="caption" color="text.secondary"></Typography>
      <Typography display="block" variant="caption" color="text.secondary"></Typography>
    </Box>
    <Box sx={{ pt: 0.5 }}>
      <Skeleton />
      <Skeleton width="60%" />
    </Box>
  </Box>
</Grid>
);
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function YouTube() {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Grid container spacing={2}> {/* Add the Grid container with spacing */}
        <Media loading />
        <Media />
        <Media />
      </Grid>
    </Box>
  );
}
