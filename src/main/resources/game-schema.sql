drop table if exists game CASCADE;
create table game (id integer generated by default as identity, genre varchar(255) not null, hours_played integer not null, name varchar(255) not null, primary key (id));