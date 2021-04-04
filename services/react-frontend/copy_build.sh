#build the project for production
cd /usr/src/app 
npm install --verbose
npm run build
cp -R -p /usr/src/app/build/* /usr/src/build
cp -R -p /usr/src/app/node_modules/* /usr/src/node_modules
cd /usr/src/app && npm start dev