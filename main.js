var fs = require('fs');
var http = require('http'); 

fs.watch('./test', { encoding: 'utf8',recursive :true }, (eventType, filename) => {
  //if (filename)
    console.log(filename);
    // 输出: <Buffer ...>
	
    console.log('eventType:'+eventType);
});




// 写入数据到请求主体



fs.readFile('test/s.txt', function(err, content) {
            if (err) { // 如果由于某些原因无法读取文件
                console.log(err.message);
            } else { // 否则读取文件成功
                 // 把文件内容作为响应主体
				 
				 
				 const options = {
  hostname: '127.0.0.1',
  port: 8000,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
	'file-name':'s.txt',
    'Content-Length': Buffer.byteLength(content)
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

				 
				req.write(content);
				 req.end();
            }
           
        });



