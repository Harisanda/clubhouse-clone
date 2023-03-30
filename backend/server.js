require('dotenv').config();
const express = require ('express');
const DBConnect = require('./database');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const router = require('./routes');
const ACTIONS = require('./actions');

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET','POST'],
    },
})

//installer twilio

app.use(cookieParser());
 
const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000'],
}

app.use(express.json({limit: "8mb"}));
app.use(cors(corsOption));
app.use('/storage', express.static('storage'));
app.use(router);

const PORT = process.env.PORT || 5500;
DBConnect();

app.get('/',(req,res) => {
    res.send('hello')
});

//sockets
const socketUserMapping = {};
io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on(ACTIONS.JOIN, ({roomId,user}) => {
        console.log(roomId);
        console.log(user);

        socketUserMapping[socket.id] = user;
        // new Map
        const clients = Array.from (io.sockets.adapter.rooms.get(roomId) || []);

        clients.forEach( (clientId) => {
            io.to(clientId).emit(ACTIONS.ADD_PEER, {
                peerId: socket.id,
                createOffer: false,
                user
            });

            socket.emit(ACTIONS.ADD_PEER, {
                peerId: clientId,
                createOffer: true,
                user: socketUserMapping[clientId],
            });
        
        });

        socket.join(roomId);

    });

    //Handle relay ice
    socket.on(ACTIONS.RELAY_ICE, ({peerId,icecandidate}) => {
        console.log('relay ice');
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE,{
            peerId: socket.id,
            icecandidate,
        });
    });

    //Handle relay SDP (session description)
    socket.on(ACTIONS.RELAY_SDP, ({peerId,sessionDescription}) => {
        console.log('relay sdp');
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION,{
            peerId: socket.id,
            sessionDescription
        });
    });


    //leaving the room
    const leaveRoom = ({roomId}) => {
        const {rooms} = socket;

        Array.from(rooms).forEach(roomId => {
            const clients = Array.from(
                io.sockets.adapter.rooms.get(roomId) || []
            );

            clients.forEach(clientId => {
                io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
                    peerId: socket.id,
                    userId: socketUserMapping[socket.id]?.id,
                })

                socket.emit(ACTIONS.REMOVE_PEER, {
                    peerId: clientId,
                    userId: socketUserMapping[clientId]?.id  
                  })
            });
            socket.leave(roomId);
        });
        delete socketUserMapping[socket.id];
    };

    socket.on(ACTIONS.LEAVE, leaveRoom);
})




server.listen(PORT,() => console.log(`Serveur lancer sur le port ${PORT}`));