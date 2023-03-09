/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import Toolbar from '@mui/material/Toolbar';
import LinearProgress from '@mui/material/LinearProgress';
import { IconButton, Switch, Typography } from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import { generate, normalizeObj } from '../Utils/Utils';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { LEFT_PANEL_WIDTH, isMobileSize } from '../Utils/CssCalc';
import { Tooltip } from '@mui/material';
import { ResponsiveReceiver } from '@zohodesk/components/lib/Responsive/CustomResponsive';
import { responsiveFunc } from './../Utils/Utils';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import LEDTime from './LEDTime';
import TodayIcon from '@mui/icons-material/Today';
import { getDatasByDay } from '../Utils/selector';
export default function LeftPanel(props) {
    const { window, leftPanelObj, openForm, isShowImage = false, exportData, windowSize, toggleView,getSearchedMovies, movies } = props;
    const [loading,setLoading] = React.useState(false);
    const [loadingVal,setLoadingVal] = React.useState(0)
    const moviesByDay = {};
    Object.keys(leftPanelObj['search']).map(type =>{
      if(type == 'totalMovies'){
        return '';
      }else if(type == 'allData'){
        moviesByDay[type] = movies
      }else{
        moviesByDay[type] = getDatasByDay(movies,type)
      }
    })
    const leftPanelAction = (type) =>{
      if(type == 'addForm'){
        openForm(type);
      }else if(type == 'viewToggle'){
        toggleView()
      }else if(Object.keys(leftPanelObj['search']).includes(type)){
        if(type == 'totalMovies'){
          return '';
        }
        const datas = type == 'allData' ? [] : moviesByDay[type]
        getSearchedMovies(normalizeObj(datas,'mvId'))
      }else {
        setLoading(true)
        exportData(type,setLoading,setLoadingVal)
      }
    }
    const isMobile = isMobileSize(windowSize);
    const toggleImage = () =>{
      const { showImage, hideImage } = props;
      isShowImage ? hideImage() : showImage();
    }
    const leftPanelkeys = Object.keys(leftPanelObj);
    const isTodayReleased = getDatasByDay(movies,'today').length
    const totalMoviesLen = Object.keys(movies).length
    const getListItems = (isMobileView)=>{
        const listArr = [];
        const getList = (key)=>{
            return (
                <div>
                <List>
                    {Object.keys(leftPanelObj[key]).map((option, index) => {
                      const { label, apiName, iconName } =  leftPanelObj[key][option];
                      return (
                        apiName == 'imgConfig' ?
                              generate(
                                <ListItem
                                  secondaryAction={
                                    <IconButton edge="end" aria-label="close">
                                      <Switch 
                                        checked={isShowImage}
                                        onChange={toggleImage}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                      />
                                    </IconButton>
                                  }
                                >
                                  {isMobileView ? null : (
                                      <Typography component="div">
                                      { label}
                                      </Typography>
                                  )}
                                </ListItem>
                              )
                        : (apiName == 'exportData' || apiName == 'exportProject' || apiName == 'importData') ? (
                          <Box onClick={()=>leftPanelAction(apiName)} sx={{cursor:'pointer'}}>
                            <Box  sx={{display:'inline-flex', p:2}}>
                            { apiName == 'importData' ? <CloudDownloadIcon /> : <BackupIcon/> }
                              <Typography component="h2" sx={{ml:4}} >
                                {label}
                              </Typography>
                            </Box>
                            <Box sx={{ml:9.2,mr:6}}>
                            {(apiName == 'exportProject' && loading == apiName) ? (
                                <LinearProgressWithLabel  variant="determinate" value={loadingVal}/>
                              ) : (apiName != 'exportProject' && loading == apiName) ? <LinearProgress/> : null}
                            </Box>
                          </Box>
                        ) 
                        :(
                          <Tooltip title={isMobile && label}>
                            <ListItemButton sx={{display:'flex' , pt:isMobile ? 5 : 0}} onClick={()=>leftPanelAction(apiName)}>
                                    <ListItemIcon>
                                    { iconName == 'AddToPhotosIcon' ? <AddToPhotosIcon /> 
                                      : iconName == 'viewToggle' ? <ViewAgendaIcon /> 
                                      : iconName == 'today' ? <TodayIcon />
                                      : null}
                                    </ListItemIcon>
                                    {!isMobile && <ListItemText primary={label} />}
                                    {iconName == 'today' ? 
                                    (<Typography variant="30" component="h5">
                                      {Object.keys(moviesByDay[apiName]).length}
                                    </Typography> ) :  null}
                              </ListItemButton>
                          </Tooltip>
                          ) 
                        )                      
                       })}
                </List>
                <Divider />
                </div>
            )
        }
        for(let i=0;i<leftPanelkeys.length;i++){
            listArr.push(getList(leftPanelkeys[i]));
        }
        return listArr;
    }
    const drawer = (
      <ResponsiveReceiver query={responsiveFunc}>
          {(windowObj) => {
          const { isMobileView } = windowObj;
          return (
          <>
            <Toolbar />
            <LEDTime />
            {getListItems(isMobileView)}
          </>
          )}}
        </ResponsiveReceiver>
    );
  
    const container = window !== undefined ? () => window().document.body : undefined;
  
    return (
      <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: LEFT_PANEL_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed'
            }
          }}
        >
        
            {drawer}
        </Drawer>
    )
}


function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}