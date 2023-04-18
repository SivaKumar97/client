/* eslint-disable */
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { LEFT_PANEL_WIDTH, isMobileSize } from '../Utils/CssCalc';
import { ResponsiveReceiver } from '@zohodesk/components/lib/Responsive/CustomResponsive';
import LEDTime from './LEDTime';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@mui/material';


const useStyles = makeStyles({
    marquee: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      height: '100%'
    },
    image: {
      marginBottom: '1rem',
      objectFit: 'contain',
      margin: '0.5rem',
      cursor: 'pointer'
    },
    '@keyframes marquee': {
      '0%': {
        transform: 'translateX(100%)',
      },
      '100%': {
        transform: 'translateX(-100%)',
      },
    },
  });
export default function MovieList(props) {
    const { datas, movies, isTodayReleased, openDetailView } = props;
    const classes = useStyles();
    return (
        <Box>
            <marquee className={classes.marquee}>
                {datas.map((movie) => {
                    const { rating, imageComLink,imageLink, name, mvId} = movie;
                    if(rating > 3 || isTodayReleased){
                        return (
                            <>
                                <img width="200px" height="150px" src={imageComLink || imageLink} alt={name} onClick={()=>openDetailView(mvId)} className={classes.image} />
                            </>
                    )
                    }
                    
                })}
            </marquee>
        </Box>
    )
}


