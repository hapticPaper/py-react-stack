create table fake_users (id integer, name text);

COPY fake_users
FROM '/app/data_import/data.csv'
CSV
HEADER