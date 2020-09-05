/**
 * http://usejsdoc.org/
 */
// node localapp.js
// node --inspect-brk localapp.js
const app = require('./app');

app.listen(8000, () => console.log('App listening on port 8000!'));