var app = require('express')();
var http = require('http').createServer(app);
const PORT = 8081;
var io = require('socket.io')(http);
var id = 0
var STATIC_CHANNELS = [];

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})


http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => {
    console.log('new client connected');
    socket.emit('connection', null);
    socket.on('channel-join', id => {
        console.log('channel join', id);
        STATIC_CHANNELS.forEach(c => {
            if (c.id === id) {
                if (c.sockets.indexOf(socket.id) == (-1)) {
                    c.sockets.push(socket.id);
                    c.participants++;
                    io.emit('channel', c);
                }
            } else {
                let index = c.sockets.indexOf(socket.id);
                if (index != (-1)) {
                    c.sockets.splice(index, 1);
                    c.participants--;
                    io.emit('channel', c);
                }
            }
        });

        return id;
    });
    socket.on('send-message', message => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        STATIC_CHANNELS.forEach(c => {
            let index = c.sockets.indexOf(socket.id);
            if (index != (-1)) {
                c.sockets.splice(index, 1);
                c.participants--;
                io.emit('channel', c);
            }
        });
    });

});



/**
 * @description This methos retirves the static channels
 */
app.get('/getChannels', (req, res) => {
    res.json({
        channels: STATIC_CHANNELS
    })
});
app.get('/addChannels/:name', (req, res) => {
    let data = {
        name: req.params.name,
        participants: 0,
        id: id++,
        sockets: []
    }
    STATIC_CHANNELS.push(data)
    console.log(STATIC_CHANNELS)
});
function removeItemOnce(arr, value) {
    for (var i = arr.length - 1; i >= 0; --i) {
        if (arr[i].name == value) {
            arr.splice(i, 1);
        }
    }
    return arr;
}
app.get('/deleteChannels/:name', (req, res) => {
    removeItemOnce(STATIC_CHANNELS, req.params.name)
    console.log(STATIC_CHANNELS)
});