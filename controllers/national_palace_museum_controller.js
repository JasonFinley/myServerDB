const MuseumModel = require('../models/national_palace_museum_model');

const museumModel = new MuseumModel();

module.exports = class CNationalMuseum {
    getNationalMuseumController = getMyMuseumController;
    getNationalMuseumInfoController = getMyMuseumInfoController;
}

function getMyMuseumInfoController( req, res ,next ){

    console.log( req );
    museumModel.getMuseumProductInfo( { Serial_No : req }, function( result ){
        if( result.success ){
            
            res.status(200);
            res.send({
                success : result.success,
                db : JSON.stringify( result.db ),
            });
            res.end();

        }else{
            res.status(404);
            res.end();
        }
    } );
}

function getMyMuseumController( req, res ,next ){

    console.log( req );
    museumModel.getMuseumProducts( req.query, function( result ){
        if( result.success ){
            
            res.status(200);
            res.send({
                success : result.success,
                db : JSON.stringify( result.db ),
            });
            res.end();

        }else{
            res.status(404);
            res.end();
        }
    } );
}

