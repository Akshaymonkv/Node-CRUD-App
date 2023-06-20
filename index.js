 //improting the express framework to an object
const express = require("express")
//importing bodyparser to parse the incoming data
const bodyParser = require("body-parser")
//importing uuid package to generate i'd for every element updated(v4 will generate string id's)
const uuid = require("uuid").v4
//using an object 'app' to which express is being used to create the new application, this is the defalt import statement
const app = express() 


//a simple array to hold the data
let todos =[];

//defining middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//creating routes - different functions to perform each function based on the input

//creating a get method to return the contents of the array created once this is called
app.get("/todos",(req, res, next)=>{
    res.status(200).json(todos)
})
//creating a post method to write contents to the array created
app.post("/todos",(req, res, next)=>{
    const {body} = req;
    const todo1 = {id:uuid(),...body};

    todos.push(todo1);
    res.status(201).json(todos);
})
//creating a put method to update a single element in the array created.
app.put("/todos/:id",(req, res, next)=>{
    const {id} = req.params
    const {body} =req

    const index = todos.findIndex((item)=>item.id == id)
    if(typeof index!==undefined){
        todos[index] = {id,...body}
    }

    res.status(200).json(todos)
})



//creating a server
app.listen("8080", ()=>console.log("Server is up and running"))

