var mysqlConfig = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'hcldemo'
}

var mongoConfig={
    useNewUrlParser:true,
    useUnifiedTopology:true,
}

var config={mysql:mysqlConfig,mongo:mongoConfig};
module.exports=config;