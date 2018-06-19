var app = require('express')()
var http = require('http').Server(app)
var io = (module.exports.io = require('socket.io')(http))
var path = require('path')
var bodyParser = require('body-parser')

var auth = require('./routes/auth')
var search = require('./routes/search')

app.use(bodyParser.json())

app.use('/api/user', auth)
app.use('/api/search', search)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

const PORT = process.env.PORT || 3200
const SocketManager = require('./SocketManager')

io.on('connection', SocketManager)

http.listen(PORT, () => {
  console.log('Connected to port' + PORT)
})
