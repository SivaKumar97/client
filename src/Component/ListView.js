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
import { getListViewColumns } from '../Utils/Utils';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Input, InputBase, Rating, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [searchMvStr,searchMvState] = React.useState('')
  const { datas, openDv, deleteDv,searchDv, sortDetails} = props
  const rows = Object.values(datas);
  const searchMv = (e) =>{
    const str = e.target.value
    searchMvState(str)
    if(str.length > 2 || str.length == 0){
      searchDv(str);
    }

  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editDetails = (id) =>{
    openDv('editForm',{"recordId": id});
  }

  const openDetailView = (id) =>{
    openDv('detailView',{"recordId": id});
  }

  return (
    <Paper>
      <TableContainer sx={{maxHeight: DV_HEIGHT, minHeight:DV_HEIGHT}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth}}
                  onClick={column.id == 'icons' ? ()=>{} :()=>sortDetails(column.id)}
                >
                  {column.id == 'icons' ? (
                    <Box sx={{ml:10}}>
                      <Paper
                        sx={{ display: 'flex', width: 200 }}
                      >
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="Search Here"
                          inputProps={{ 'aria-label': 'search here' }}
                          onChange={searchMv}
                          value={searchMvStr}
                      />
                        <IconButton type="button" sx={{ p: '3px' }} aria-label="search">
                          <SearchIcon />
                        </IconButton>
                    </Paper>
                    </Box>
                    ) : (
                    column.label
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell  key={column.id} align={column.align}>
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
                              <Button color="secondary" href={value} disabled={value ? false : true} >{column.label}</Button>
                        ) : column.type == 'rating' ? (
                              <Rating name="read-only" value={value} readOnly />
                        ) : <div onClick={()=>openDetailView(row['mvId'])}>{value}</div>  }
                        </StyledTableCell >
                      )
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[50, 100,200,500]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}