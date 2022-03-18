const axios = require('axios');

var _apiKey = 'mykey';

class CMuseumProduct{
    Serial_No = '';
    ArticleSubject = '';
    CateGory = '';
    Slogan = '';
    art_room = '';
    info = null;
};

class CMuseumProductInfo{
    ArticleMaker = '';
    ArticleContext = '';
    ArticleRemarks = '';
    imgUrl = '';
};

/* 故宮...open api
https://openapi.npm.gov.tw/v1/rest/
=================================================================
    /collection/search/

limit
    integer, 限制最多回傳的資料筆數，上限50筆。

offset
    integer, 指定從第幾筆之後開始回傳資料。

lang
    string [cht|eng], 指定回傳語系。
    
    
return
{
    Serial_No:藏品編號

    ArticleSubject:文物名稱

    CateGory:類別

    Slogan:朝代

    art_room:展場
}    
================================================================
    /collection/search/{collection_id}/

collection_id
    integer, 透過/collection/search/ 所得到之藏品編號(Serial_No)。

lang
    string [cht|eng], 指定回傳語系。

return
{
    Serial_No:藏品編號

    ArticleSubject:文物名稱

    CateGory:類別

    Slogan:朝代

    ArticleMaker:作者

    ArticleContext:文物描述

    ArticleRemarks:規格

    art_room:展場

    imgUrl:代表圖
}


=================================================================    
    /videos/search/
    /exhibition/search/
    /activity/search/
    /visitors/search/
    /info/search/

*/


module.exports = class CMuseumModel {
    getMuseumProducts = getMyMuseumProducts;
    getMuseumProductInfo = getMyMuseumProductInfo;
}

function getMyMuseumProducts(req, callbackfunc ){

    axios({
        method: 'get',
        url: 'https://openapi.npm.gov.tw/v1/rest/collection/search/',
        headers: {'apiKey': _apiKey },
        params:{
            "limit" : req.limlt,
            "offset" : req.offset,
            "lang" : 'cht',
        }
    }).then( function( res ){

        data = res.data;
        console.log( data );

        callbackfunc({
            success : true,
            db : data.result,
        });
    } )
    .catch(function (error){ console.log(error); } );

}

function getMyMuseumProductInfo(req, callbackfunc ){

    axios({
        method: 'get',
        url: 'https://openapi.npm.gov.tw/v1/rest/collection/search/'+req.Serial_No.toString(),
        headers: { 'apiKey' : _apiKey },
        data:{
            "lang" : 'cht',
        }
    }).then( function( res ){
        console.log( res );
        callbackfunc({
            success : true,
            db: res.data.result[0],
        });
    } )
    .catch(function (error){ console.log(error); } );

}