import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Rating, Modal, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NO_IMAGE, responsiveFunc } from '../Utils/Utils';
import DownloadIcon from '@mui/icons-material/Download';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { ResponsiveReceiver } from '@zohodesk/components/lib/Responsive/CustomResponsive';
import IconButton from '@mui/material/IconButton';
 
const ClassicView = props => {
const [openImgPreview,toggleImgPreview] = React.useState(false);
const { openDv } = props;
const toggleImagePreview = (row={})=>{
    toggleImgPreview(!row['imageLink'])
}
const openDetailView = (row) =>{
    openDv('detailView',{"recordId": row['mvId']});
  }
const getImagePreview = () =>{
    const width = canShowImage ?'1000' : '400'
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', 
        width: width,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        };
    return (
        <Modal
        open={true}
        onClose={toggleImagePreview}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <img width={width} src={canShowImage ? openImgPreview : NO_IMAGE} />
        </Box>
        </Modal>
    )
}
  const openLink = (link) =>{
    window.open(link,"_blank")
  }
  const { rows, canShowImage } = props;
  return (
    <ResponsiveReceiver query={responsiveFunc}>
        {({ isMobileView }) => {
          return (
                <Box sx={{height:'100%', background:'#ffff'}} >
                    {openImgPreview && getImagePreview()}
                    <Box sx={{m:isMobileView ? 0 : 2}}>
                        <Grid container spacing={isMobileView ? 3 : 7}>
                                {rows.map((row)=>{
                                    return ( 
                                    <Grid item xs={7} md={5} lg={3}>
                                            <Card sx={{ maxWidth: 345 }}>
                                                <CardMedia
                                                    sx={{  height: isMobileView ? 100 : 230}}
                                                    image={canShowImage ? (row['imageComLink'] || row['imageLink']) : NO_IMAGE}
                                                    title="green iguana"
                                                    onClick={()=>toggleImagePreview(row)}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div"  sx={{fontSize: "1.2rem" }}>
                                                        {`${row['name']} ${row['releaseDate'] ? `[${new Date(row['releaseDate']).toLocaleDateString('en-GB')}]`: null}`} 
                                                    </Typography>
                                                    <Rating name="read-only" value={row['rating']} readOnly sx={{fontSize: '1.2rem'}} />
                                                    <Typography variant="body2" color="text.secondary" sx={{fontSize: "1rem" }}>
                                                        { `Act Name : ${row['actName']}`}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    {isMobileView ? (
                                                            <>
                                                                <IconButton>
                                                                    <DownloadIcon  onClick={()=>{openLink(row['downloadLink'])}} />
                                                                </IconButton>
                                                                <IconButton>
                                                                    <ClosedCaptionIcon  onClick={()=>{openLink(row['subLink'])}} />
                                                                </IconButton>
                                                                <IconButton>
                                                                    <OpenInFullIcon  onClick={()=>openDetailView(row)} />
                                                                </IconButton>
                                                            </>
                                                    ) : (
                                                        <>
                                                                <Button noWrap color="secondary" href={row['downloadLink']} disabled={row['downloadLink'] ? false : true} > 
                                                                    <Typography noWrap sx={{fontSize:'1rem'}}>
                                                                        Download
                                                                    </Typography>
                                                                    </Button>
                                                                <Button color="secondary" noWrap href={row['subLink']} disabled={row['subLink'] ? false : true} > 
                                                                    <Typography noWrap sx={{fontSize:'1rem'}}>
                                                                        Sub Link
                                                                    </Typography>
                                                                </Button>
                                                                <Button color="secondary"  onClick={()=>openDetailView(row)}  >
                                                                    <Typography noWrap sx={{fontSize:'1rem'}}>
                                                                        Open DV
                                                                    </Typography> 
                                                                </Button>
                                                        </>
                                                    )}
                                                </CardActions>
                                            </Card>
                                    </Grid>
                                    )
                                })
                            }
                        
                        </Grid>
                    </Box>
                </Box>
            )}}
    </ResponsiveReceiver>
  )
}

ClassicView.propTypes = {}

export default ClassicView