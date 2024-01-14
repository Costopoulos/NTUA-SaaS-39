CREATE DATABASE client_mss;

CREATE TABLE sessions(
    sid character varying primary key not null,
    sess json not null,
    expire timestamp(6) without time zone not null
);
