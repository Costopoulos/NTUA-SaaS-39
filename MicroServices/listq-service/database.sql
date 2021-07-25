CREATE DATABASE listq_mss;

CREATE TABLE questions(
    question_id int generated always as identity,
    user_id int,
    user_email varchar(255),
    title varchar(255) not null,
    question_text text not null,
    keywords text[],
    asken_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    primary key(question_id)
);

CREATE TABLE answers(
    answer_id serial primary key,
    user_id int,
    user_email varchar(255),
    question_id int,
    answer_text text not null,
    answered_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    constraint fk_question foreign key(question_id) references questions(question_id) on delete no action
);