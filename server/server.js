/*setting up express.js which will be user by the server
to capture the user info/request made by the front-end code*/

const exp = require('express')
const path = require('path')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/register-app-db',{


})
const app = exp()

app.use('/', exp.static(path.join(_dirname, 'static')))
app.use(bodyParser.json())

app.post('/api/pages/register', (request, response) => {
    console.log(request.body)
    response.json({status: 'ok'})
})

app.listen(9999, ()=> {

    console.log('Server ports go up to 9999')
})