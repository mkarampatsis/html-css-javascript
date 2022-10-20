var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var User = require('./model/User.js');

// Αρχικά χωρίς cors
const cors = require('cors');

app.use(cors({
    origin: '*'
    // origin: ['https://www.section.io', 'https://www.google.com/']
}));

app.use('/', express.static('files'));

app.get('/user/findAll', (req, res) => {

    console.log("Get all users");

    User.find( (err, allUsers) => {
		if (err) {
			console.log("Error in find all users". err);
            // throw err;
            res.json({'data':err, 'status':false});
		} else {
            res.json({'data':allUsers, 'status':true});
		}
	})
});

app.get('/user/findOne', (req, res) => {

    console.log("Find user");

    const username = req.query.username;

    console.log("Find user with username:", username);

    User.findOne({username:username}, (err, user) => {
		if (err) {
			console.log("Error in find user", err);
            // throw err;
            res.json({'data':err, 'status':false});
		} else {
            res.json({'data':user, 'status':true});
		}
	})
});

app.delete('/user/delete', (req, res) => {

    console.log("Delete user");

    const username = req.query.username;

    console.log("delete user with username:", username);
    
    User.findOneAndRemove({username:username}, (err, user) => {
        if (err) {
			console.log("Error in deleting user", err);
            // throw err;
            res.json({'data':err, 'status':false});
		} else {
            res.json({'data':user, 'status':true});
		}
    });
});

app.post('/user/create', (req, res) => {

    console.log("Insert user", req.body);

    const username = req.body.username;
    
    console.log("insert user with username:", username);

    var newUser = new User ({
        username:req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        category: req.body.category,
        email: req.body.email
    })

    newUser.save( (err) => {
        if (err) {
            console.log("Error in inserting user", err);
            // throw err;
            res.json({'data':err, 'status':false});
        } else {
            res.json({'data':newUser, 'status':true});
        }
    });
});

app.post('/user/update', (req, res) => {

    console.log("update user");

    const username = req.body.username;

    console.log("Update user with username:", username);

    User.findOne({username:username}, (err, user) => {
		if (err) {
			console.log("Error in updating user", err);
            // throw err;
            res.json({'data':err, 'status':false});
		} else {
			user.name = req.body.name;
			user.surname = req.body.surname;
			user.category = req.body.category;
			user.email = req.body.email;
						
			user.save ((err) => {
				if (err) {
					res.json({'data':err, 'status':false});
				} else {
                    res.json({'data':user, 'status':true});
				}
			})
		}
	})
});


app.listen(3000, ()=> {
	console.log('Listening on port 3000');
});

