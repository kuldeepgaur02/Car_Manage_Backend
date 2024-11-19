const Car = require('../models/Car');

const carController = {
  async  createCar(req, res) {
    try {
      // Check if files are uploaded
      if (!req.files) {
        return res.status(400).json({ error: 'No images uploaded.' });
      }
  
      const { title, description, tags } = req.body;
  
      let parsedTags;
      if (typeof tags === 'string') {
        try {
          parsedTags = JSON.parse(tags); // Parse stringified tags
        } catch (err) {
          return res.status(400).json({ error: 'Invalid tags format. Tags should be a valid JSON object.' });
        }
      } else {
        parsedTags = tags;
      }
  
      // Validate tags
      if (!parsedTags || !parsedTags.car_type || !parsedTags.company || !parsedTags.dealer) {
        return res.status(400).json({ error: 'All tag fields (car_type, company, dealer) are required.' });
      }
  
      // Create the car document
      const car = new Car({
        title,
        description,
        tags: parsedTags,
        owner: req.user._id, // Assuming user is authenticated
        images: req.files.map(file => file.path) // Save the file paths from multer
      });
  
      await car.save();
      res.status(201).json(car); // Respond with created car object
    } catch (error) {
      // Handle errors, including multer validation errors
      if (error.message.includes('Not an image!')) {
        return res.status(400).json({ error: 'Only image files are allowed.' });
      }
      console.error(error);
      res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
  },
  
  
  async getCars(req, res) {
    try {
      const search = req.query.search;
      let query = { owner: req.user._id };

      if (search) {
        // Using $text to leverage the text index on the Car schema
        query = {
          ...query,
          $text: { $search: search }  // The search will look in title, description, and tags
        };
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
  
      // Parse `tags` if it is a string
      if (req.body.tags) {
        try {
          req.body.tags = JSON.parse(req.body.tags);
        } catch (error) {
          return res.status(400).json({ error: 'Invalid tags format. Must be a JSON object.' });
        }
      }
  
      // Update fields
      updates.forEach(update => car[update] = req.body[update]);
  
      // Handle file uploads for images
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
