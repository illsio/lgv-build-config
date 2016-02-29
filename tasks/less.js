/**
 * Compile LESS files to CSS
 * https://github.com/gruntjs/grunt-contrib-less
 */
module.exports = {
    dev: {
        files: {
            "css/test.css": "modules/**/*.less"
        }
    }
};
