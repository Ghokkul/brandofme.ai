/* DB adapter selector. Today: JSON file. Tomorrow: set DB_DRIVER=pg and implement pgStore.js
   with the same method names, then change the require below. Controllers never change. */
const driver = (process.env.DB_DRIVER || 'json').toLowerCase();
module.exports = driver === 'pg' ? require('./pgStore') : require('./jsonStore');
