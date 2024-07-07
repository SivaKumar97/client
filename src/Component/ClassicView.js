import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Rating, Modal, Tooltip, Checkbox } from '@mui/material';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NO_IMAGE, getLinks, responsiveFunc } from '../Utils/Utils';
import DownloadIcon from '@mui/icons-material/Download';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { ResponsiveReceiver } from '@zohodesk/components/lib/Responsive/CustomResponsive';
import IconButton from '@mui/material/IconButton';
import MenuList from './Menu';
import { AutoSizer, List } from 'react-virtualized';
 
const ClassicView = props => {
const [openImgPreview,toggleImgPreview] = React.useState(false);
const { openDv, updateMvDetails, formType, searchMv } = props;
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
const updateSubLink = (row) =>{
    const link = `https://raw.githubusercontent.com/SivaKumar97/JavMov/main/SrtFiles/${row['name']}_en.srt`
    row['subLink'] = link
    updateMvDetails(row)
}
const searchStr = (value)=>{
    searchMv({target:{value}})
}
  const openLink = (link) =>{
    window.open(link,"_blank")
  }
  const renderRow = (row) =>{
    const isMobileView = false
    const downloadLinks = row['downloadLink'] != '' ? decodeURI(row['downloadLink']).split("|") : []
    const subLink = row['subLink'] != '' ?decodeURI(row['subLink']).split("|") : []
    return ( 
            <Card sx={{ maxWidth: 345}}>
                <CardMedia
                    sx={{  height: isMobileView ? 100 : 230}}
                    image={canShowImage ? (row['imageComLink'] || row['imageLink']) : NO_IMAGE}
                    title="green iguana"
                    loading="lazy"
                    onClick={()=>toggleImagePreview(row)}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div"  sx={{fontSize: "1.2rem" }}>
                        {`${row['name']} ${row['releaseDate'] ? `[${new Date(row['releaseDate']).toLocaleDateString('en-GB')}]`: ''}`} 
                    </Typography>
                    <Rating name="read-only" value={row['rating']} readOnly sx={{fontSize: '1.2rem'}} />
                    <Typography variant="body2" color="text.secondary" sx={{fontSize: "1rem" }} onClick={(e)=>searchStr(row['actName'], e)}>
                        { `Act Name : ${row['actName']}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    {formType == 'showRecent' ? (
                        <MenuList 
                        options={[getLinks(row['name'])['Trailers']]}
                        title={'JT'}
                        openNewTab
                        />
                    ) : 
                    isMobileView ? (
                            <>
                                    <MenuList 
                                    options={downloadLinks}
                                    title={'Download'}
                                    isIconOnly={'downloadLink'}
                                    />
                                <MenuList 
                                    options={subLink}
                                    title={'Sub Link'}
                                    isIconOnly={'subLink'}
                                    />
                                <IconButton>
                                    <OpenInFullIcon  onClick={()=>openDetailView(row)} />
                                </IconButton>
                            </>
                    ) : (
                        <>     
                            <MenuList 
                                options={downloadLinks}
                                title={'Download'}
                                
                            />
                            <MenuList 
                                    options={subLink}
                                    title={'Sub Link'}
                                />
                            <Button color="secondary"  onClick={()=>openDetailView(row)}  >
                                <Typography noWrap sx={{fontSize:'0.9rem'}}>
                                    Open DV
                                </Typography> 
                            </Button>
                            {subLink.length == 0 && (
                                <Checkbox
                                value="checkedA"
                                inputProps={{
                                    'aria-label': 'Checkbox A',
                                }}
                                onChange={()=>updateSubLink(row)}
                            />
                            )}
                        </>
                    )}
                </CardActions>
            </Card>
    )
  }
  const { rows, canShowImage } = props;
  let CARD_WIDTH = 420
  return (
    <div style={{ marginTop: "10px", height: "80vh" }}>
  {openImgPreview && getImagePreview()}
  <AutoSizer>
    {({ height, width }) => {
      const itemsPerRow = Math.round(width / CARD_WIDTH) || 1; 
      const rowCount = Math.round(rows.length / itemsPerRow);
      let overscanRowCount = Math.round(height/CARD_WIDTH) || 1;
      overscanRowCount = overscanRowCount < 1 ? 1 : overscanRowCount;
      return (
        <div>
          <List
            width={width}
            height={height}
            rowCount={rowCount}
            rowHeight={CARD_WIDTH}
            overscanRowCount={overscanRowCount}
            rowRenderer={({ index, key, style }) => {
              const items = [];
              const fromIndex = index * itemsPerRow;
              const toIndex = Math.min(
                fromIndex + itemsPerRow,
                rows.length
              );
              for (let i = fromIndex; i < toIndex; i++) {
                let row = rows[i];
                items.push(
                <div style={{ display: "inline-block", padding:5}} key={i}>
                    {renderRow(row)}
                  </div>
                );
              }
              return (
                <div  key={key} style={style}>
                  {items}
                </div>
              );
            }}
          />
        </div>
      );
    }}
  </AutoSizer>
  </div>
  )
}

ClassicView.propTypes = {}

export default ClassicView