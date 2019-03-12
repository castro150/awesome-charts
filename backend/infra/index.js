const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../config/config.json');
global.__configs = JSON.parse(fs.readFileSync(configPath, 'utf8'));
