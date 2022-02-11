# Issue Reproduction

This project is a bug reproduction

## Setup

To run the tests illustrating the issue here, you will need a local [postgresql database](https://www.postgresql.org/download/).

The following `psql` commands can get you started with local credentials and databases:

```psql
postgres=# CREATE ROLE example WITH LOGIN PASSWORD '{enter local password here}';
# note: this permission is required to install postgresql extensions (such as "uuid-ossp")
postgres=# ALTER USER example WITH SUPERUSER;
# Create app database (runtime, not needed to run integration tests)
postgres=# CREATE DATABASE "example";
postgres=# GRANT ALL PRIVILEGES ON DATABASE "example" TO example;
postgres=# ALTER DATABASE "example" OWNER TO example;
# Create test database
postgres=# CREATE DATABASE "example-test";
postgres=# GRANT ALL PRIVILEGES ON DATABASE "example-test" TO example;
postgres=# ALTER DATABASE "example-test" OWNER TO example;
```

You can run the `\l` pg command to verify your local setup:

```bash
postgres-# \l
                             List of databases
     Name     |  Owner  | Encoding | Collate | Ctype |  Access privileges  
--------------+---------+----------+---------+-------+---------------------
 example      | example | UTF8     | C       | C     | =Tc/example        +
              |         |          |         |       | example=CTc/example
 example-test | example | UTF8     | C       | C     | =Tc/example        +
              |         |          |         |       | example=CTc/example
```

Finally, install the dependencies:

```bash
yarn install
```

You can check the running "example-app" application if you wish by running

```bash
yarn nx run example-app:serve
```

## Reproduce

It seems something change in `ts-jest@27.1.3` causing the globalTeardown script to crash (and the tests to fail)

- the master branch illustrate a working scenario using `ts-jest` locked to `27.1.2`
- a branch named `reproduction/ts-jest-27.1.3` illustrate the bug (only change being the update from `27.1.2` to `27.1.3`)

### Steps

Run on master branch and notice the successful tests

```bash
git checkout master
yarn install
yarn run test:all
```

>  NX   Successfully ran target test for 3 projects

Then checkout the branch and notice an error:

```bash
git checkout reproduction/ts-jest-27.1.3
yarn install
yarn run test:all
```

> [TSError: apps/example-app-integration/jest/globalTeardown.ts:5:13 - error TS2695: Left side of comma operator is unused and has no side effects.
>       
>       5     return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
