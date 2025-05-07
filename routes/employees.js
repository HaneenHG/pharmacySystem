const express = require('express')
const router = express.Router()
const Employee = require('../models/Employees') 

// add a new employee
router.post('/', async (req, res) => {
  try {
    const employee = new Employee(req.body)
 
    await employee.save()
 
    res.status(201).send(employee)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// get all employees

router.get('/', async (req, res) => {
  
    const employees = await Employee.find()
  
    res.send(employees)
  
})

// get an employee by ID

router.get("/:id", async (req, res) => {
    const employee = await Employee.findOne({empID:req.params.id})
    if (!employee) return res.status(404).send("'Employee not found'")
        
        res.send(employee)})

// update an employee by ID

router.put('/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate({empID:req.params.id},req.body)

    if (!updatedEmployee) return res.status(404).send({ message: 'Employee not found' })
    res.send(updatedEmployee) }
  
    catch (err) {
    res.status(400).send({ error: err.message })
  }
})

// delete an employee by ID

router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.deleteOne({empID:req.params.id})
    if (deletedEmployee.deletedCount===0) return res.status(404).send('Employee not found')
    
        res.send({ message: 'Employee deleted successfully' })
  } 
  catch (err) {
    res.status(500).send({ error: err.message })
  }

})

module.exports = router