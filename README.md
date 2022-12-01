# Groupomania application

The project consists of building an internal social network for Groupomania employees. the
purpose of this tool is to facilitate interactions between colleagues. The HR department of
Groupomania has imagined several features to promote exchanges between colleagues.

## Prerequisite

- npm

- node

- mysql

## Global actions

Clone this repo `git clone https://github.com/davidd-prog/DavidDecottigny_7_30052022`

Open the folder `cd DavidDecottigny_7_30052022`

## Backend installation

Open the backend folder `cd backend`

Duplicate the sample environment file `.env.example` to `.env`

Configure the environment file by filling in the values for the keys:

```
DB_NAME="Database name"
DB_USER="Database Username"
DB_PASSWORD="Database Password"
DB_PORT="Database port"
DB_HOST="The database host""
DB_DIALECT="The database dialect""

RANDOM_TOKEN_SECRET="The secret key to encrypt the API login token"

PORT='The port on which your application should start. Default is port 3000.'
```

Create a database in mysql making sure that the name of the database is the same as the name you gave for the `DB_NAME` key in the .env file

Create `images` folder.

Run `npm install` from within the project directory.

Run `npm start` from within the project directory.

## Frontend installation

Open the frontend folder `cd frontend`

Run `npm install` from within the project directory.

Run `npm run serve` from within the project directory.
