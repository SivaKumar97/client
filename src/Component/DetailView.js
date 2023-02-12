/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import LoadingButton from '@mui/lab/LoadingButton';
import ListItemButton from '@mui/material/ListItemButton';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Button, CardContent, FormControl, FormLabel, Modal, Rating, TextField, Typography } from '@mui/material';
import { generate, getLinks, getListViewColumns, NO_IMAGE, selectn } from '../Utils/Utils';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Paper from '@mui/material/Paper';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const fields = getListViewColumns();
export default function DetailView(props) {
    const { 
      window, 
      rightPanelObj={},
      formType, 
      closeForm,
      openForm,
      canShowImage,
      movieDetail,
      changeDv,
      getMvId,
      movies,
      editForm,
      searchContainer
    } = props;
    const prevId = getMvId('prev');
    const nextId = getMvId('next');
    // const [searchMvStr,searchMvState] = React.useState('')
    const [openImgPreview,toggleImgPreview] = React.useState(false);
    const toggleImagePreview = ()=>{
        toggleImgPreview(!openImgPreview)
    }
    // const searchMv = (e) =>{
    //     const str = e.target.value
    //     searchMvState(str)
    //     if(str.length > 2 || str.length == 0){
    //       searchDv(str);
    //     }
    
    //   }
    const openNext = ()=>{
        changeDv('next')
    }
    const openPrev = ()=>{
        changeDv('prev')
    }
    const extraOptions = getLinks(movieDetail['name'])
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
            open={openImgPreview}
            onClose={toggleImagePreview}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <img width={width} src={canShowImage ? movieDetail['imageLink'] : NO_IMAGE} />
            </Box>
          </Modal>
        )
    }
    return (
      <React.Fragment key={'right'}>
        <Drawer
          anchor={'right'}
          open={formType == 'detailView'}
          onClose={closeForm}
        >
        {getImagePreview()}
          <Box
            role="presentation"
            sx={{ width:1200 }}
            >
                <Box sx={{ justifyContent: 'center', display:'flex', p:2, bgcolor: 'text.secondary' }}>
                    <Box sx={{ml:10}}>
                        {searchContainer()}
                    </Box>
                    <Box 
                        sx={{
                            textTransform: 'uppercase',
                            fontSize: 'h6.fontSize',
                            fontWeight: 'bold', 
                            letterSpacing: 6,
                            color:'background.paper',
                            width:'100%',                            
                            textAlign: 'center'
                        }}>
                           {movieDetail.name}
                           <IconButton edge="end" sx={{ml:2}} aria-label="close" onClick={editForm} color="info">
                                <ModeEditOutlineIcon sx={{color:'background.paper'}}/>
                            </IconButton>
                    </Box>
                    <Box sx={{
                        justifyContent: 'flex-end',
                        flexShrink: 1
                    }}>
                        <IconButton edge="end" aria-label="close" onClick={closeForm} color="info">
                            <CloseIcon sx={{color:'background.paper'}}/>
                        </IconButton>
                    </Box>

                </Box>
                <Box sx={{
                            justifyContent: 'center',
                            display:'flex'
                    }}>
                        {prevId != movieDetail['mvId'] ? (
                            <Box sx={{
                            // boxShadow: 3,
                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                            color: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                            p: 1,
                            m: 1,
                            mt:18,
                            mr: 18,
                            borderRadius: 2,
                            textAlign: 'center',
                            display:'inline-flex',
                            cursor:'pointer'
                        }}>
                        {/* <IconButton sx={{height: 50}} aria-label="close" onClick={openPrev} color="info">
                            <NavigateBeforeIcon sx={{fontSize: '50px'}}/>
                        </IconButton> */}
                        <img onClick={openPrev} width={canShowImage ? '150' : '50'} height={canShowImage ? '150' : '50'} src={canShowImage ? movies[prevId]['imageLink'] : NO_IMAGE} />
                        </Box>
                        ) : null}
                        
                        <Box
                            sx={{
                                boxShadow: 3,
                                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                                color: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                p: 1,
                                m: 1,
                                borderRadius: 2,
                                textAlign: 'center',
                                display:'inline-flex',
                                cursor:'pointer'
                            }}
                        >
                                <img onClick={toggleImagePreview} width={canShowImage ? '450' : '300'} src={canShowImage ? movieDetail['imageLink'] : NO_IMAGE} />
                        </Box >
                        {nextId != movieDetail['mvId'] ? (
                        <Box sx={{
                                // boxShadow: 3,
                                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                                color: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                p: 1,
                                m: 1,
                                mt:18,
                                ml: 18,
                                borderRadius: 2,
                                textAlign: 'center',
                                display:'inline-flex',
                                cursor:'pointer'
                            }}>
                        {/* <IconButton sx={{height: 50}} aria-label="close" onClick={openNext} color="info">
                            <NavigateNextIcon sx={{fontSize: '50px'}}/>
                        </IconButton> */}
                        <img onClick={openNext}  width={canShowImage ? '150' : '50'} height={canShowImage ? '150' : '50'} src={canShowImage ? movies[nextId]['imageLink'] : NO_IMAGE} />
                        </Box>
                        ):null}
                </Box>
                <Box
                        sx={{
                            // boxShadow: 3,
                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                            color: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                            textAlign: 'center',
                            display:'grid',
                            gap: 1,
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            maxHeight: 110
                        }}
                    >
                        {fields.map((field) => {
                            const value = movieDetail[field.id];
                            if(field.type == 'icons'){
                                return null;
                            }
                            return (
                                    <Box sx={{p:2,m:2,borderRadius: 2,boxShadow: 1}}>
                                        {field.type == 'url' ? (
                                            <Button color="secondary" href={value} disabled={value ? false : true} >{field.label}</Button>
                                        ) : field.type == 'rating' ? (
                                            <Rating name="read-only" value={value} readOnly />
                                        ) : 
                                            <TextField
                                                label={field.label}
                                                sx={{display:'flex'}}
                                                value={value}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                            }
                                    </Box>
                                )}
                            )}
                        </Box>
                        {canShowImage ? (
                            <Box
                            sx={{
                                // boxShadow: 3,
                                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                                color: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                textAlign: 'center',
                                display:'inline-flex',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                mt:35,
                                ml:8
                            }}
                        >
                            {Object.keys(extraOptions).map((site) => {
                                return (
                                        <Box sx={{p:2,m:2,borderRadius: 2,boxShadow: 1}}>
                                                <Button color="secondary" href={extraOptions[site]} target="_blank" >{site}</Button>
                                        </Box>
                                    )}
                                )}
                        </Box>
                        ) : null}
            </Box>
            
        </Drawer>
      </React.Fragment>
    )
}
