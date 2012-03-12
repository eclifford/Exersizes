fs          = require 'fs'
express     = require 'express'

app = module.exports = express.createServer()
app.configure ->
  app.set "views", __dirname + "/app/server/views"
  app.set "view engine", "jade"

  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.cookieParser maxAge: 398338
  app.use express.session secret: "test"
  app.use express.static(__dirname + "/public")
  app.use "/app", express.static(__dirname + "/app")

app.configure "development", ->
  app.use express.errorHandler(
    dumpExceptions: true
    showStack: true
  )

app.configure "production", ->
  app.use express.errorHandler()

fs.readdir __dirname + '/app/server/routes', (err, files) ->
  throw err if err
  files.forEach (file) ->
    require("#{__dirname}/app/server/routes/" + file) app

app.listen 3000
console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env
