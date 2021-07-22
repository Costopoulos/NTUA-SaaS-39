CREATE DATABASE createq_mss;

CREATE TABLE questions(
    question_id int generated always as identity,
    user_id int,
    title varchar(255) not null,
    question_text text not null,
    keywords text[],
    asken_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    primary key(question_id)
);
