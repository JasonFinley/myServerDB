const FactoryModel = require('../models/factory_model');

const factoryModel = new FactoryModel();

module.exports = class CFactoryController {
    postFactoryController = postMyFactoryController;
    getFactoryDBController = getMyFactoryDBController;
    delFactoryController = delMyFactoryController;
}

function dbDataToJson( arr )
{
    //json_encode
    return JSON.stringify( arr );
}

function delMyFactoryController( req, res ,next ){
    factoryModel.delFactoryData( req, function( result ){
        if( result.success ){
            res.status(200);
            res.send({
                success : result.success,
                db : dbDataToJson( result.db ),
            });
        }else{
            res.status(404);
            res.end();
        }

    });
}

function postMyFactoryController( req, res ,next ){
    factoryModel.postFactoryData(req, function( result ){
        if( result.success ){
            res.status(200);
            res.send({
                success : result.success,
                db : dbDataToJson( result.db ),
            });
        }else{
            res.status(404);
            res.end();
        }

    });
}

function getMyFactoryDBController( req, res ,next ){

    console.log( "getMyFactoryDBController" );
    console.log( req );
    factoryModel.getFactoryDB( req.query, function( result ){
        if( result.success ){
            
            res.status(200);
            res.send({
                success : result.success,
                db : dbDataToJson( result.db ),
            });
            res.end();

        }else{
            res.status(404);
            res.end();
        }
    } );
}

