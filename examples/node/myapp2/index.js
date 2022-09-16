var express = require('express');

var app = express();

app.use('/', (req, res) => {
	var name = req.query.name; //π.χ /?name=markos
	
	res.status(200).type('html');
	
	if(name){
		res.write('Hello ' + name);
	} else {
		res.write('Welcome, guest!');
	} 
	
	res.end();
});

app.listen(3000, ()=> {
	console.log('Listening on port 3000');
});
