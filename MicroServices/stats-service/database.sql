CREATE DATABASE stats_mss;

CREATE TABLE questions(
    question_id int generated always as identity,
    keywords text[],
    asken_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    primary key(question_id)
);