/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import Toolbar from '@mui/material/Toolbar';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { IconButton, Switch, Typography } from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import { generate } from '../Utils/Utils';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { LEFT_PANEL_WIDTH } from '../Utils/CssCalc';
import style from './LeftPanel.css'

export default function LeftPanel(props) {
    const { window, leftPanelObj, openForm, isShowImage = false, exportData } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const [loadingVal,setLoadingVal] = React.useState(0)
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    }; 
    const leftPanelAction = (type) =>{
      if(type == 'addForm'){
        openForm(type);
      }else {
        setLoading(true)
        exportData(type,setLoading,setLoadingVal)
      }
    }
    const toggleImage = () =>{
      const { showImage, hideImage } = props;
      isShowImage ? hideImage() : showImage();
    }
    const leftPanelkeys = Object.keys(leftPanelObj);
    const getListItems = ()=>{
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
                                    <Typography component="div">
                                    { label}
                                    </Typography>
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
                            <ListItem key={label} disablePadding onClick={()=>leftPanelAction(apiName)} >
                            <ListItemButton sx={{display:'flex'}}>
                                <ListItemIcon>
                                { iconName == 'AddToPhotosIcon' ? <AddToPhotosIcon /> : null}
                                </ListItemIcon>
                                <ListItemText primary={label} />
                            </ListItemButton>
                            </ListItem>
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
      <React.Fragment>
        <Toolbar />
        {getListItems()}
      </React.Fragment>
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