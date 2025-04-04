const getHost = ()=>localStorage['replDomain'];
const HOST = getHost() || "https://nodejs-1-c0m7.onrender.com" || (window.location.href.includes("localhost") ? 'http://localhost:8443' : 'https://shahinshaas-2642-8443.zcodeusers.com') //||'https://sivakumar9550.pythonanywhere.com' || getHost() || 'https://704b29c9-b8ab-462e-8017-6a0dd3ddaa46-00-23teai1t92ghv.global.replit.dev' ||'https://javmov--ksiva2.repl.co') + '/api/v1/';
const getFullUrl = (url) =>{
    return `${HOST}/api/v1/${url}`;
}

export const getUsageStats = () =>{
    const url = getFullUrl(`movies/apiusage`)
    const statsData = localStorage['statsObj']
    return new Promise((resolve, reject) => {
        if(statsData){
            return resolve(JSON.parse(statsData));
        }
        fetch(url)
            .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
            })
            .then(data => {
                const { response } = data;
                const { rows_read, rows_written, storage_bytes } = response
                const usageObj = {};
                usageObj.read = parseFloat((rows_read / 5000000000) * 100).toFixed(2) + ' %'
                usageObj.write = parseFloat((rows_written / 10000000) * 100).toFixed(2)+ ' %'
                usageObj.storage = parseFloat((storage_bytes / ( 5 * 1024 * 1024 * 1024)) * 100).toFixed(2)+ ' %'
                localStorage['statsObj'] = JSON.stringify(usageObj);
                resolve(usageObj)
            })
            .catch(error => reject(error));
    });
}
export const getCountDetails = () =>{
    const url = getFullUrl(`movies/counts`);
    const countData = localStorage['countObj'];
    return new Promise((resolve, reject) => {
        if(countData){
            return resolve(JSON.parse(countData));
        }
        fetch(url)
            .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
            })
            .then(data => {
                const { all_movies, today, thisWeek, nextWeek, otherRelease } = data.response;
                data.response['releasedMovies'] = all_movies - ((thisWeek - today) + nextWeek + otherRelease);
                localStorage['countObj'] = JSON.stringify(data.response)
                resolve(data.response)
            })
            .catch(error => reject(error));
    });
}
export const getMvDetails = ({from,searchStr='',sortField='ID', sortOrder='DESC'}) =>{
    const url = getFullUrl(`movies?isAdmin=955011247&from=${from}&searchStr=${searchStr}&sortField=${sortField}&sortOrder=${sortOrder}`)
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
            })
            .then(data => {
                resolve(data.response)
            })
            .catch(error => reject(error));
    });
}
export const getMvDetail = (id) =>{
    const url = getFullUrl(`movies/${id}?isAdmin=955011247`)
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
            })
            .then(data => {
                resolve(data.response)
            })
            .catch(error => reject(error));
    });
}
export const updateDetails = (payload) =>{
    const url = getFullUrl('movies/'+payload.mvId)
    return new Promise((resolve, reject) => {
        fetch(url,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}
export const addDetails = (payload) =>{
    const url = getFullUrl('movies')
    return new Promise((resolve, reject) => {
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

export const deleteDetails = (id) =>{
    const url = getFullUrl(`movies/${id}`)
    return new Promise((resolve, reject) => {
        fetch(url,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

export const searchDetails = (str, existObj) =>{
    // const url = getFullUrl(`movie/search?searchStr=${str}`)
    str = str.toLowerCase()
    return new Promise((resolve, reject) => {
        const values = Object.values(existObj)
        const response = [];
        values.map(movieDetail=>{
            const { name='', actName='' } = movieDetail;
            if(name.toLowerCase().indexOf(str) != -1 || actName.toLowerCase().indexOf(str) != -1){
                response.push(movieDetail)
            }
        })
        // return {'mvDetails' : response}
        resolve({'mvDetails' : response})

        // fetch(url,{
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then(response => {
        //     if (!response.ok) {
        //         throw new Error(response.statusText);
        //     }
        //     return response.json();
        //     })
        //     .then(data => resolve(data))
        //     .catch(error => reject(error));
    });
}
export const exportDatas = () =>{
    const url = getFullUrl(`exportMv`)
    return new Promise((resolve, reject) => {
        fetch(url,{
            method: 'POST',
            mode: 'cors'
        })
            .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

export const importDatas = () =>{
    const url = getFullUrl(`movie/importMv`)
    return new Promise((resolve, reject) => {
        fetch(url,{
            method: 'POST',
            mode: 'cors'
        })
            .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

export const exportProject = () =>{
    const url = getFullUrl(`exportProject`)
    return new Promise((resolve, reject) => {
        fetch(url,{
            method: 'POST',
            mode: 'cors'
        })
            .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

export const getPercentage = (setPercentage) =>{
    const url = getFullUrl(`percentage`)
    return new Promise((resolve, reject) => {
        fetch(url,{
            method: 'GET',
            mode: 'cors'
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return new Response(response.body, {
              headers: {
                'Content-Type': 'text/event-stream'
              }
            });
          })
          .then(response => {
            const reader = response.body.getReader();
            return new ReadableStream({
              start(controller) {
                function push() {
                  reader.read().then(({ done, value }) => {
                    if (done) {
                      controller.close();
                      return;
                    }
                    let decoder = new TextDecoder();
                    let uint8array = new Uint8Array(value);
                    let string = decoder.decode(uint8array);
                    setPercentage(string)
                    controller.enqueue(value);
                    push();
                  });
                }
                push();
              }
            });
          })
          .then(stream => new Response(stream))
          .then(response => response.text())
          .then(text => setPercentage(100))
          .catch(error => console.error(error));
    });
}


export const updateAllMovies = () =>{
//     let castArray = JSON.parse(castArr)
//     let moviesList = JSON.parse(localStorage['mvDetails']);
//     delete moviesList['mvDetail'];
//     moviesList = Object.values(moviesList);
//     var promiseArr = [];
//     var mvName = ['JUQ-264','DVDMS-954','HOMA-128','CEMD-319','JUL-965','EKDV-705','JUQ-222','GVH-538','EMOT-025','PRED-427','PPPE-115','MIAA-782','YUJ-003','IPX-830','JUFE-442','DLDSS-121','IPZZ-023','ROYD-126','JUQ-100','IPX-982','HMN-396','VAGU-255']
//     for(let i=0;i<moviesList.length;i++){
//         const movieDetail = moviesList[i]
//         const { actName='', name } = movieDetail;
//         if(actName && mvName.includes(name)){
//             castArray.map(cast=>{
//                 const { name, slug } = cast;
//                 if(name == actName){
//                     movieDetail['slug'] = slug
//                     console.log(movieDetail)
//                     promiseArr.push(updateDetails(movieDetail))
//                 }
//             })
//         } 
//     }
        
//     Promise.all(promiseArr).then(resp=>{
//         console.log("Response", resp)
//     },err=>{
//         console.log("Errr",err);
//     })
}
export const getRecentDatas = () =>{
    const url = getFullUrl(`movie/getRecentList`)
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
            })
            .then(data => {
                resolve(data)
            })
            .catch(error => reject(error));
    });
}
export const deleteByRate = () =>{
    const url = getFullUrl(`movie/deleteByRating`)
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
            if (!response.ok) {
                alert("Not all data delete properly")
                throw new Error(response.statusText);
            }
            return response.json();
            })
            .then(data => {
                resolve(data)
            })
            .catch(error => reject(error));
    });
}
