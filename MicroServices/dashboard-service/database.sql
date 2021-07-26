CREATE DATABASE dashboard_mss;

CREATE TABLE questions(
    question_id int generated always as identity,
    user_id int,
    asken_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    primary key(question_id)
);

CREATE TABLE answers(
    answer_id serial primary key,
    user_id int,
    answered_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);