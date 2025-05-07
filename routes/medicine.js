const express = require('express')
const router = express.Router()
const Medicine = require('../models/Medicine') 

// add a new medicine
router.post('/', async (req, res) => {
  try {
    const medicine = new Medicine(req.body)

    await medicine.save()

    res.status(201).send(medicine)
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})

// get all medicines
router.get('/', async (req, res) => {
  const medicines = await Medicine.find()
  res.send(medicines)
})

// get a medicine by ID
router.get('/:id', async (req, res) => {
  const medicine = await Medicine.findOne({ medicineID: req.params.id })
  if (!medicine) return res.status(404).send('Medicine not found')

  res.send(medicine)
})

// update a medicine by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findOneAndUpdate({medicineID:req.params.id},req.body)    
    if (!updatedMedicine) return res.status(404).send({ message: 'Medicine not found' })
    res.send(updatedMedicine)
  } 
  catch (err) {
    res.status(400).send({ error: err.message })
  }
})

// delete a medicine by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedMedicine = await Medicine.deleteOne({ medicineID: req.params.id })
    if (deletedMedicine.deletedCount === 0) return res.status(404).send('Medicine not found')
    res.send({ message: 'Medicine deleted successfully' })
  }
   catch (err) {
    res.status(500).send({ error: err.message })
  }
})

module.exports = router
