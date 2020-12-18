## JAFA or Just another fitness app

[Production](https://jafa.ollikh.xyz/)

The purpose of this application is to keep track of your workout while exercising and to follow your progress between exercises. The main functionality revolves around creating workouts and adding exercise sets to them.

[Documentation](https://github.com/ollikehy/jafa/blob/master/documentation/rootdocument.md)

[Hours used on project](https://github.com/ollikehy/jafa/blob/master/documentation/hours.md)


#### Running project

First build the project at root with `docker-compose build` and then run with `docker-compose up`

Server needs `.env`-file with following fields:
```
MONGO_USER=
MONGO_PASS=
JWT_SECRET=
ADMIN_PASS=
```

#### Testing project

Build the project and then run it at root with `docker-compose -f docker-compose.yml -f docker-compose-ci.yml up`

After the project is running you run cypress at client with `npm run cypress:open` or `npm run cy:test`

Run jest tests at server with  `npm run test`
