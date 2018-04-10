const fs = require('fs');

function homeHandle(ctx, next) {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./html/index.html');
}

module.exports = {
    homeHandle
};
