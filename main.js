var fs = require('fs');
var http = require('http'); 
const Url  = require('url').Url;
//console.log(URL);

fs.watch('./test', { encoding: 'utf8',recursive :true }, (eventType, filename) => {
  //if (filename)
    console.log(filename);
    // 输出: <Buffer ...>
	
    console.log('eventType:'+eventType);
});

var _fileName = 'YoudaoDict.exe';


//创建请求
 const options = {
	  hostname: '127.0.0.1',
	  port: 8000,
	  path: '/upload',
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'file-name':_fileName
		//'Content-Length': Buffer.byteLength(content)
	  }
	};

const req = http.request(options, (res) => {
	  console.log(`状态码: ${res.statusCode}`);
	  console.log(`响应头: ${JSON.stringify(res.headers)}`);
	  res.setEncoding('utf8');
	  res.on('data', (chunk) => {
		console.log(`响应主体: ${chunk}`);
	  });
	  res.on('end', () => {
		console.log('响应中已无数据。');
	  });
	});

	req.on('error', (e) => {
	  console.error(`请求遇到问题: ${e.message}`);
	});

 
//创建文件流

try{
	
	var fis = fs.createReadStream('./test/'+_fileName);
	fis.pipe(req);
	
	fis.on('end',() => {
		log('fis.end');
		req.end();
	})
	
}catch(e){
	req.end();
}



function log(s){
	console.log(s);
}

