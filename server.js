var http = require('http');        // HTTP������API
var fs = require('fs');            // �ļ�ϵͳAPI

var server = new http.Server();    // �����µ�HTTP������
var port = 8000;
server.listen(port);            // �ڶ˿�8000��������
var log = require('util').log;
log('Http Server is listening ' + port + ' port.');
// Nodeʹ��'on'����ע���¼��������
// ���������յ�������,�����к���������
server.on('request', function(request, response) {
    var filename = null;
    // ���������URL
    var url = require('url').parse(request.url);
    switch(url.pathname) {
    case '/upload':
        var _fileName = request.headers['file-name'];
        log(_fileName);
        request.once('data', function(data) {
            // ���ļ�
//            var fis = fs.createWriteStream('/txt.txt');
//            fis.write(data);
//            fis.end();
            fs.writeFile(_fileName, data);
            response.end();
        });
        break;
    case '/' || '/index.html' :
        filename = 'index.html';
    default:
        filename = filename || url.pathname.substring(1);  // ȥ��ǰ��'/'
        // ��������չ���Ʋ���������
        var type = (function(_type) {
            switch(_type) { // ��չ��
            case 'html':
            case 'htm': return 'text/html; charset=UTF-8';
            case 'js': return 'application/javascript; charset=UTF-8';
            case 'css': return 'text/css; charset=UTF-8';
            case 'txt': return 'text/plain; charset=UTF-8';
            case 'manifest': return 'text/cache-manifest; charset=UTF-8';
            default: return 'application/octet-stream';
            }
        }(filename.substring(filename.lastIndexOf('.') + 1)));
        // �첽��ȡ�ļ�,����������Ϊ���������ݿ鴫�ظ��ص�����
        // ����ȷʵ�ܴ���ļ�,ʹ��API fs.createReadStream()����
        fs.readFile(filename, function(err, content) {
            if (err) { // �������ĳЩԭ���޷���ȡ�ļ�
                response.writeHead(404, {'Content-type' : 'text/plain; charset=UTF-8'});
                response.write(err.message);
            } else { // �����ȡ�ļ��ɹ�
                response.writeHead(200, {'Content-type' : type});
                response.write(content); // ���ļ�������Ϊ��Ӧ����
            }
            response.end();
        });
        
    }
});