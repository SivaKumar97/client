import * as React from 'react';
export const NO_IMAGE = 'https://www.freeiconspng.com/uploads/no-image-icon-15.png'
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
            }           
        },
        'google' : {
            'importData' : {
                label: 'Import Data',
                apiName: 'importData',
                iconName: 'importIcon'
            },
            'exportData' : {
                label: 'Export Data',
                apiName: 'exportData',
                iconName: 'exportIcon'
            },
            'exportProject' : {
                label: 'Export Project',
                apiName: 'exportProject',
                iconName: 'exportIcon'
            }
        }
    }
}
export const getRightPanelObj = (type,mvObj={}) =>{
    const fieldObj = { 
        'addForm' : {
            'name' : {
                'fieldName' : 'Name',
                'type' : 'autocompleteText',
                'apiName' : 'name',
                'value' : mvObj['name'] || ''
            },
            'img' : {
                'fieldName' : 'Image',
                'type' : 'img',
                'apiName' : 'img',
                'value' : mvObj['img'] || ''
            },
            'actName' : {
                'fieldName' : 'Act Name',
                'type' : 'autocompleteText',
                'apiName' : 'actName',
                'value' : mvObj['actName'] ||''
            },
            'downloadLink' : {
                'fieldName' : 'DownloadLink',
                'type' : 'url',
                'apiName' : 'downloadLink',
                'value' : mvObj['downloadLink'] || ''
            },
            'subLink' : {
                'fieldName' : 'SubLink',
                'type' : 'url',
                'apiName' : 'subLink',
                'value' : mvObj['subLink'] || ''
            },
            'rating' : {
                'fieldName' : 'Rating',
                'type' : 'rating',
                'apiName' : 'rating',
                'value' : mvObj['rating'] || ''
            }
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
export const getListViewColumns = () =>{
    return [
                { id: 'name', label: 'Name', minWidth: 130, type:'text' },
                { id: 'actName', label: 'Act Name', minWidth: 170 , type:'text' },
                { id: 'downloadLink', label: 'Download Link', minWidth: 100, type:'url' },
                {
                    id: 'subLink',
                    label: 'Sub Link',
                    minWidth: 170,
                    align: 'right', 
                    type:'url'
                },
                {
                    id: 'rating',
                    label: 'Rating',
                    minWidth: 170,
                    align: 'right',
                    type:'rating'
                },
                { id: 'icons', label: '', minWidth: 100, type: 'icons', align: 'right' },
    ]
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
        resultObj[obj[val][key]] = (val == 'name' ? obj[val][value].toUpperCase() : obj[val][value]) || (val == 'rating' ? '0' : '');
    })
    return resultObj;
}

export const normalizeObj = (arr,key) =>{
    const resultObj = {};
    arr.map(val=>{
        resultObj[val[key].toString()] = val;
    })
    return resultObj;
}

export const getActName = (movies) =>{
    const actNames = [];
    Object.values(movies).map(movie=>{
        const { actName } = movie;
        if(!actNames.includes(actName)){
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
        if(!names.includes(name)){
            movieNames.push({id: mvId, label:name})
            names.push(name)
        }
    })
    return movieNames
}

export function getLinks(idCode){
    return {
          'Trailers' : `https://javtrailers.com/search/${idCode}`,
          'Lib' : `http://www.javlibrary.com/en/vl_searchbyid.php?keyword=${idCode}`,
          'Arc' : `https://arcjav.com/?s=${idCode}`,
          '357' : `https://javx357.com/?s=${idCode}`,
          'One' : `https://onejav.com/search/${idCode}`,
          'FF' : `https://ffjav.com/?s=${idCode}`,
          'STB' : `https://sextb.net/search/${idCode}`,
          'CATSUB' : `https://www.subtitlecat.com/index.php?search=${idCode}`
    }
}