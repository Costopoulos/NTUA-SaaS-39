CREATE DATABASE soa_db;

CREATE TABLE soa_user(
    user_id serial primary key,
    email varchar(250) not null unique,
    password varchar(250) not null
);

CREATE TABLE expired_tokens(
    token_id varchar(255) primary key
);

CREATE TABLE sessions(
    sid varying primary key not null,
    sess json not null,
    expire timestamp(6) without time zone not null
);

CREATE TABLE saved_sessions(
    session_id varchar(255) primary key not null
);

CREATE TABLE Sessions(
    session_id varchar(255) primary key not null
);