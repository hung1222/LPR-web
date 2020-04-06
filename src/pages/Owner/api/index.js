const axios = require('axios');

const { path } = require('../../../config/index');

function listOwner(callback) {
    axios.get(path.owner.get_owner)
        .then(res => {
            callback(null, res.data);
        })
        .catch(err => callback(err));
}

function editOwner(data, callback) {
    axios.patch(path.owner.edit_owner + '/' + data.id, data)
        .then(res => {
            callback(null, res.data);
        })
        .catch(err => callback(err));
}

function delteteOwner(data, callback) {
    axios.delete(path.owner.edit_owner + '/' + data.id)
        .then(res => {
            callback(null, res);
        })
        .catch(err => callback(err));
}


module.exports = {
    listOwner,
    editOwner,
    delteteOwner
}