const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const morgan = require('morgan');
const todos = require('./todos.json');

server.listen(80);

io.on('connection', socket => {
    socket.on('chat', message => {
        io.emit('chat', message);
    })
    socket.emit('ready', 'welcome to the chat');
})

app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => { 
    res.render('index', {
        title: 'Express todo!',
        todos,
    });
})

app.get('/todos', (req, res) => {
    let todosList = todos;
    if (req.query.completed) {
        console.log('req.query.completed', req.query.completed);
        todosList = todos.filter(todo => todo.completed.toString() === req.query.completed)
    }
    res.json(todosList);
})

app.get('/todos/:id', (req, res) => {
    const todo = todos.find(todo => todo.id == req.params.id);
    if (!todo) return res.status(404).send('Не найдено');
    res.json(todo);
})

app.listen(3000, () => {
    console.log('Сервер работает')
})