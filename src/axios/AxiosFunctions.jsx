import axios from 'axios'

export const createQuery = (table, object) => {
    console.log(table, object, 'create')
    const axdebts = `http://localhost:8063/api/${table}/create`
    return axios.post(axdebts, object)
        .then(response => { 
            console.log(response.data.data);
         })
        .catch(error => { 
            console.log(error);
            return Promise.reject(error);
        })
}

export const readQuery = (table, filter) => {
    console.log('Reading JSON Data')
    const axdebts = filter 
    ? `http://localhost:8063/api/${table}/${filter}` 
    : `http://localhost:8063/api/${table}/`
    return axios.get(axdebts)
        .then(response => { 
            console.log(response.data.data);
         })
        .catch(error => { 
            console.log(error)
            return Promise.reject(error);
         })
}

export const updateQuery = (table, object) => {
    console.log(table, object, 'update')
    const axdebts = `http://localhost:8063/api/${table}/put/${object.debtID}`
    return axios.put(axdebts, object)
        .then(response => { 
            console.log(response.data.data);
         })
         .catch(error => { 
            console.log(error)
            return Promise.reject(error);
         })
}

export const deleteQuery = (userID, debtID, amount, table) => {
    const pay = { 'userID': userID, 'debtID': debtID, 'amount': amount }
    console.log(pay, 'delete')
    const axdebts = `http://localhost:8063/api/${table}/create`
    return axios.put(axdebts, pay)
        .then(response => { 
            console.log(response.data.data);
         })
         .catch(error => { 
            console.log(error)
            return Promise.reject(error);
         })
}