var html = require('./htmlHandler');

function initRouterHandler(router) {
    router.get('/', html.homeHandle);
}

module.exports = initRouterHandler;