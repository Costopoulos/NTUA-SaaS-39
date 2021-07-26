CREATE DATABASE answerq_mss;

CREATE TABLE answers(
    answer_id serial primary key,
    user_id int,
    user_email varchar(255),
    question_id int,
    answer_text text not null,
    answered_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);