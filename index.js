const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const eventRoutes = require('./routes/event');
const registrationRoutes = require('./routes/registration');
const feedbackRoutes = require('./routes/feedback');
const guestsRoutes = require('./routes/guests.js');
const maintenanceRoutes = require('./routes/maintenance');
const reportRoutes = require('./routes/report');
const transactionRoutes = require('./routes/transaction');
const membershipRoutes = require('./routes/membership');
const orderRoutes = require('./routes/order.js');
const vendorRoutes = require("./routes/vendor.js");
const userRoutes = require('./routes/user');
require('dotenv').config();


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/membership', membershipRoutes);
app.use("/api/vendor", vendorRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/guests', guestsRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
