#!/usr/bin/env node
var express = require('express');
var bodyparser = require('body-parser');
var piglow = require('piglow');

var pi=null,piError=null;
var app = express();

app.use(bodyparser());

// GENERAL UTILITY
function getBrightness(req) {
	var brightness = req.param('brightness') || req.param('b') || 255;
	brightness = parseFloat(brightness);
	if(isNaN(brightness) || brightness > 255)
		brightness = 255;
	else if(brightness < 0)
		brightness = 0;
	return brightness;
}

// Handle the actual LED update
//  We assume req.params[0] contains the led to update
function handleUpdate(req, res) {
	var led = req.params[0];
	var brightness = getBrightness(req);
	console.log('>>> ' + led + ':' + brightness);
	if(pi)
		pi[led] = getBrightness(req);
	res.status(200).send(pi.values);
}

// ROUTES
app.post(/\/(l_[012]_[012345])\/?/, function(req, res) { handleUpdate(req, res); });
app.post(/\/(ring_[012345])\/?/, function(req, res) { handleUpdate(req, res); });
app.post(/\/(leg_[0123])\/?/, function(req, res) { handleUpdate(req, res); });
app.post(/\/(red|green|blue|orange|yellow|white|all|random)\/?/, function(req, res) { handleUpdate(req, res); });

// everything else just returns the current values
app.get(/\/.*/, function(req, res) { 
	if(pi)
		res.status(200).send(pi.values);
	else
		res.status(204).send('');
});

// PIGLOW START
piglow(function(error, piInit) {
	piError = error;
	if(error)
		console.log('>>> piglow error: ' + error);

	pi = piInit;
	if(pi !== null) {
 	 	pi.reset;
		console.log('>>> piglow init success');
	} else {
		console.log('>>> piglow init failed, defaulting to mocked interface: ' + error);
		var PiGlowBackendMock = piglow.BackendMock;
		var piGlowInterface = piglow.piGlowInterface;

		var myMock = new PiGlowBackendMock();
		pi = piGlowInterface(myMock);
	}
});

// SERVER START
var server = app.listen(8080, function() {
    console.log('>>> listening on port %d', server.address().port);
});
