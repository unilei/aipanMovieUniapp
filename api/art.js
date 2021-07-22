import request from './request.js'

function artList(data){
	return request({
		method:"GET",
		url:'provide/art/',
		data:data
	})
}

export default{
	artList
}