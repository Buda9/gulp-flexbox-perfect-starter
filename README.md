#Getting Started
___
###Install Gulp
	npm install -g gulp

###Install Bower
	npm install -g bower

###Install Node Modules
	npm install

###Install Bower Packages
	bower install

#Tasks
___

###It will call clean task that will remove previously compiled files before creating new ones

    gulp

###Gulp-useref concatenates any number of CSS and JavaScript files into a single file by looking for a comment that starts with "<!--build:" and ends with "<!--endbuild-->", located in HTML file

    gulp html

###This build task will compile all files into new /public folder. {base: means that the files will keep their starting directory, e.g. styles/main.css will be in styles folder}

    gulp build

###When this command is used it will automatically compile Scss and Javascript files

    gulp serve

###Use if you wish to manually remove compiled files and folders

    gulp clean

###Lossless image optimizer

    gulp imgOptimize

###Browser-Sync Tasks

    gulp run