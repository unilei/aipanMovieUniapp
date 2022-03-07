import request from './request.js'

function vodList(data){
	return request({
		method:"GET",
		url:'provide/vod/',
		data:data
	})
}
function indexVodList(data){
	return request({
		method:"GET",
		url:'provide/indexVod/',
		data:data
	})
}

export default{
	vodList,
	indexVodList
}