import { Container, Grid, InputBase, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getMvDetails } from '../Action/APIAction';
import ListViewContainer from './ListViewContainer';
import LeftPanelContainer from './LeftPanelContainer';
import RightPanelContainer from './RightPanelContainer';
import DetailViewContainer from './DetailViewContainer';
import { getMovies, getSearchedMovies } from '../Dispatcher/Action';
import { normalizeObj } from '../Utils/Utils';
import { searchDetails } from './../Action/APIAction';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import { selectn } from './../Utils/Utils';
let intialCall = false;
function AppContainer(props) {
    const { state, getMovies, getSearchedMovies, movies } = props;
    let [initialCallMade, setInitialCall ] = useState(false)
    useEffect(()=>{
      if(!initialCallMade){
        setInitialCall(true)
        intialCall = true;
        getMvDetails().then(
          data=>{
            getMovies(normalizeObj(data.mvDetails,'mvId'))
          })
      }
    },initialCallMade)
    const searchDv = (str) =>{
      const searchCall = str.length  == 0 ? getMvDetails : searchDetails;
      searchCall(str,Object.values(movies)).then(resp=>{
        getSearchedMovies(normalizeObj(resp.mvDetails,'mvId'))
      },err=>{
  
      })
    }
    const [searchMvStr,searchMvState] = React.useState('')
    const searchMv = (e) =>{
      const str = selectn('target.value',e) || e
      searchMvState(str)
      if(str.length > 2 || str.length == 0){
        searchDv(str);
      }
    }
    const [showSearch, canShowSearch] = React.useState(false)
    const toggleSearch = ()=>{
      canShowSearch(!showSearch)
      searchMv('')
    }
    const searchContainer = (type)=>{
      let stl ={
        display: 'flex'
      }
      if(type == 'lv'){
        stl.width = '100%'
        stl.height = 50
      }
      return (
        <Paper
              sx={stl}
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
      )
      
    }
  return (
    <Container sx={{ display: 'flex', p:0, m:0, height:'100%'}}> 
        <LeftPanelContainer />
        <RightPanelContainer />
        <ListViewContainer searchContainer={searchContainer} toggleSearch={toggleSearch} showSearch={showSearch}/>
        <DetailViewContainer searchContainer={searchContainer} />
    </Container>
    
  );
}

const mapStateToProps = state => {
  const { movies={} } = state;
    return {
        state,
        movies
      }
};

export default connect(mapStateToProps,{
  getMovies,
  getSearchedMovies
})(AppContainer);