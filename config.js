module.exports={
    "ip":"localhost",
    "db":"blog",
    "port":12345,
    "session": {
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:12345/blog',
    baseUrl: 'http://localhost:3000'
};