import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { DV_HEIGHT } from '../Utils/CssCalc';
import { styled } from '@mui/material/styles';
import { getLinksLabel, getListViewColumns } from '../Utils/Utils';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Input, InputBase, Rating, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TableVirtuoso } from 'react-virtuoso';
import MenuList from './Menu';

const columns = getListViewColumns();
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    cursor:'pointer'
  },
  '&:nth-of-type(even)': {
    cursor:'pointer'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  },
}));
export default function ListView(props) {
  const [searchMvStr,searchMvState] = React.useState('')
  const { rows, openDv, deleteDv,toggleSearch, sortDetails} = props

  const editDetails = (id) =>{
    openDv('editForm',{"recordId": id});
  }

  const openDetailView = (id) =>{
    openDv('detailView',{"recordId": id});
  }
  
  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => <Table {...props} style={{ borderCollapse: 'separate' }} />,
    TableHead,
    TableRow: ({ item: _item, ...props }) => <StyledTableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <StyledTableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth}}
            onClick={column.id == 'icons' ? ()=>{} :()=>sortDetails(column.id)}
            sx={{
              backgroundColor: 'background.paper',
              fontSize: '0.8rem',
              textAlign:'left'
            }}
          >
            {column.id == 'icons' ? (
                   <IconButton type="button" sx={{ p: '3px', color:'white' }} aria-label="search" onClick={toggleSearch}>
                      <SearchIcon />
                    </IconButton>
                    ) : (
                    column.label
                  )}
          </StyledTableCell>
        ))}
      </TableRow>
    );
  }
  function rowContent(_index, row) {
    return (
      columns.map((column) => {
        const value = row[column.id];
        const links = column.type == 'url' ? decodeURI(value).split("|") : ''
        return (
          <StyledTableCell  
            key={column.id} 
            align={column.align} 
            style={{ width: column.minWidth}}
          >
            { column.type == 'icons' ? (
            <React.Fragment>
              <Tooltip title="Edit">
                <IconButton edge="end" size={"small"} onClick={()=>editDetails(row['mvId'])}>
                  <ModeEditOutlineIcon fontSize={"small"} color={'action'}  sx={{p:1}} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton edge="end"  size={"small"} onClick={()=>deleteDv(row['mvId'])}>
                  <DeleteIcon fontSize={"small"} color={'action'}  sx={{p:1}}/>
                </IconButton>
              </Tooltip>
            </React.Fragment>
          ) : column.type == 'url' ? (
            links.length < 3 ? (
              links.map((val,index)=>{
                 return (
                     <Tooltip title={column.label}>
                        <Button color="secondary" href={val} disabled={val ? false : true} >{getLinksLabel(val, column.label)} {`${links.length > 1 ? '-'+ parseInt(index+1) : ''}`}</Button>
                    </Tooltip>
                  )}
                )
              ) : (
                  <MenuList 
                      options={links}
                      title={column.label}
                  />
              )
          ) : column.type == 'rating' ? (
                <Rating 
                  name="read-only" 
                  value={value} 
                  readOnly 
                  sx={{
                    fontSize: '1.2rem'
                  }}
                />
          ) : column.type == 'date' ? (
            <Box sx={{fontSize: '1rem'}} onClick={()=>openDetailView(row['mvId'])}>{(value > 50 || (value && value.indexOf("T") !=-1)) ? new Date(value).toLocaleDateString('en-GB'): value}</Box>
          )
          : <Box sx={{fontSize: '1rem'}} onClick={()=>openDetailView(row['mvId'])}>{value}</Box>  }
          </StyledTableCell >
        )
      })
    )
      
  }
  return (
    <Paper style={{ height: "100%" }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );

  // return (
  //   <Paper>
  //     <TableContainer sx={{maxHeight: DV_HEIGHT, minHeight:DV_HEIGHT}}>
  //       <Table stickyHeader aria-label="sticky table">
  //         <TableHead>
  //           <TableRow>
  //             {columns.map((column) => (
  //               <StyledTableCell
                  
  //               >
  //                 {column.id == 'icons' ? (
  //                   <Box sx={{ml:10}}>
  //                     <Paper
  //                       sx={{ display: 'flex', width: 200 }}
  //                     >
  //                       <InputBase
  //                         sx={{ ml: 1, flex: 1 }}
  //                         placeholder="Search Here"
  //                         inputProps={{ 'aria-label': 'search here' }}
  //                         onChange={searchMv}
  //                         value={searchMvStr}
  //                     />
  //                       <IconButton type="button" sx={{ p: '3px' }} aria-label="search">
  //                         <SearchIcon />
  //                       </IconButton>
  //                   </Paper>
  //                   </Box>
  //                   ) : (
  //                   column.label
  //                 )}
  //               </StyledTableCell>
  //             ))}
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {rows
  //             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //             .map((row) => {
  //               return (
  //                 <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
  //                   {columns.map((column) => {
  //                     const value = row[column.id];
  //                     return (
  //                       <StyledTableCell  key={column.id} align={column.align}>
  //                         { column.type == 'icons' ? (
  //                         <React.Fragment>
  //                           <Tooltip title="Edit">
  //                             <IconButton edge="end" size={"small"} onClick={()=>editDetails(row['mvId'])}>
  //                               <ModeEditOutlineIcon fontSize={"small"} color={'action'}  sx={{p:1}} />
  //                             </IconButton>
  //                           </Tooltip>
  //                           <Tooltip title="Delete">
  //                             <IconButton edge="end"  size={"small"} onClick={()=>deleteDv(row['mvId'])}>
  //                               <DeleteIcon fontSize={"small"} color={'action'}  sx={{p:1}}/>
  //                             </IconButton>
  //                           </Tooltip>
  //                         </React.Fragment>
  //                       ) : column.type == 'url' ? (
  //                             <Button color="secondary" href={value} disabled={value ? false : true} >{column.label}</Button>
  //                       ) : column.type == 'rating' ? (
  //                             <Rating name="read-only" value={value} readOnly />
  //                       ) : <div onClick={()=>openDetailView(row['mvId'])}>{value}</div>  }
  //                       </StyledTableCell >
  //                     )
  //                   })}
  //                 </StyledTableRow>
  //               );
  //             })}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //     <TablePagination
  //       rowsPerPageOptions={[50, 100,200,500]}
  //       component="div"
  //       count={rows.length}
  //       rowsPerPage={rowsPerPage}
  //       page={page}
  //       onPageChange={handleChangePage}
  //       onRowsPerPageChange={handleChangeRowsPerPage}
  //     />
  //   </Paper>
  // );
}