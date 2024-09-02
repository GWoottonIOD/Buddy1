import axios from 'axios'

export const createQuery = (table, object) => {
    console.log(table, object, 'create')
    const axdebts = `${window.location.origin.slice(0,-5)}:8063/api/${table}/create`
    return axios.post(axdebts, object)
        .then(response => { 
            console.log(response.data.data);
         })
        .catch(error => { 
            console.log(error);
            return Promise.reject(error);
        })
}

export const readQuery = (table, filter, userIsolate) => {
    console.log(`Reading JSON Data`)
    const axdebts = filter 
    ? userIsolate
        ? `${window.location.origin.slice(0,-5)}:8063/api/${table}/${userIsolate}/${filter}` 
        : `${window.location.origin.slice(0,-5)}:8063/api/${table}/${filter}`
    : `${window.location.origin.slice(0,-5)}:8063/api/${table}/`
    return axios.get(axdebts)
        .then(response => { 
            console.log(response.data.data);
            return response.data.data
         })
        .catch(error => { 
            console.log(error)
            return Promise.reject(error);
         })
}

export const updateQuery = (table, object) => {
    console.log(table, object, 'update')
    const axdebts = `${window.location.origin.slice(0,-5)}:8063/api/${table}/put/${object.id}`
    return axios.put(axdebts, object)
        .then(response => { 
            console.log(response.data.data);
         })
         .catch(error => { 
            console.log(error)
            return Promise.reject(error);
         })
}

export const deleteQuery = (table, filter) => {
    console.log(filter, 'delete')
    const axdebts = `${window.location.origin.slice(0,-5)}:8063/api/${table}/delete/${filter}`
    return axios.delete(axdebts)
        .then(response => { 
            console.log(response.data.data);
         })
         .catch(error => { 
            console.log(error)
            return Promise.reject(error);
         })
}