const express = require('express')
const router = express.Router()
const Manufacturer = require('../models/Manufacturers') 

// add a new manufacturer
router.post('/', async (req, res) => {
  try {
    const manufacturer = new Manufacturer(req.body)

    await manufacturer.save()

    res.status(201).send(manufacturer)
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})

// get all manufacturers
router.get('/', async (req, res) => {
  const manufacturers = await Manufacturer.find()
  res.send(manufacturers)
})

// get a manufacturer by ID
router.get('/:id', async (req, res) => {
  const manufacturer = await Manufacturer.findOne({ manufacturerID: req.params.id })
  if (!manufacturer) return res.status(404).send('Manufacturer not found')

  res.send(manufacturer)
})

// update a manufacturer by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedManufacturer = await Manufacturer.findOneAndUpdate(
      { manufacturerID: req.params.id },
      req.body)

    if (!updatedManufacturer) return res.status(404).send({ message: 'Manufacturer not found' })

    res.send(updatedManufacturer)
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})

// delete a manufacturer by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedManufacturer = await Manufacturer.deleteOne({ manufacturerID: req.params.id })
    if (deletedManufacturer.deletedCount === 0) return res.status(404).send('Manufacturer not found')

    res.send({ message: 'Manufacturer deleted successfully' })
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

module.exports = router
