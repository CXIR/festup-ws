# festup-ws
Festup web services

Before using this API please follow these instructions : 

Make some commands w/ npm : 
  - npm install --save
  - npm install sequelize --save
  - npm install sequelize mysl2 --save
  - npm install disconect --save
  
This API uses Sequelize V4, which require MySQL 2 
"disconect" package is Discogs

To run : npm start
Make sure your database is called Festup_db_development

To add some items in database, please add first : 
  - Type of link, media or platform name
  
Then create a Festival w/ address, 
     follow by list of artists, 
     follow by scene, 
     follow by prices, 
     follow by media / platform, 
     follow by timetable (scene + scene + festival)
