
module.exports = require('./debugScreen');

try {
	 module.exports = require('./SPIScreen');
} catch(e) {
	console.log('SPI package not found. Running in debug mode. Run `npm install spi`, or keep debugging!')	
}