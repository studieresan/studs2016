module.exports = {
    url : 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME || 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME
};
