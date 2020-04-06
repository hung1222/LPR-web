const { HOST, PORT, SOCKET } = require('./network');

const BASE_URL = `${HOST}:${PORT}/api/v1`;
const BASE_IMG = `${HOST}:${PORT}`;
const BASE_SOCKET = `${HOST}:${SOCKET}`;

const path = {
    auth: {
        login: ``
    },

    owner: {
        get_owner: `${BASE_URL}/owner`,
        create_owner: `${BASE_URL}/owner`,
        edit_owner: `${BASE_URL}/owner`,
        delete_owner: `${BASE_URL}/owner`
    },

    plate: {
        list_violation: `${BASE_URL}/plate`,
        search_violation: `${BASE_URL}/plate/search`,
        get_violation: `${BASE_URL}/plate`
    },

    statistic: {
        violation: `${BASE_URL}/statistic/violation`,
        owner: `${BASE_URL}/statistic/owner`,
        sms: `${BASE_URL}/statistic/sms`,
        get_violationTime: `${BASE_URL}/statistic/violation_time`,
        get_smsTime: `${BASE_URL}/statistic/sms_time`,
    }
};

module.exports = {
    path,
    BASE_IMG,
    BASE_SOCKET
};