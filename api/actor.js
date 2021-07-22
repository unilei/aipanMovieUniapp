import request from './request.js'

function actorList(data){
	return request({
		method:"GET",
		url:'provide/actor/',
		data:data
	})
}

export default{
	actorList
}