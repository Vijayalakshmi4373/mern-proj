const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const doctorController = require('./controllers/doctorController');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB:', err));

// Set up routes
app.put('/doctor/update-profile', doctorController.updateDoctorProfileController);
app.get('/doctor/appointments', doctorController.getAllDoctorAppointmentsController);
app.post('/appointment/status', doctorController.handleStatusController);
app.get('/document/download', doctorController.documentDownloadController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
