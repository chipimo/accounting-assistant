var express = require('express')
const uuidv4 = require('uuid/v4')
const uuidv5 = require('uuid/v5')
const fs = require('fs-extra')
const { CONFIG } = require('./events')

const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341'

var passwordHash = require('password-hash')
const io = require('../index').io

var hashedPassword

const router = express.Router()

router.post('/', (req, res) => {
  const { credentials } = req.body
  if (credentials) {
    switch (credentials.type) {
      case CONFIG: 
        io.emit('NEW_TILL')
        res.json({
          tailer: {
            config: true
          }
        })
        break

      default:
        break
    }
  } else {
    res.status(400).json({
      errors: {
        msgHeader: 'Hello ' + credentials.businessName,
        global: 'You have supplied invalid credentials'
      }
    })
  }
})

function error (params) {}

module.exports = router
