const jsonServer = require('json-server')
const middleware = jsonServer.defaults();
const server = jsonServer.create();


server.use(middleware);
server.use(jsonServer.bodyParser)


const userData = require('../server/data/users');

server.get('/api/users', (req, res, next) => {

    res.status(200).send(userData.getUsers);
});


server.listen(3001, () => {
    console.log('Pepe server is listening in port 3001')
})