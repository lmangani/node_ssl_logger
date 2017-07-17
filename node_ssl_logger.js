/*

  node_ssl_logger: Decrypts and logs a process's SSL traffic via Frida Code Injection
  Code based on https://github.com/google/ssl_logger
  Lorenzo Mangani <lorenzo.mangani@gmail.com>

*/

var frida = require('frida');
var fs = require('fs');
var filename = './script.js';
var fsscript;
var debug = false;
var quit = function(code,msg){
	if (msg) console.log(msg)
	process.exit(code ? code : 0);
}

if(process.argv.indexOf("-p") != -1){ var pid = process.argv[process.argv.indexOf("-p") + 1]; }
if(process.argv.indexOf("-v") != -1){ debug = true; }

try {
      fs.readFile(filename, function read(err, data) {
        if (!err) {
		fsscript = data.toString();
        } else { quit(1,err); }
      });
} catch(e) { quit(1,'Failed loading script!'); }

if (!pid){ process.exit(1);}
frida.attach(pid)
.then(function (session) {
  if (debug) console.log('attached:', session);
  return session.createScript(fsscript);
})
.then(function (script) {
  if(debug) { console.log('script created:', script); }
  console.log('Press Ctrl+C to stop logging...');
  script.events.listen('message', function (message, data) {
    if(data.length >0) {
    	if (debug) console.log('message from script:', message );
    	console.log(data.toString('utf8'));
    }
  });
  script.load();
})
.catch(function (error) {
  console.log('error:', error.message);
});
