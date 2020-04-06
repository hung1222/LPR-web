const axios = require('axios');

const { path } = require('../../../config/index')

function listViolation(callback) {
    axios.get(path.plate.list_violation)
        .then(res => {
            callback(null, res);
        })
        .catch(err => callback(err));
}

function getViolation(data, callback) {
    axios.get(path.plate.get_violation + '/' + data.id)
        .then(res => {
            callback(null, res);
        })
        .catch(err => callback(err));
}

function searchViolation(data, callback) {
    axios.get(path.plate.search_violation, {
        params: {
            startDate: data.startDate,
            endDate: data.endDate,
            param: data.param
        }
    })
        .then(res => {
            callback(null, res);
        })
        .catch(err => callback(err));
}



module.exports = {
    listViolation,
    getViolation,
    searchViolation
};