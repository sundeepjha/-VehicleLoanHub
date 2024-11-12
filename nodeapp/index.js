const express = require('express');
const mongoose = require('mongoose');
const loanApplicationRouter = require('./routers/loanApplicationRouter');
const loanRouter = require('./routers/loanRouter');
const userRouter = require('./routers/userRouter');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const cors = require('cors');
const logger = require('./logger');
const { setBucket } = require('./controllers/loanApplicationController');
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

const mongoURI = 'mongodb://127.0.0.1:27017/vehicleLoanHub';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info("Connected to DB successfully");
    const db = mongoose.connection.db;
    setBucket(db);
  })
  .catch(err => {
    logger.error("DB connection error: ", err);
  });

app.use('/loanApplication', loanApplicationRouter);
app.use('/loan', loanRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  logger.info(`Listening to port: ${port}`);
});
