// init package
var sys = require('sys');
http = require('http');
path = require('path');
url = require('url');
fs = require('fs');

// init Server
var app = http.createServer(function(rq,rp){

	var _path = url.parse(rq.url).pathname;
	_path = (_path === '/') ? "index.html":_path;
	var _fullPath = path.join(process.cwd(),_path);

	fs.exists(_fullPath,function(exists){
		if(!exists){ // 404 not found
			rp.writeHeader(404,{"Content-Type":"text/plain"});
			rp.write("404 Not Found \n");
			rp.end();
		}else{
			fs.readFile(_fullPath,"binary",function(err,file){
				if(err){ // error page
					rp.writeHeader(500,{
						"Content-Type": "text/plain"
					});
					rp.write(err + "\n");
					rp.end();
				}else{ // got it
					rp.writeHeader(200);
					rp.write(file,"binary");
					rp.end();
				}
			})
		}
	})
sys.puts("_path",_path);
sys.puts("_fullPath",_fullPath);

});

// listen
app.listen(8888);
sys.puts("Server Running On 8888");