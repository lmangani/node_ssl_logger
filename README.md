# node_ssl_logger
Decrypts and logs a process's SSL traffic via Frida Code Injection

The functionality offered by node_ssl_logger is intended to mimic Google's ssl_logger and Echo Mirage's SSL logging functionality.


## Installation
```
npm install
```

## Usage
```
nodejs node_ssl_logger.js -p <process>
```

#### Example
```
# Make a local pipe for input to our openssl client
$ mkfifo pipe

# Create our openssl client, which will receive input from our pipe
$ openssl s_client -ign_eof -connect example.org:443 > /dev/null 2> /dev/null < pipe &
[1] 98954

# Begin writing the request to our pipe
$ printf "GET / HTTP/1.0\nHost:example.org\n" > pipe

# Begin logging the SSL traffic for our openssl client process
$ nodejs node_ssl_logger.js -p openssl &
[2] 98962
Press Ctrl+C to stop logging.

# Write the final line-feed to our pipe to complete the HTTP request
$ printf "\n" > pipegeffner@ubuntu:~$ 
```

#### Credits
Script and Examples based on Jason Geffner's python [ssl_logger](https://github.com/google/ssl_logger)


