import request from './request.js'

function vodList(data){
	return request({
		method:"GET",
		url:'provide/vod/',
		data:data
	})
}

export default{
	vodList
}