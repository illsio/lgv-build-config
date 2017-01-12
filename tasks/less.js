/**
 * Compile LESS files to CSS
 * https://github.com/gruntjs/grunt-contrib-less
 */
module.exports = {
    dev: {
        files: {
            // master
            "css/test.css": "modules/**/*.less"
            // mml
            // "css/style.css": "css/style.less"
        }
    }
};
