
# Database API Documentation

This repository contains two Node.js applications for connecting to PostgreSQL and MongoDB Atlas databases.

## Installation

Before running the applications, ensure you have Node.js and npm installed on your system.

1. Clone the repository to your local machine. {}
```
[repo](https://github.com/PrajsRamteke/API-mongo-postgres.git)
```

2. Navigate to the cloned directory.

3. Install the necessary npm packages by running:
   ```bash
   npm install express pg mongoose body-parser dotenv
   ```

## Configuration

Set up the required environment variables before running the applications.

### For PostgreSQL (`postgresapi.js`):

Create a `.env` file in the root directory and add the following environment variables:
```
# PostgreSQL connection parameters
DB_USER=your_database_user
DB_HOST=your_database_host
DB_DATABASE=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=your_database_port

# Customizable variables for PostgreSQL queries
DB_TABLE_NAME=your_table
DB_DATA_FIELD=data_field
```

### For MongoDB (`mongoapi.js`):

Add your MongoDB Atlas connection string in the `.env` file:
```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=3000
```

## Running the Applications

To run the PostgreSQL application:
```bash
node src/postgreeapi.js
```

To run the MongoDB application:
```bash
node src/mongoapi.js
```

## API Endpoints

Both applications provide the following endpoints:

- `POST /add`: Add data to the database.
- `GET /fetch`: Retrieve data from the database.
- `PATCH /update`: Update existing data in the database.
- `PUT /update/id`: Update all existing data in the database.
- `DELETE /delete`: Delete data from the database.

### API Deployment on Production

 change the as per your production deploy file

- `npm start` script to prioritize `mongoapi.js`:
  ```json
  "start": "node src/mongoapi.js --omit=dev  || node src/postgresapi.js --omit=dev"
  ```

- `npm start` script to prioritize `postgresapi.js`:
  ```json
  "start": "node src/postgresapi.js --omit=dev || node src/mongoapi.js --omit=dev"
  ```

## Note

Ensure to replace the placeholder values in the `.env` file with your actual database credentials and connection strings.
