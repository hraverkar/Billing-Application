var config = require('./config');

config.hostname = 'postgres://postgres:root@127.0.0.1:5432/billing_application';
config.host = '127.0.0.1'; //Host IP ( localhost )
config.username = 'postgres'; //Database UserName
config.pwd = 'root'; // Database password remote system
config.port = '5432';
config.DBName = 'billing_application'; //Database Name
config.server = 'http://localhost:7272';

// change name of certificate and key when actual certificate is added according to it.
// ( https - 'server.crt' , 'server.key')
config.certificate = ''; // blank if http requests are to be run

config.key = '';  // blank if http requests are to be run

config.domain = 'http://localhost:8080';

// log info,error settings : maxsize - file size in bytes , datePattern - show date in logs
config.logInfo = {'maxsize':10000000,'datePattern':'%d{yyyy-MM-dd hh:mm:ss}','backups':20000};

config.unsecureport = 7272;

config.gstIN ="ABCDE78945";

config.pan ="BVSPR9231E";
module.exports = config;
