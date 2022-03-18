var express = require('express');
var router = express.Router();


var _CLIENT_ID = "mykey.apps.googleusercontent.com";
//   '/'
//   '/auth/'

//  http://localhost:3000/auth/google
router.get('/google', function(req, res, next) {
    res.status(200);
    res.send({
        success : true,
        data,
    });
    res.end();
});

router.post('/google', async function(req, res, next) {

    console.log( "google login...." );

    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client(_CLIENT_ID);
    const token = req.body.id_token;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: _CLIENT_ID
    });
    
    console.log(ticket);

    
});


//  http://localhost:3000/auth/google
router.delete('/google/', function(req, res, next) {
    const id = req.params.id;

    data.forEach( ( item, idx ) =>{
        if( item.id == id ){
            data.splice( idx, 1 );
        }
    } );

    console.log( data );

    res.status(200);
    res.send({
        success : true,
        data,
    });
    res.end();
});

module.exports = router;
