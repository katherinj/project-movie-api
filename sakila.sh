#!/bin/bash
echo "Importing Sakila DB"

# Import the Sakila schema
mysql -u root -p password < sakila-schema.sql

# Import the Sakila data
mysql -u root -p password < sakila-data.sql

echo "Sakila DB imported successfully"