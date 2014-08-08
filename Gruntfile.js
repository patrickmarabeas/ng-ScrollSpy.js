module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      styles: {
        files: ['demo/styles/main.less'],
        tasks: ['less'],
        options: {

        }
      }
    },
    less: {
      development: {
        options: {
          paths: ["demo/styles"]
        },
        files: {
          "demo/styles/main.css": "demo/styles/main.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['watch', 'less']);

  var changedFiles = Object.create(null);
  var onChange = grunt.util._.debounce(function() {
    grunt.config('less', Object.keys(changedFiles));
    changedFiles = Object.create(null);
  }, 200);
  grunt.event.on('watch', function(action, filepath) {
    changedFiles[filepath] = action;
    onChange();
  });

};