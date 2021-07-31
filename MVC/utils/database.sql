CREATE DATABASE soa_db;

CREATE TABLE soauser(
    user_id serial primary key,
    email varchar(250) not null unique,
    password varchar(250) not null
);

CREATE TABLE expired_tokens(
    token_id varchar(255) primary key
);

CREATE TABLE sessions(
    sid character varying primary key not null,
    sess json not null,
    expire timestamp(6) without time zone not null
);

CREATE TABLE questions(
    question_id int generated always as identity,
    user_id int,
    title varchar(255) not null,
    question_text text not null,
    keywords text[],
    asken_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- answers text[],
    primary key(question_id),
    constraint fk_user foreign key(user_id) references soauser(user_id) on delete no action
);

CREATE TABLE answers(
    answer_id serial primary key,
    user_id int,
    question_id int,
    answer_text text not null,
    answered_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    constraint fk_user foreign key(user_id) references soauser(user_id) on delete no action,
    constraint fk_question foreign key(question_id) references questions(question_id) on delete no action
);
