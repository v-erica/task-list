DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial primary key,
    username text unique not null,
    password text not null
);

CREATE TABLE tasks (
    id serial primary key,
    title text not NULL,
    done boolean not null default false,
    user_id int not null references users(id) on delete cascade
);
