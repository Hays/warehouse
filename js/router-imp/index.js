var html = require('./htmlHandler');
// var data = require('./dataHandle');
import dataHandle from './dataHandle'

const { addItem } = dataHandle

function initRouterHandler(router) {
    router.get('/', html.homeHandle);
    addItem();
}

module.exports = initRouterHandler;