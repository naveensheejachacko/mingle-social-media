import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';



const useStyles = styled((theme) => ({
    card: {
      minWidth: 275,
      [theme.breakpoints.down('sm')]: {
        minWidth: 'auto',
        margin: '0 auto',
      },
    },
  }));
  
function NoDataFound({ data }) {
    const classes = useStyles();

    return (
        <Card>
            <CardContent className='nodata'>
                <Box textAlign="center">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        No {data} Available !!!
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default NoDataFound