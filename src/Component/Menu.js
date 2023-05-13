import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { getLinksLabel } from '../Utils/Utils';
import DownloadIcon from '@mui/icons-material/Download';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export default function MenuList(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { title, options=[], isIconOnly=false, openNewTab=false } = props;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if(options.length == 1){
      return globalThis.window.open(options[0],'_blank')
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    const link = e.target.getAttribute('href') || ''
    link && window.open(link,isIconOnly || openNewTab ? '_blank' : '_self')
  };
  const IconBtn = ()=>{
    if(isIconOnly == 'downloadLink'){
        return <DownloadIcon />
    }else if(isIconOnly == 'subLink'){
        return <ClosedCaptionIcon />
    }
  }
  return (
    <div>
     {isIconOnly ? (
        <IconButton 
            disabled={options.length == 0} 
            onClick={handleClick}
        >
            {IconBtn()}
        </IconButton>
        
     ) : (
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                noWrap 
                color="secondary"
                disabled={options.length == 0}
            >
                <Typography noWrap sx={{fontSize:'0.9rem'}}>
                    {title}
                </Typography>
            </Button>
     )}
      
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {options.map((option,index)=>{
            return (<MenuItem onClick={handleClose} href={option}>{getLinksLabel(option, title)} {`${options.length > 1 ? '-'+ parseInt(index+1) : ''}`}</MenuItem>)
        })}
      </Menu>
    </div>
  );
}