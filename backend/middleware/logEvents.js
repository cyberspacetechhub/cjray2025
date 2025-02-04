const fromat = require('date-fns');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
  const dateTime = `${fromat.format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.txt');
  next();
};

module.exports = { logEvents, logger };