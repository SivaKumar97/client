import { Container, InputBase, IconButton } from '@mui/material';
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
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
    const size = useWindowSize();
    const [searchMvStr,searchMvState] = React.useState('')
    const searchMv = (e) =>{
      const str = selectn('target.value',e) || ''
      searchMvState(str)
      if(str.length > 2 || str.length == 0){
        searchDv(str);
      }
    }
    const [showSearch, canShowSearch] = React.useState(false)
    const toggleSearch = ()=>{
      canShowSearch(!showSearch)
      searchMv({target : {value: ''}})
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
        <LeftPanelContainer windowSize={size}/>
        <RightPanelContainer />
        <ListViewContainer searchContainer={searchContainer} toggleSearch={toggleSearch} showSearch={showSearch}/>
        <DetailViewContainer searchContainer={searchContainer} />
    </Container>
      // <Box sx={{height: maxHeight, display:'inline-flex'}}>
      //   <Box sx={{width:'15%', background:'Yellow'}}>
      //     Testing
      //   </Box>
      //   <Box sx={{width:'84%', ml:"1%", background:'red'}}>
      //     Testing
      //   </Box>
      // </Box>
    
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

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}