const axios = require('axios');

const { path } = require('../../../config/index');

function listOwner(callback) {
    axios.get(path.owner.get_owner)
        .then(res => {
            return callback(null, res);
        })
        .catch(err => callback(err));
}

function createOwner(data, callback) {
    axios.post(path.owner.create_owner, {
        fullName: data.fullName,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        placeOfBirth: data.placeOfBirth,
        phoneNumber: data.phoneNumber,
        plateNumber: data.plateNumber,
        vehicleType: data.vehicleType
    })
        .then(res => {
            return callback(null, res);
        })
        .catch(err => callback(err));
}

module.exports = {
    listOwner,
    createOwner
}