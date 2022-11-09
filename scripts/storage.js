const {LocalStorage} = require("node-localstorage");
const localstorage = new LocalStorage('./storage');

module.exports = localstorage;