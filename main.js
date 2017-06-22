var fs = require('fs');


fs.watch('./test', { encoding: 'utf8',recursive :true }, (eventType, filename) => {
  //if (filename)
    console.log(filename);
    // 输出: <Buffer ...>
	
    console.log('eventType:'+eventType);
});