var express = require('express');
var router = express.Router();
var cors = require('cors');
var usercontroller = require('../controllers/user_controller');
/*
head：和get一樣，只是head只會取的HTTP header的資料。
get：取得我們想要的資料。
post：新增一項資料。（如果存在會新增一個新的）
put：新增一項資料，如果存在就覆蓋過去。（還是只有一筆資料）。
patch：附加新的資料在已經存在的資料後面。（資料必須已經存在，patch會擴充這項資料）
delete：刪除資料。
*/

/*    
    getUserController = getMemberController;
    postUserController = postMemberController;
    putUserController = putMemberController;
    deleteUserController = deleteMemberController;
    */
const myUserController = new usercontroller();

router.delete('/', cors(), myUserController.deleteUserController );

router.put('/', cors(), myUserController.putUserController );

router.post('/', cors(), myUserController.postUserController );

/* GET users listing. */
//  http://localhost:3000/users/
router.get('/', cors(), myUserController.getUserController );

module.exports = router;
