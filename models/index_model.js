module.exports = class CIndexModel {
    modelHelloWorld(req, res ,next) {
        // do something
        res.render('index', { title: 'Express', msg: 'Hello World!!' });
    }
}