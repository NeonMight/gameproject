create database if not exists game;
use game;

drop table accounts;
create table if not exists accounts(
username varchar(100) not null,
password varchar(100) not null,
score int not null,
rank varchar(100) not null,
primary key(username)
)
