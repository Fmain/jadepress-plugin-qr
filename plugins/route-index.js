
'use strict'

module.exports = function(ext) {

let publicApis = ext.publicApis

publicApis.push({
	url: '/qr'
	,method: 'get'
	,name: 'qrcode image generator'
	,desc: ''
	,lib: 'route/public-page'
	,func: 'qr'
})

let extend = {
	publicApis: publicApis
}

return extend

////end
}
