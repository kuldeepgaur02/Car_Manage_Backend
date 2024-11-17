const Car = require('../models/Car');

const carController = {
  async createCar(req, res) {
    try {
      const car = new Car({
        ...req.body,
        owner: req.user._id,
        images: req.files.map(file => file.path)
      });
      await car.save();
      res.status(201).json(car);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getCars(req, res) {
    try {
      const search = req.query.search;
      let query = { owner: req.user._id };
      
      if (search) {
        query.$text = { $search: search };
      }
      
      const cars = await Car.find(query);
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCar(req, res) {
    try {
      const car = await Car.findOne({
        _id: req.params.id,
        owner: req.user._id
      });
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
      res.json(car);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateCar(req, res) {
    const updates = Object.keys(req.body);
    try {
      const car = await Car.findOne({
        _id: req.params.id,
        owner: req.user._id
      });
      
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }

      updates.forEach(update => car[update] = req.body[update]);
      if (req.files && req.files.length > 0) {
        car.images = req.files.map(file => file.path);
      }
      
      await car.save();
      res.json(car);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteCar(req, res) {
    try {
      const car = await Car.findOneAndDelete({
        _id: req.params.id,
        owner: req.user._id
      });
      
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
      
      res.json(car);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = carController;
