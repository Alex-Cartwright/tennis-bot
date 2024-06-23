
.\mvnw.cmd clean install

.\mvnw spring-boot:run



### PostgreSQL
I am running a PostgreSQL server locally.

I need to persist this to the cloud.

I installed Postgresql server. It stores its DB clusters in C:\Program Files\PostgreSQL\16\data.

All the commands to interact with the database are in the bin folder.

I can start the server with the following command:
.\pg_ctl.exe -D "C:\Program Files\PostgreSQL\16\data" -l logfile start


The server is listening on port 5432.
The client connects to the server's listening port.
To change port:
Open the postgresql.conf file located in the data directory (C:\Program Files\PostgreSQL\16\data\postgresql.conf)
then restart
.\pg_ctl.exe -D "C:\Program Files\PostgreSQL\16\data" restart

#### Connecting
psql -U postgres
psql -U postgres -p 5432

password: password

\c tennis_bot




### Setup
CREATE TABLE locations (    id UUID PRIMARY KEY,    name VARCHAR(255),    url VARCHAR(255));
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
INSERT INTO locations (id, name, url) VALUES (uuid_generate_v4(), 'Islington', 'https://bookings.better.org.uk/location/islington-tennis-centre/tennis-court-outdoor/');