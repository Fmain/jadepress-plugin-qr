

module.exports = function(ext) {

'use strict'

var 
local = ext.local
,setting = ext.setting
,tools = ext.tools
,log = ext.log
,err = ext.err
,db = ext.db
,path = require('path')
,baseThemeViewPath = ext.baseThemeViewPath
,Pager = ext.Pager
,pager = ext.pager
,getCats = ext.getCats
,getPosts = ext.getPosts
,buildThemeRes = tools.buildThemeRes
,cq = require('canvas-qr').qr

var extend = {}

function* cqPromise(_query) {

	var query = _query
	,src = query.text
	,size = query.size
	,bg = query.bg

	var defaults = {
		baseColor: bg || '#fff' //canvas base color, all other images draw on this base
		,backgroundImage: null //canvas Image Object as background
		,backgroundColor: null //background color String
		,size: parseInt(size, 10) || 200 //image size
		,border: 0.04 // border widrth = size * border
		,str: src || '' //string to encode to qr
		,forgroundColor: '#000' //forgroundColor
		,logoImage: null
		,logoWidth: 40
		,logoHeight: 40
		,ecc: 'M'
	}


  var cvs = cq(defaults)

  return new Promise(function(resolve, reject) {
      cvs.toBuffer(function(err, buf) {
          if(err) reject(err)
          else resolve(buf)
      })
  })

}

extend.qr = function* (next) {

	try {

	var buf = yield cqPromise(this.query)
	this.type = '.png'
	this.body = buf

	} catch(e) {

		err('failed render qr image', e)
		this.status = 500
		this.local.error = e
		this.render(setting.path500, this.local)

	}

}

return extend

////end
}
