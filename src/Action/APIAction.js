const HOST = 'http://localhost:5000/api/v1/';

const getFullUrl = (url) =>{
    return `${HOST}${url}`;
}

export const getMvDetails = (field='',type='') =>{
    const url = getFullUrl(`getMvDetails?field=${field}&type=${type}`)
    return new Promise((resolve, reject) => {
        fetch(url)
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
export const updateDetails = (payload) =>{
    const url = getFullUrl('updateMvDetails')
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
    const url = getFullUrl('addMvDetails')
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
    const url = getFullUrl(`deleteDv/${id}`)
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

export const searchDetails = (str) =>{
    const url = getFullUrl(`searchMv?searchStr=${str}`)
    return new Promise((resolve, reject) => {
        fetch(url,{
            method: 'GET',
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
    const url = getFullUrl(`importMv`)
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