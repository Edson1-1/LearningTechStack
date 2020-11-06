'use strict'

const Hapi = require('@hapi/hapi');
const db = require('./config/database');
const User = require('./models/User');

require('dotenv').config()

//server init
const server = new Hapi.Server({
    host: 'localhost',
    port: 8000
})

//testDB
db.authenticate()
    .then(() =>{ 
        console.log('Connected to Database...')
        console.log(process.env.PASSWORD)
                
    })
    .catch((err) => console.log('Error is:', err))

//starting server
async function start(){
    try{
        await server.start()
    }catch(err){
        console.log(err)
        process.exit(1)
    }

    console.log(`server started at ${server.info.uri}`)
}
//routes
server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {

       try{
        const user = await User.findAll()
        console.log("User details retrieved")
        return user
       }catch(err){ 
           console.log(err)
           return "didnt work"
       }       
    }
})

server.route({
    method: 'POST',
    path: '/user',
    handler: async (request, h) =>{
        const userDetails = request.payload
        try {
            const user = await User.create({ username: userDetails.username, password: userDetails.password });
            return user
        }catch(err){
            console.log(err)
            return "An error occured and could not complete the request. Please try again"
        }
    }
})

start()