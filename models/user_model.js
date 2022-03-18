var mysql = require('mysql');

var _DBConfig = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'My_DB_Factory',
    port: 8000,
    ssl: true
  };
var _myDBUserTable = 'My_TB_Users';
  
  class CMyDataClass{
    id = 0;
    name = '';
    phone = '';
    mail = '';
    create_time = '';
  }
  
var _db_buffer = [];

module.exports = class CUserModel {
    getMemberData = getDBMemberData;
    postMemberData = postBMemberData;
    putMemberData = putDBMemberData;
    deleteMemberData = deleteDBMemberData;
}

function getTBUserData( result ){
    _db_buffer = [];
    for( i = 0 ; i < result.length ; i++ )
    {
        db_data = new CMyDataClass();
        db_data.id = result[i].ID;
        db_data.name = result[i].Name;
        db_data.phone = result[i].Phone;
        db_data.mail = result[i].Mail;
        db_data.create_time = result[i].CreateTime;
        _db_buffer.unshift( db_data );
    }
    return _db_buffer;
}

function deleteDBMemberData( userData, callbackfunc ){
    const db_con = mysql.createConnection( _DBConfig );
    db_con.connect( function( err ){
  
        if( err ){
            console.log("!!! Cannot connect !!! Error:");
            callbackfunc({
                success : false,
                methods : 'delete',
                db : null,
            });
            throw err;
        }else{
            console.log("delete : Connection success..." );
            let data = userData;
            db_con.query( "DELETE FROM "+_myDBUserTable+" WHERE ID = "+data.id,
              function( err, result ){
                if( err ) 
                    throw err;
                else{
                    console.log( result );
                    callbackfunc({
                      success : true,
                      methods : 'delete',
                      db : data,
                    });
                }
  
                db_con.end();
            });            
        }
    });
}

function putDBMemberData( userData, callbackfunc ){
    const db_con = mysql.createConnection( _DBConfig );
    db_con.connect( function( err ){
  
        if( err ){
            console.log("!!! Cannot connect !!! Error:");
            callbackfunc( {
                success : false,
                methods : 'put',
                db : null,
            });
            throw err;
        }else{
  
            console.log("put : Connection success..." );
            let data = userData;
  //          console.log( data );
  
            db_con.query( "UPDATE "+_myDBUserTable+" SET ? WHERE ID = ?", [{
              Name: data.name, 
              Phone: data.phone, 
              Mail: data.mail,
              CreateTime: data.create_time,
            }, data.id ],
              function( err, result ){
                if( err ) 
                    throw err;
                else{
                    console.log( result );
                    callbackfunc( {
                      success : true,
                      methods : 'put',
                      db : data,
                    });
                }
  
                db_con.end();
            });            
        }
    });
}

function postBMemberData( userData, callbackfunc ){
    const db_con = mysql.createConnection( _DBConfig );
    db_con.connect( function( err ){
  
        if( err ){
            console.log("!!! Cannot connect !!! Error:");
            callbackfunc({
                success : false,
                methods : 'post',
                db : null,
            });
            throw err;
        }else{
  
            console.log("post : Connection success..." );
            let data = userData;
       //     console.log( data );
            data.create_time = onTime().toString();
  
            str_sql = "INSERT INTO "+_myDBUserTable+" ( Name, Phone, Mail, CreateTime ) VALUES ( ? )";
            values  = [
              data.name,
              data.phone,
              data.mail,
              data.create_time
            ];
            db_con.query( str_sql, [values], function( err, result ){
                if( err )
                    throw err;
                else{
                    console.log( result );
                    data.id = result.insertId;
                    callbackfunc({
                      success : true,
                      methods : 'post',
                      db : data,
                    });
                }
                db_con.end();
            });            
        }
    }); 
}

function getDBMemberData( userData, callbackfunc ){
    const db_con = mysql.createConnection( _DBConfig );
    db_con.connect( function( err ){

        if( err ){
            console.log("!!! Cannot connect !!! Error:");
            callbackfunc({
                success : false,
                methods : 'get',
                db : null,
            });
            throw err;
        }else{

            console.log("get : Connection success..." );

            db_con.query( "SELECT * FROM "+_myDBUserTable , function( err, result ){
                if( err )
                    throw err;
                else{
                    
                    arr = getTBUserData( result );
                    callbackfunc({
                        success : true,
                        methods : 'get',
                        db : arr,
                    });
                }

                db_con.end();
            });            
        }
    });
}

function onTime(){

    const date = new Date();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mi = date.getMinutes();
    const ss = date.getSeconds();
    
    strTime = date.getFullYear();
    console.log( strTime );
    strTime = strTime * 100 + mm;
    console.log( strTime );
    strTime = strTime * 100 + dd;
    console.log( strTime );
    strTime = strTime * 100 + hh;
    console.log( strTime );
    strTime = strTime * 100 + mi;
    console.log( strTime );
    strTime = strTime * 100 + ss;
    console.log( strTime );
    return strTime;
}
