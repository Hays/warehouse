var html = require('./htmlHandler');
var data = require('./dataHandle');

function initRouterHandler(router) {
    router.get('/', html.homeHandle);
}

module.exports = initRouterHandler;