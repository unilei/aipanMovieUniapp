'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database();
	const collection = db.collection('tv-list')
	//返回数据给客户端
	let res = collection.limit(300).field().get();
	return res;
};