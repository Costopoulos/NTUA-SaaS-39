CREATE DATABASE auth_mss;

CREATE TABLE auth_user(
    user_id serial primary key,
    email varchar(250) not null unique,
    password varchar(250) not null
);

CREATE TABLE expired_tokens(
    token_id varchar(255) primary key
);