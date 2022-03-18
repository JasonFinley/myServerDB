var mysql = require('mysql');

var _DBConfig = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'My_DB_Factory',
    port: 8000,
    ssl: true
};
var _myDBPFMTable = 'My_TB_Performance';

class CMyDataClass{
    id = 0;
    yyyymmdd = 0;
    car_no = 0;
    width = 0;
    line = 0.0;
    yard = 0;
}

var _db_buffer = [];
//   '/mysqldb/'

module.exports = class CFactoryModel {
    getFactoryDB = getMyFactoryDB;
    postFactoryData = postMyFactoryData;
    delFactoryData = delMyFactoryData;
}

function isPushMyData( date, yyyy, mm ){
    
    ymd = date;
    year = Number.parseInt(ymd / 10000);
    month = Number.parseInt((ymd % 10000)/100);
    day = ymd % 100;

    if( mm.toString().indexOf( '*' ) < 0 ){
        if( month == mm )
            return true;
        else
            return false;
    }

    return true;
}

function getTBDataByYYYYMM( result, YYYY, MM ){

    _db_buffer = [];
 //   console.log( result );
    for( i = 0 ; i < result.length ; i++ )
    {
        if( isPushMyData( result[i].YYYYMMDD, YYYY, MM ) == false )
            continue;
        db_data = new CMyDataClass();
        db_data.id = result[i].ID;
        db_data.yyyymmdd = result[i].YYYYMMDD;
        db_data.car_no = result[i].CarNo;
        db_data.width = result[i].Width;
        db_data.line = result[i].Line;
        db_data.yard = result[i].Yard;
        
        _db_buffer.push( db_data );
    }

    return _db_buffer;
}

function pareDBQuery( tb_name, yyyy, mm ){
/*
    $sql = "SELECT * FROM tb_name WHERE YYYYMM LIKE '%201405%' "; 
*/
    year = yyyy.toString();
    month = mm.toString();
    str_sql = 'SELECT * FROM '+ tb_name;

    if( year.indexOf('*') >= 0 && month.indexOf('*') >= 0 ){
    }else if( month.indexOf('*') >= 0 ){
        str_sql += " WHERE YYYYMMDD LIKE '"+year+"%'";
    }else if( year.indexOf('*') >= 0 ){
        str_sql += " WHERE YYYYMMDD LIKE '%"+month+"%'";
    }else{
        str_sql += " WHERE YYYYMMDD LIKE '"+year+month+"%'";
    }

    return str_sql;
}

function getMyFactoryDB( req, callbackfunc ){

    const db_con = mysql.createConnection( _DBConfig );
    db_con.connect( function( err ){
        if( err ){
            console.log("!!! Cannot connect !!! Error:");
            callbackfunc({
                success : false,
                db : [],
            });
            throw err;
        }else{
            console.log( req );
            const strYear = req.year;
            const strMonth = req.month;

            strQuery = pareDBQuery( _myDBPFMTable, strYear, strMonth );
            db_con.query(  strQuery, function( err, result ){
                if( err ){
                    callbackfunc( { success : false, db : [] });
                    throw err;
                }else{
                    arr = getTBDataByYYYYMM( result, strYear, strMonth );
                    callbackfunc({
                        success : true,
                        db : arr,
                    });
                }

            });
        }
    });
}

function postMyFactoryData( req, callbackfunc ){
    console.log( "postMyFactoryData" );
    callback( { success : false, db : [] } );
}

function delMyFactoryData( req, callbackfunc ){
    console.log( "delMyFactoryData" );
    callback( { success : false, db : [] } );
}

