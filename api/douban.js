import request from './doubanRequest.js'

function douban(data){
	return request({
		method:"GET",
		url:'/',
		data:data
	})
}

export default{
	douban
}