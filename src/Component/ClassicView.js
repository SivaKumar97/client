import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Rating, Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NO_IMAGE } from '../Utils/Utils';

 
const ClassicView = props => {
const [openImgPreview,toggleImgPreview] = React.useState(false);
const toggleImagePreview = (row={})=>{
    toggleImgPreview(!row['imageLink'])
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
  const { rows, canShowImage } = props;
  return (
    <Box sx={{height:'100%', background:'#ffff'}} >
        {openImgPreview && getImagePreview()}
        <Box sx={{m:2}}>
            <Grid container spacing={7}>
                    {rows.map((row)=>{
                        return ( 
                        <Grid item xs={7} md={5} lg={3}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        sx={{  height: canShowImage ? 230 : 230}}
                                        image={canShowImage ? row['imageLink'] : NO_IMAGE}
                                        title="green iguana"
                                        onClick={()=>toggleImagePreview(row)}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                        {row['name']}
                                        </Typography>
                                        <Rating name="read-only" value={row['rating']} readOnly />
                                        <Typography variant="body2" color="text.secondary">
                                        Act Name : {row['actName']}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button color="secondary" href={row['downloadLink']} disabled={row['downloadLink'] ? false : true} >Download</Button>
                                        <Button color="secondary" href={row['subLink']} disabled={row['subLink'] ? false : true} >Sub Link</Button>
                                    </CardActions>
                                </Card>
                        </Grid>
                        )
                    })
                }
               
            </Grid>
        </Box>
    </Box>
  )
}

ClassicView.propTypes = {}

export default ClassicView