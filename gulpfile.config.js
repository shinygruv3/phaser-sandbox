'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        this.source = 'src/';
        this.dist = 'dist/';

        this.distJs = 'dist/js/';
        this.allJavaScript = [this.distJs + '/**/*.js'];
        this.allTypeScript = this.source + '/*.ts';

        this.phaserDistPath = 'node_modules/phaser/build/';
        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = './typings/modules/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;