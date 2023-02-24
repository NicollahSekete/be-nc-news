<p align="center">
  <a href="https://back-end-news-project.onrender.com/api">
    <img src="./media/ezgif.com-video-to-gif.gif" height="300px">
  </a>
</p>

&nbsp;

# NC NEWS API
> [https://back-end-news-project.onrender.com/api](https://back-end-news-project.onrender.com/api)

&nbsp;

 ## 🚩 Table of Contents

- [NC NEWS API](#nc-news-api)
  - [🚩 Table of Contents](#-table-of-contents)
  - [📑 About the project](#-about-the-project)
    - [Key features](#key-features)
  - [🛠️ Set up](#️-set-up)
    - [Clone the repo](#clone-the-repo)
    - [install dependencies](#install-dependencies)
    - [Create 2 .env files](#create-2-env-files)
    - [Create local db](#create-local-db)
    - [Seed the local db](#seed-the-local-db)
    - [start your local server](#start-your-local-server)
    - [run tests](#run-tests)
    - [Check its up and running](#check-its-up-and-running)
  - [🔬 Testing](#-testing)
  - [📍 Minimum requirement](#-minimum-requirement)

&nbsp;

## 📑 About the project
This is a project which was created for the Northcoders backend project. The goal of this is to provide a way to interact with component expected on a news site, such as topics, articles and comments.

### Key features
- Able to retries articles with queries
- Able to Create comments for articles
- Able to update votes on comments
- Able to delete comments


&nbsp;

## 🛠️ Set up
### Clone the repo
```
$ git clone https://github.com/NicollahSekete/be-nc-news.git
```
### install dependencies
```
$ npm install
```
### Create 2 .env files
- Create a .env.test and a .env.development file
- in both file add PGDATABASE=<database_name_here> with the correct database name for the environment (see /db/setup.sql for the database names)


### Create local db
```
$ npm run setup-dbs
```
### Seed the local db
```
$ npm run seed
```
### start your local server
```
$ npm start
```
### run tests
```
$ npm test
```
### Check its up and running
In a browser or with Insonia look up:
```
http://localhost:9090/api/articles/1
```

## 🔬 Testing
You are able to run current tests or tests you create through the predifined test script available.

## 📍 Minimum requirement
- Node version >= 16.0.0
- PostgreSQL version >= 14.6