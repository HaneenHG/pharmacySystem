const express = require('express')
const router = express.Router()
const Pharmacy = require('../models/Pharmacies')


// add a new pharmacy
router.post('/', async (req, res) => {
  try {
    const pharmacy = new Pharmacy(req.body)

    await pharmacy.save()

    res.status(201).send(pharmacy)
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})


// get all pharmacies
router.get('/', async (req, res) => {
  const pharmacies = await Pharmacy.find()
  res.send(pharmacies)
})


// get a pharmacy by ID
router.get('/:id', async (req, res) => {
  const pharmacy = await Pharmacy.findOne({ pharmacyID: req.params.id })
  if (!pharmacy) return res.status(404).send('Pharmacy not found')

  res.send(pharmacy)
})


// update a pharmacy by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPharmacy = await Pharmacy.findOneAndUpdate({ pharmacyID:req.params.id },req.body)
    if (!updatedPharmacy) return res.status(404).send({ message: 'Pharmacy not found' })
    res.send(updatedPharmacy)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})


// delete a pharmacy by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPharmacy = await Pharmacy.deleteOne({ pharmacyID: req.params.id })
    if (deletedPharmacy.deletedCount === 0) return res.status(404).send('Pharmacy not found')

    res.send({ message: 'Pharmacy deleted successfully' })
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

module.exports = router
