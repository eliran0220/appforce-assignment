import express from "express";
import {getUsers,getUser,updateUser,insertUser,deleteUser} from '../services/users.js';
const router = express.Router();

  router.get('/users', async (req, res) => {
    try {
        const users2 = await getUsers();
        res.send(users2);
    } catch (err) {
        console.log(err);
        res.send(err)
        throw err;
    }
  })

  router.post('/users/insert', async  (req, res) => {
    try {
      const {FirstName,LastName,Title,Email,Image,Department} = req.body;
      const values = [FirstName,LastName,Title,Email,Image,Department];
      const user = await insertUser(values);
      res.send(`User Id ${user} has been added!`);
    } catch (err) {
      console.log(err);
      res.send(err)
      throw err;
    }
  })

  router.get('/users/:id', async (req, res) =>{
    try{
      const user = await getUser(req.params.id);
      res.send(user);
    } catch (err) {
      console.log(err);
      res.send(err)
      throw err;
    }
  })

  router.patch('/users/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const {FirstName,LastName,Title,Email,Image,Department} = req.body;
      const values = [FirstName,LastName,Title,Email,Image,Department,id];
      const user = await getUser(id);
      if (user.length === 0) res.send(`User with Id ${id} doesn't exist!`)
      await updateUser(id,values);
      res.send(`User Id ${id} has been updated!`);
    } catch (err) {
      console.log(err);
      res.send(err)
      throw err;
    }
  })

  router.delete('/users/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const values = [id]
      const user = await getUser(id);
      if (user.length === 0) res.send(`User with Id ${id} doesn't exist!`)
      await deleteUser(values);
      res.send(`User with ID ${id} has been deleted!`);
    } catch (err) {
      console.log(err);
      res.send(err)
      throw err;
    }
  })

  export default router;