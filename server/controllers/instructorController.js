const Instructor = require('../models/Instructor');

// Get all instructors
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single instructor
exports.getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create instructor
exports.createInstructor = async (req, res) => {
  const instructor = new Instructor({
    name: req.body.name,
    specialty: req.body.specialty,
    availability: req.body.availability,
  });

  try {
    const newInstructor = await instructor.save();
    res.status(201).json(newInstructor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update instructor
exports.updateInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    instructor.name = req.body.name || instructor.name;
    instructor.specialty = req.body.specialty || instructor.specialty;
    instructor.availability = req.body.availability || instructor.availability;

    const updatedInstructor = await instructor.save();
    res.json(updatedInstructor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete instructor
exports.deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    await Instructor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Instructor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
