
.\mvnw.cmd clean install

.\mvnw spring-boot:run



### PostgreSQL (Running local - now we don't need this as we have a container)
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

# Development
To run the backend development server, use the docker-compose.yml file. To start the server, run the following command:
docker-compose up --build

This will expose the backend to traffic from the local machine on port 8080.

# Production



### Setup
CREATE TABLE locations (    id UUID PRIMARY KEY,    name VARCHAR(255),    url VARCHAR(255));
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
INSERT INTO locations (id, name, url) VALUES (uuid_generate_v4(), 'Islington', 'https://bookings.better.org.uk/location/islington-tennis-centre/tennis-court-outdoor/');

CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'FAILED');
CREATE TABLE scheduled_bookings (
    id UUID PRIMARY KEY,
    location UUID REFERENCES locations(id) ON DELETE CASCADE ON UPDATE CASCADE,
    booking_time TIMESTAMPTZ NOT NULL,
    status booking_status NOT NULL
);

INSERT INTO scheduled_bookings (id, location, booking_time, status)
VALUES (uuid_generate_v4(), '49784527-8117-4aab-b7d8-cb5f2c2834be', '2024-06-29T10:15:30+00:00', 'PENDING');



# Dockerfile
Contains the instructions to build the Docker image

EXPOSE 8080: informs Docker that the container listens on the specified network ports at runtime.
It doesn't actually publish the port to the host machine; it's a way to document the intended network port for the container. To make the port accessible on the host, you still need to use the -p flag with docker run, like so: -p 8080:8080.FROM ubuntu:latest

### Building
docker build -t tennis-bot:latest .

### Running
docker run -p 8080:8080 tennis-bot:latest

# In Development
java -jar -Dspring.profiles.active=development your-app.jar
# In Production
java -jar -Dspring.profiles.active=production your-app.jar


### Google Cloud
tennis-bot-postgres
password

docker build -t gcr.io/tennis-bot-427320/tennis-bot:latest .
docker push gcr.io/tennis-bot-427320/tennis-bot:latest

gcloud run deploy tennis-bot ^
--image gcr.io/tennis-bot-427320/tennis-bot:latest ^
--region europe-west2 ^
--platform managed ^
--add-cloudsql-instances tennis-bot-427320:europe-west2:tennis-bot-postgres ^
--env-vars-file env.yaml

### Fuck
i had a very long error where i could not connect to the remote SQL DB
its because I did not rebuild my jar correctly so the wrong jar was being copied into the deployed container

### Connencting to Cloud SQL
set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\Alex\Documents\Repos\tennis-bot\backend\credentials\tennis-bot-427320-d9365ffc068b.json
cloud-sql-proxy.exe tennis-bot-427320:europe-west2:tennis-bot-postgres


# Did I have to do this? I have a separate service account for the cloud sql proxy
gcloud projects add-iam-policy-binding tennis-bot-427320  --member=serviceAccount:47201373461-compute@developer.gserviceaccount.com --role=roles/cloudsql.client

