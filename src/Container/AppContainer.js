import { Container, InputBase, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getCountDetails, getMvDetails } from '../Action/APIAction';
import ListViewContainer from './ListViewContainer';
import LeftPanelContainer from './LeftPanelContainer';
import RightPanelContainer from './RightPanelContainer';
import DetailViewContainer from './DetailViewContainer';
import { getMovies, getSearchedMovies, getSortedMovies } from '../Dispatcher/Action';
import { getMoviesLst, normalizeObj } from '../Utils/Utils';
import { searchDetails, updateAllMovies } from './../Action/APIAction';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import { selectn } from './../Utils/Utils';
let intialCall = false;
function AppContainer(props) {
    const { state, getMovies, getSearchedMovies, movies, updateAllMovies, getSortedMovies } = props;
    let [initialCallMade, setInitialCall ] = useState(false)
    const [movieList, setMovieList] = useState([]);
    const [otherConfig, setOtherConfig] = useState({
      formPage: '', 
      editId: '', 
      dvId: '', 
      viewType: 'tableView',
      imagePreview: false,
      isNoMoreData: false
    })
    const [ countObj, setCountObj ] = useState({
      all_movies:0, 
      today:0,
      thisWeek:0,
      nextWeek:0,
      otherRelease:0,
      releasedMovies:0
    })
    const [configState, setConfigState] = useState({
      from: 0,
      searchStr: '',
      sortField: 'ID',
      sortOrder:'DESC'
    })
    const [searchMvStr,searchMvState] = React.useState('')
    const updateOtherConfig = (obj) =>{
      setOtherConfig({...otherConfig, ...obj})
    }
    const updateConfig = (obj)=>{
      const {from=0, searchStr='', sortField='ID', sortOrder='DESC', viewType="tableView"} = obj;
      if(from == 0){
        setMovieList([]);
      }
      if(searchStr){
        searchMvState('')
      }
      setConfigState({...configState, ...obj})
    }
    useEffect(()=>{
        getMvDetails(configState).then(
          data=>{
            updateOtherConfig({isNoMoreData: data.length < 50})
            console.log([...movieList,...data])
            setMovieList([...movieList, ...data])
          })
    },[configState])
    useEffect(()=>{
      getCountDetails().then(data=>{
        setCountObj(data)
      })
    },[])
    const size = useWindowSize();
    const searchMv = (e) =>{
      const searchStr = selectn('target.value',e) || ''
      searchMvState(searchStr)
      if(searchStr.length > 2 || searchStr.length == 0){
        updateConfig({from: 0, searchStr});
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
                value={searchMvStr || configState.searchStr}
            />
              <IconButton type="button" sx={{ p: '3px' }} aria-label="search" onClick={toggleSearch}>
                <SearchIcon />
              </IconButton>
          </Paper>
      )
      
    }
  return (
    <Container sx={{ display: 'flex', p:0, m:0, height:'100%'}}> 
        <LeftPanelContainer 
          windowSize={size} 
          updateOtherConfig={updateOtherConfig} 
          otherConfig={otherConfig}
          countObj={countObj}
          updateConfig={updateConfig}
        />
        <RightPanelContainer 
          setMovieList={setMovieList}
          updateOtherConfig={updateOtherConfig} 
          movieList={movieList} 
          otherConfig={otherConfig}
        />
        <ListViewContainer 
          setMovieList={setMovieList} 
          updateOtherConfig={updateOtherConfig} 
          otherConfig={otherConfig}  
          movieList={movieList} 
          configState={configState} 
          updateConfig={updateConfig} 
          searchContainer={searchContainer} 
          searchMv={searchMv} 
          toggleSearch={toggleSearch} 
          showSearch={showSearch}
        />
        {otherConfig.dvId != '' ? (
          <DetailViewContainer
            updateOtherConfig={updateOtherConfig} 
            otherConfig={otherConfig}
            movieList={movieList}
            searchContainer={searchContainer} 
          />
        ) : null}
          
        
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
  getSearchedMovies,
  updateAllMovies,
  getSortedMovies
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