const IndexModel = require('../models/index_model');

const indexModel = new IndexModel();

module.exports = class CIndexController {
    controllerHelloWorld(req, res ,next) {
        // do something
        // 呼叫特定的model
        // 從資料庫將資料撈完後進行res.json的動作。
        indexModel.modelHelloWorld( req, res, next );
    }
}