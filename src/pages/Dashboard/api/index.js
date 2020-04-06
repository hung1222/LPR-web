const axios = require('axios');

const { path } = require('../../../config/index');

function statisticViolation(callback) {
    axios.get(path.statistic.violation)
        .then(res => {
            callback(null, res);
        })
        .catch(err => callback(err));
}

function statisticOwner(callback) {
    axios.get(path.statistic.owner)
        .then(res => {
            callback(null, res);
        })
        .catch(err => callback(err));
}

function statisticSMS(callback) {
    axios.get(path.statistic.sms)
        .then(res => {
            callback(null, res);
        })
        .catch(err => callback(err));
}

function statisticViolationTime(callback) {
    axios.get(path.statistic.get_violationTime)
        .then(res => {
            callback(null, res);
        })
        .catch(err => callback(err));
}

function statisticSMSTime(callback) {
    axios.get(path.statistic.get_smsTime)
        .then(res => {
            callback(null, res);
        })
        .catch(err => callback(err));
}


module.exports = {
    statisticViolation,
    statisticOwner,
    statisticSMS,
    statisticViolationTime,
    statisticSMSTime
};