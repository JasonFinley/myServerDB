const UserModel = require('../models/user_model');

const myUserModel = new UserModel();

module.exports = class CUserController {
    getUserController = getMemberController;
    postUserController = postMemberController;
    putUserController = putMemberController;
    deleteUserController = deleteMemberController;
}

function deleteMemberController( req, res ,next ){

    myUserModel.deleteMemberData( req.body, function( result ){
        if( result.success ){  
        
            res.status(200);
            res.send({
                success : result.success,
                methods : result.methods,
                db : JSON.stringify( result.db ),
            });
            res.end();
        
        }else{
            res.status(404);
            res.end();
        }
    });
}

function putMemberController( req, res ,next ){

    myUserModel.putMemberData( req.body, function( result ){
        if( result.success ){  
       
            res.status(200);
            res.send({
                success : result.success,
                methods : result.methods,
                db : JSON.stringify( result.db ),
            });
            res.end();
    
        }else{
            res.status(404);
            res.end();
        }
    });
}

function postMemberController( req, res ,next ){

    myUserModel.postMemberData( req.body, function( result ){
        if( result.success ){  
            
            res.status(200);
            res.send({
                success : result.success,
                methods : result.methods,
                db : JSON.stringify( result.db ),
            });
            res.end();

        }else{
            res.status(404);
            res.end();
        }
    });
}

function getMemberController( req, res ,next ){

    myUserModel.getMemberData( null, function( result ){
        if( result.success ){  
            
            res.status(200);
            res.send({
                success : result.success,
                methods : result.methods,
                db : JSON.stringify( result.db ),
            });
            res.end();

        }else{
            res.status(404);
            res.end();
        }
    } );
}

