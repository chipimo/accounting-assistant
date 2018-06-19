const io = require('./index').io
const {
  VERIFY_USER,
  LOGOUT,
  USER_CONNECTED,
  PRIVATE_MESSAGE
} = require('../Events')
const uuidv4 = require('uuid/v4')
const { getUserPath } = require('./userList/path')
let jsonfile = require('jsonfile')
const fs = require('fs-extra')
let file = getUserPath + 'users.json'

const { createUser, creatMessage, creatChat } = require('../factories')
let connectedUsers = { meliv: 'melvin' }
let obj

const user = { User: [] }

try {
  obj = jsonfile.readFileSync(file)
} catch (error) {
  checkfile(file)
  obj = jsonfile.readFileSync(file)
}

module.exports = function (socket) {
  console.log('Socket ' + socket.id)

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

  socket.on(VERIFY_USER, (userdetials, callback) => {
    let state
    callback({ data: CheckUser(userdetials) })
  })

  socket.on(USER_CONNECTED, user => {
    user.socketId = socket.id
    connectedUsers = addUser(connectedUsers, user)
    socket.user = user
    io.emit(USER_CONNECTED, connectedUsers)
  })

  socket.on('PRIVATE_MESSAGE', ({ reciver, sender }) => {
    console.log(reciver, sender)
  })

  socket.on('NEW_ENTERY', callback => {
    var id = uuidv4()
    callback({ id: id })
    io.emit('NEW_TILL', id)
  })
  // socket.emit('PRIVATE_MESSAGE', { reciver: 'main', sender: 'tail1' })
}

function checkfile (file) {
  try {
    fs.ensureFileSync(file)
    fs.writeJsonSync(file, user, err => {
      if (err) return console.error(err)
    })
  } catch (err) {
    console.error(err)
  }
}

function CheckUser (params) {
  let state

  obj.User.forEach(element => {
    if (
      element.name === params.userName &&
      element.password === params.Password
    ) {
      state = 'loggedin'
    } else {
      state = 'Error'
    }
  })
  return state
}

function addUser (userList, user) {
  let newList = Object.assign({}, userList)
  newList[user.name] = user
  return newList
}

function removeUser (userList, username) {
  let newList = Object.assign({}, userList)
  delete newList[username]
  return newList
}

function isUser (userList, username) {
  return username in userList
}
