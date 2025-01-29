CREATE USER admin WITH PASSWORD 'stoboltov';
CREATE DATABASE stoboltov_db OWNER admin;
GRANT ALL PRIVILEGES ON DATABASE stoboltov_db TO admin;
