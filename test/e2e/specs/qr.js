'use strict'

let config = require('../config')
,port = config.port
,host = 'http://127.0.0.1:' + port
,tests = [
	{
		title: 'qr'
		,elementCount: ['img', 1]
		,url: 'http://127.0.0.1:' + port + '/qr?text=text'
	}
]

tests.forEach(function(test) {

	exports[test.title] = function(browser) {
		browser
			.url(test.url)
			.assert.elementCount(test.elementCount[0], test.elementCount[1])
			.end()
	}
	
})

