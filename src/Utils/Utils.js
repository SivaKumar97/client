import * as React from 'react';
export const NO_IMAGE = 'https://www.freeiconspng.com/uploads/no-image-icon-15.png'

export let windowType = '' ;
export const getLeftPanelObj = () => {
    return {
        'movies' : {
            'addForm' : {
            label : 'Add Form',
            apiName: 'addForm',
            iconName: 'AddToPhotosIcon'
            }
        },
        'config' : {
            'imgConfig' : {
                label: 'Image Config',
                apiName: 'imgConfig'
            },
            'classicView' : {
                label: 'Toggle View',
                apiName: 'viewToggle',
                iconName: 'viewToggle'
            }           
        },
        'search':{
            'all_movies': {
                label: 'All Data',
                apiName: 'all_movies',
                iconName: 'today'
            },
            'today': {
                label: 'Today Release',
                apiName: 'today',
                iconName: 'today'
            },
            'thisWeek': {
                label: 'This Week Release',
                apiName: 'thisWeek',
                iconName: 'today'
            },
            'nextWeek':{
                label: 'Next Week Release',
                apiName: 'nextWeek',
                iconName: 'today'
            },
            'otherRelease':{
                label: 'Other Releases',
                apiName: 'otherRelease',
                iconName: 'today'
            },
            'releasedMovies':{
                label: 'Released Movies',
                apiName: 'releasedMovies',
                iconName: 'today'
            }
        },
        'recentMovie':{
            'getRecent': {
                label: 'Get Recent',
                apiName: 'getRecent',
            },
            'showRecent': {
                label: 'Show Recent',
                apiName: 'showRecent',
            },
            'deleteByRating': {
                label: 'Delete By Rating',
                apiName: 'deleteByRating',
            }
        }
        // 'google' : {
        //     'importData' : {
        //         label: 'Import Data',
        //         apiName: 'importData',
        //         iconName: 'importIcon'
        //     },
        //     'exportData' : {
        //         label: 'Export Data',
        //         apiName: 'exportData',
        //         iconName: 'exportIcon'
        //     },
        //     'exportProject' : {
        //         label: 'Export Project',
        //         apiName: 'exportProject',
        //         iconName: 'exportIcon'
        //     }
        // }
    }
}
export const getRightPanelObj = (type,mvObj={}) =>{
    const fieldObj = { 
        'addForm' : {
            'name' : {
                'fieldName' : 'Name',
                'type' : 'autocompleteText',
                'apiName' : 'movie_id',
                'value' : mvObj['name'] || ''
            },
            'imageLink' : {
                'fieldName' : 'Image',
                'type' : 'imageLink',
                'apiName' : 'image_link',
                'value' : mvObj['imageLink'] || ''
            },
            'actName' : {
                'fieldName' : 'Act Name',
                'type' : 'autocompleteText',
                'apiName' : 'actor_name',
                'value' : mvObj['actName'] ||''
            },
            'releaseDate':{
                'fieldName' : 'Release Date',
                'type' : 'releaseDate',
                'apiName' : 'release_date',
                'value' : mvObj['releaseDate'] ? reFormatDate(mvObj['releaseDate']) : ''
            },
            'downloadLink' : {
                'fieldName' : 'DownloadLink',
                'type' : 'url',
                'apiName' : 'download_link',
                'value' : mvObj['downloadLink'] || ''
            },
            'subLink' : {
                'fieldName' : 'SubLink',
                'type' : 'url',
                'apiName' : 'subtitle_link',
                'value' : mvObj['subLink'] || ''
            },
            'rating' : {
                'fieldName' : 'Rating',
                'type' : 'rating',
                'apiName' : 'rating',
                'value' : mvObj['rating'] || ''
            },
        }
    }

    if(type == 'editForm'){
        return { ...fieldObj['addForm'],
        'mvId' : {
            'apiName' : 'mvId',
            'fieldName' : 'Movie ID',
            'type' : 'hidden',
            'value' : mvObj['mvId'] 
          }
        }
    }else{
        return fieldObj[type]
    }
}
export const getListViewColumns = (type) =>{
    const columns =  [
                { 
                    id: 'date', 
                    label: 'Date',
                    type:'date',
                    apiKey: 'added_date'
                    // minWidth: 50 
                },
                { 
                    id: 'name',
                    label: 'Name',  
                    type:'text',
                    apiKey: 'movie_id'
                    // minWidth: 100
                 },
                { 
                    id: 'actName', 
                    label: 'Act Name', 
                    apiKey: 'actor_name',
                    // minWidth: 150 , 
                    type:'text' },
                { 
                    id: 'releaseDate', 
                    label: 'Release Date', 
                    apiKey: 'release_date',
                    // minWidth: 100, 
                    type:'date' },
                { 
                    id: 'downloadLink', 
                    label: 'Download Link', 
                    apiKey: 'download_link',
                    // minWidth: 60, 
                    type:'url', 
                    sLabel: 'D Link' },
                {
                    id: 'subLink',
                    label: 'Sub Link',
                    apiKey: 'subtitle_link',
                    // minWidth: 150,
                    align: 'left', 
                    type:'url',
                    sLabel: 'S Link'
                },
                {
                    id: 'rating',
                    label: 'Rating',
                    apiKey: 'rating',
                    // minWidth: 100,
                    align: 'left',
                    type:'rating'
                },
                { 
                    id: 'icons', 
                    label: '', 
                    // minWidth: 100, 
                    type: 'icons', 
                    align: 'right' 
                },
    ]
    //return type == 'dv' ? columns : columns.slice(1,columns.length)
    return columns
}
export const selectn = (str,obj) =>{
    let value = obj;
    str.split('.').map(key=>{
        value = value[key] || {}
    })
    return JSON.stringify(value) == '{}' ? undefined : value;
}

export const generate = (element) => {
    return [0].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
}


export const getAPIAndValue = (obj,key,value)=>{
    const arr = Object.keys(obj);
    const resultObj = {};
    arr.map(val=>{
        resultObj[obj[val][key]] = (val == 'name' ? obj[val][value].toUpperCase() : val == 'imageLink' ? getReplacedDomains(obj[val][value]) : obj[val][value]) || (val == 'rating' ? '0' : '');
    })
    return resultObj;
}

export const getReplacedDomains = (link)=>{
    return link.replace("pics.dmm.co.jp", "pics.vpdmm.cc");
}
export const getReplaceDomains = (link, isTumbnail)=>{
    if(isTumbnail){
        link = link.replace('ps','pl')
    }
    return link.replace("pics.vpdmm.cc", "pics.dmm.co.jp");
    
}
export const normalizeObj = (arr,key, isSortBy) =>{
   const result = [];
   const resultObj = {}
   for(let i=0;i<arr.length;i++){
        result.push(arr[i][key]);
        resultObj[arr[i][key]] = arr[i][key]
   }
   return {result, resultObj}
}

export const getActName = (movies) =>{
    const actNames = [];
    Object.values(movies).map(movie=>{
        const { actName } = movie;
        if(!actNames.includes(actName) && actName){
            actNames.push(actName)
        }
    })
    actNames.sort()
    return actNames;
}

export const getMovieName = (movies) =>{
    const movieNames = [];
    const names = []
    Object.values(movies).map(movie=>{
        const { name, mvId } = movie;
        if(!names.includes(name) && name){
            movieNames.push({id: mvId, label:name})
            names.push(name)
        }
    })
    return movieNames
}

export const getMoviesLst = (mvArr,movies)=>{
    const movieObj = {};
    if(typeof mvArr[0] == 'string'){
        mvArr.map(mv=>{
            movieObj[mv] = movies[mv]
        })
        return movieObj;
    }else {
        return mvArr;
    }

}

export function getLinks(idCode){
    return {
          'Trailers' : `https://javtrailers.com/search/${idCode}`,
          'Arc' : `https://arcjav.com/?s=${idCode}`,
          'Org' : `https://sukebei.nyaa.si/?f=0&c=0_0&q=${idCode}`,
          '357' : `https://javx357.com/?s=${idCode}`,
          'One' : `https://onejav.com/search/${idCode}`,
          'CATSUB' : `https://www.subtitlecat.com/index.php?search=${idCode}`,
          'Lib' : `http://www.javlibrary.com/en/vl_searchbyid.php?keyword=${idCode}`,
          'SUPJAV' : `https://supjav.com/?s=${idCode}`,
          'FF' : `https://ffjav.com/?s=${idCode}`,
          'STB' : `https://sextb.net/search/${idCode}`
    }
}

export function responsiveFunc({ mediaQueryOR, isParentSize }) {
    return {
      isTabLetView : mediaQueryOR([{ maxWidth: 768 }]),
      LAPTOP_S: mediaQueryOR([{ maxWidth: 1024 }]),
      MONITOR: mediaQueryOR([{ minWidth: 1601 }]),
      isMobileView: isParentSize ? mediaQueryOR([{ maxWidth: 480 }]) : true
    };
  }

export function getMaxWidth(obj){
    Object.keys(obj).map(key=>{
        if(obj[key]){
            windowType = key;
        }
    })
    return {
        isTabLetView :700,
        LAPTOP_S: 1000,
        MONITOR: 1600,
        isMobileView: 400
    }[windowType]
}

export const getLinksLabel = (link, label) =>{
     if(link.indexOf('javgg') != -1){
        return 'JGG'
    }else if(link.indexOf('arcjav') !=-1){
        if(link.indexOf("4k") != -1){
            return 'ARC 4K Link'
        }
        return 'ARC Link'
    }else if(link.indexOf('drive.google') != -1){
        return 'GDrive Link'
    }else if(link.indexOf('uptobox') !=-1){
        return 'UpBox Link'
    }else if(link.indexOf('github') !=-1){
        return 'GitHub Link'
    }
    return label 
}
export function getCurrentDate(date='', isNormalFormat) {
    date = date ? new Date(date) : new Date();

    // Get year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0');         // Pad day with leading zero

    return isNormalFormat ? `${day}-${month}-${year}` : `${year}-${month}-${day}`;
}
export function reFormatDate(date){
    const [day,month,year] = date.split("-");
    return `${year}-${month}-${day}`
}

export function debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }

// export function debounce(func, wait) {
//     var interval;
//     return function (e) {
//       clearTimeout(interval);
//       interval = setTimeout(func.bind(undefined, e), wait);
//     };
//   };