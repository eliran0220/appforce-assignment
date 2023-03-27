import express from "express";
import { getDepartments, insertDepartment,getInfo } from "../services/departments.js";
const router = express.Router();
router.get('/',function(req,res) {
  res.send('welcome')
})
router.post('/department/insert', async (req, res) => {
  try {
    const name = req.body.Name;
    const desc = req.body.Description;
    const values = [name,desc]
    const department = await insertDepartment(values);
    res.send(`Department Id ${department.insertId} has been added!`);
  } catch (err) {
    console.log(err);
    res.send(err)
    throw err;
  }
})

router.get('/departments', async (req,res) =>{
  try {
    const departments = await getDepartments();
    res.send(departments);
  } catch (err) {
    console.log(err);
    res.send(err)
    throw err;
  }
})

router.get('/info', async (req,res) =>{
  try {
    const info = await getInfo();
    res.send(info);
  } catch (err) {
    console.log(err);
    res.send(err)
    throw err;
  }
});



export default router;