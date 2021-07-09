const request = (config) => {
	// 处理 apiUrl
	let api_url = config.url;
	config.url = 'https://aipan.unilei.cn/api.php/' + api_url;
	
	if (!config.data) {
		config.data = {};
	}
	
	let promise = new Promise(function(resolve, reject) {
		
		uni.request(config).then(responses => {
			// 异常
			// console.log(responses)
			if (responses[0]) {
				reject({
					message: "网络超时"
				});
			} else {
				let response = responses[1].data; // 如果返回的结果是data.data的，嫌麻烦可以用这个，return res,这样只返回一个data
				resolve(response);
			}
		}).catch(error => {
			reject(error);
		})


	})
	return promise;
};

export default request;
