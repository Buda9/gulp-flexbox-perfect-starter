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
###Watcher
Watches for file changes and runs gulp taks

	gulp watcher
	
###Serve
Runs browser-sync, Launches default broswer (localhost:3000) and watches for any changes and live reloads

	gulp serve
	
###Deploy
Runs optimisation scripts on your 'app' directory and moves the output to your 'dist' directory

	gulp deploy
