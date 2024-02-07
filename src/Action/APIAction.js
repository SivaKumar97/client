const getHost = ()=>{
    let replDomain = localStorage['replDomain'];
    if(!replDomain){
        replDomain = prompt('URL Please');
    }
    localStorage['replDomain'] = replDomain;
    // const { replDomain } = Object.fromEntries(new URLSearchParams(window.location.search));
   return localStorage['replDomain'];
}
const HOST = (getHost() || 'https://704b29c9-b8ab-462e-8017-6a0dd3ddaa46-00-23teai1t92ghv.global.replit.dev' ||'https://javmov--ksiva2.repl.co') + '/api/v1/';
const getFullUrl = (url) =>{
    return `${HOST}${url}`;
}

export const getMvDetails = (field='',type) =>{
    const url = getFullUrl(`movie/list${typeof type == 'string' ? `?field=${field}&type=${type}` : ''}`)
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
export const updateDetails = (payload) =>{
    const url = getFullUrl('movie/update')
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
export const addDetails = (payload) =>{
    const url = getFullUrl('movie/addMv')
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
    const url = getFullUrl(`movie/delete/${id}`)
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
