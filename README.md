# Northcoders News API

This API provides data from the nc_news database. The database was built with postgres, and contains data for articles, topics, comments and users, which are accessible via the endpoints provided in this repository.

The hosted version of the API can be found here: https://nc-news-uv52.onrender.com

## Prerequisites

To use this repository, please ensure that the following are installed:

- Node.js v21.4.0
- Postgres v14.10
- Node package manager v10.2.4

## Using this repository

To set up your own version of this repository, follow the instructions below.

1. In the command line, navigate to the folder you wish to work from, and run the following code:
```
git clone https://github.com/alicewilson17/nc-news.git
cd nc_news
```

2. Open the directory in your code editor of choice, e.g. VSCode.

3. To install the dependencies that are needed for this project, run the following command:
```
npm install
```
The following dependencies should have been installed:
- husky
- dotenv
- express
- pg
- fs

The following developer dependencies should have been installed:
- jest
- jest-extended
- jest-sorted
- supertest
- pg-format

5. Creating the environment variables

To run this project locally, you will need to create the necessary environment variables.

To do this, create two .env files: `.env.test` and `.env.development`. Into each file, add `PGDATABASE=`, with the correct database name for that environment (for database names, see /db/setup.sql).

Check that these .env files are .gitignored.

6. Create the databases by running the following command:
```
npm run setup-dbs
```

7. Seed the development database by running the following command:
```
npm run seed
```

## Running Tests

This project was created according to Test Driven Development practices. The test suite can be found in the `__tests__/app.test.js` directory. 

To run the test suite for the api, run the following command:
```
npm test
```
The test suite uses the data from the test database. The test suite is set up such that the test database will be re-seeded before each test is run, to ensure that the outcome of a given test is not affected by any of the previous tests.

## Endpoints 

The endpoints for this api are described in the endpoints.json file in this repository.





