/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Modal, Rating, TextField} from '@mui/material';
import { getLinks, getLinksLabel, getListViewColumns, getReplaceDomains, NO_IMAGE, responsiveFunc } from '../Utils/Utils';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { ResponsiveReceiver } from '@zohodesk/components/lib/Responsive/CustomResponsive';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { getMaxWidth } from './../Utils/Utils';
import { Tooltip } from '@mui/material';
import MenuList from './Menu';
const fields = getListViewColumns('dv');
export default function DetailView(props) {
    const { 
      window, 
      rightPanelObj={},
      closeForm,
      canShowImage,
      changeDv,
      getMvId,
      movies,
      editForm,
      searchContainer,
      movieList,
      otherConfig
    } = props;
    const movieObj = movieList[otherConfig.dvId]
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
        changeDv(nextId)
    }
    const openPrev = ()=>{
        changeDv(prevId)
    }
    const extraOptions = getLinks(movieObj['name'])
    const getImagePreview = (isMobileView) =>{
        const width = canShowImage && !isMobileView ? '1000' : '400'
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
                <img width={width} src={canShowImage ? movieObj['imageLink'] : NO_IMAGE} />
            </Box>
          </Modal>
        )
    }
    return (
      <React.Fragment key={'right'}>
        <ResponsiveReceiver query={responsiveFunc}>
            {(windowObj) => {
            const { isMobileView } = windowObj;
            return (
                <Drawer
                anchor={'right'}
                open={true}
                onClose={closeForm}
                >
                {getImagePreview(isMobileView)}
                <Box
                    role="presentation"
                    sx={{ width: getMaxWidth(windowObj) }}
                    >
                        <Box sx={{ justifyContent: 'center', display:'flex', p:2, bgcolor: 'text.secondary' }}>
                            <Box sx={{ml: 10}}>
                                {!isMobileView && searchContainer()}
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
                                {movieObj.name}
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
                                {prevId != otherConfig.dvId ? (
                                    <Box sx={{
                                    // boxShadow: 3,
                                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                                    color: (theme) =>
                                    theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                    p: 1,
                                    m: 1,
                                    mt: isMobileView ? 10 : 18,
                                    mr: isMobileView ? 0 : 18,
                                    borderRadius: 2,
                                    textAlign: 'center',
                                    display:'inline-flex',
                                    cursor:'pointer'
                                }}>
                                {isMobileView ? (
                                    <IconButton sx={{height: 50}} onClick={openPrev} color="info">
                                        <NavigateBeforeIcon sx={{fontSize: '50px'}}/>
                                    </IconButton>
                                ) : (
                                    <img onClick={openPrev} width={canShowImage ? '150' : '50'} height={canShowImage ? '150' : '50'} src={canShowImage ? getReplaceDomains((movieList[prevId]['imageComLink'] || movieList[prevId]['imageLink']))  : NO_IMAGE} />
                                )}
                                {/*  */}
                                
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
                                        <img onClick={toggleImagePreview} width={isMobileView ? '200' : '450'} src={canShowImage ? getReplaceDomains((movieObj['imageComLink'] || movieObj['imageLink'])) : NO_IMAGE} />
                                </Box >
                                {nextId != otherConfig.dvId ? (
                                <Box sx={{
                                        // boxShadow: 3,
                                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                                        color: (theme) =>
                                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                        p: 1,
                                        m: 1,
                                        mt: isMobileView ? 10 : 18,
                                        mr: isMobileView ? 0 : 18,
                                        borderRadius: 2,
                                        textAlign: 'center',
                                        display:'inline-flex',
                                        cursor:'pointer'
                                    }}>
                                    {isMobileView ? (
                                    <IconButton sx={{height: 50}} aria-label="close" onClick={openNext} color="info">
                                        <NavigateNextIcon sx={{fontSize: '50px'}}/>
                                    </IconButton>
                                    ) : (
                                        <img onClick={openNext}  width={canShowImage ? '150' : '50'} height={canShowImage ? '150' : '50'} src={canShowImage ? getReplaceDomains((movieList[nextId]['imageComLink'] || movieList[nextId]['imageLink'])) : NO_IMAGE} />
                                    )}
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
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    maxHeight: 110
                                }}
                            >
                                {fields.map((field) => {
                                    const value = movieObj[field.id];
                                    if(field.type == 'icons'){
                                        return null;
                                    }
                                    const links = field.type == 'url' ? decodeURI(value).split("|") : ''
                                    return (
                                            <Box sx={{p:2,m:2,borderRadius: 2,boxShadow: 1}}>
                                                {field.type == 'url' ? (
                                                    links.length < 3 ? (
                                                         links.map((val,index)=>{
                                                            return (
                                                                <Tooltip title={field.label}>
                                                                   <Button color="secondary" href={val} disabled={val ? false : true} >{getLinksLabel(val, field.label)} {`${links.length > 1 ? '-'+ parseInt(index+1) : ''}`}</Button>
                                                               </Tooltip>
                                                            )}
                                                        )
                                                    ) : (
                                                        <MenuList 
                                                            options={links}
                                                            title={field.label}
                                                        />
                                                )
                                                ) : field.type == 'rating' ? (
                                                    <Rating name="read-only" value={value} readOnly />
                                                ) : field.type == 'date' ? (
                                                    <TextField
                                                        label={field.label}
                                                        sx={{display:'flex'}}
                                                        value={(value > 50 || (value && value.indexOf("T") !=-1)) ? new Date(value).toLocaleString('en-GB', {hour12: true}): value}
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                    />
                                                ) : 
                                                    <TextField
                                                        label={field.label}
                                                        sx={{display:'flex'}}
                                                        value={value}
                                                        InputProps={{
                                                            readOnly: true
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
                                        display: isMobileView ? 'grid' : 'inline-flex',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        mt:isMobileView ? 30 : 35,
                                        ml:isMobileView ? 0 : 8
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
            )}}
        </ResponsiveReceiver>
      </React.Fragment>
    )
}
