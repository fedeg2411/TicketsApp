## version de node utilizada v18.14.1
## version de nest 9.2.0

```bash
$ npm install nestjs@9.2.0
```
## Esta aplicacion fue hecha utilziando yarn version 1.22.19
```bash
$ npm instal yarn@1.22.19
```

## Implementacion con postgres en docker
```bash
$ yarn install
```
```bash
$ docker-compose up -d
```
crear archivo .env =>

DB_PASSWORD = MySecr3tPassword
DB_NAME = TesloDB
DB_HOST = localhost
DB_PORT = 5432
DB_USERNAME = postgres

JWT_SECRET = MySecr3tPassword24

AWS_REGION = Region
AWS_ACCESS_KEY = AccesKey
AWS_SECRET_KEY = SecretKey
AWS_BUCKET = BucketName

## Implementacion con posgres en RDS AWS

crear archivo .env =>

DB_PASSWORD = MySecr3tPassword
DB_NAME = 
DB_HOST = ticketsapp.c01ftighstfu.us-east-1.rds.amazonaws.com
DB_PORT = 5432
DB_USERNAME = postgres

JWT_SECRET = MySecr3tPassword24

AWS_REGION = Region
AWS_ACCESS_KEY = AccesKey
AWS_SECRET_KEY = SecretKey
AWS_BUCKET = BucketName




En la documentacion 

https://docs.google.com/document/d/1aKlcOOrruoDGUrMz7dtCZCt4_mSsRXdPrIUI4IU9GeQ/edit?usp=sharing
 
se encuentran las claves de acceso al bucket.

Tambien hay una copia en la raiz.

## Running the app
```bash
# development
$ yarn run start:dev
```

Luego de inicializar el proyecto abrir la coleccion de postman 
esta se encuentra en la raiz del proyecto llamada "TicketsApp_collection.json"


