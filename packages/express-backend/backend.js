// backend.js
import express from "express";
import cors from "cors";
import funcs from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    funcs.getUsers(name, job)
       .then((result)=> {
	  res.send(result);
       })
       .catch((error) => {
          console.log(error);
       })
});
    
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    //let result = findUserById(id); 
    funcs.findUserById(id)
       .then((result) => {
          if (result) {
	     res.send(result);
          } else {
             res.status(404).send('Resource not found.');
          }
       })
       .catch((error) => {
          console.log(error);
       })
});


app.post('/users', (req, res) => {
    const userToAdd = req.body;
    console.log(userToAdd);
    //userToAdd.id = genId().toString();
    funcs.addUser(userToAdd)
    .then((user)=>{
       res.status(201).send(JSON.stringify(user));
    })
    .catch((error) => {
       console.log(error);
    })
});

//const findUserIndexById = (id) =>
//    users['users_list']
//        .findIndex( (user) => user['id'] === id);

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    funcs.deleteUserById(id)
    .then((result) => {
       if(result){
          res.status(204).send();
       }
       else{
          res.status(404).send('Resource not found.');
       }
    })
    .catch((error) => {
       console.log(error);
    })

 //   let result = findUserIndexById(id); 
 //   if (result < 0) {
 //       res.status(404).send('Resource not found.');
 //   } else {
	//users['users_list'].splice(result, 1);
 //       res.status(204).send();
   // }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  
