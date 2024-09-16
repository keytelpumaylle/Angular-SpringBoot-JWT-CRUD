create database dbgeneral;
use dbgeneral;

create table tuser(
idUser char(36) not null,
nameUser varchar(700) not null,
password varchar(2000) not null,
createdAt datetime not null,
updatedAt datetime not null,
primary key(idUser)
) engine=innodb;

create table tperson(
idPerson char(36) not null,
firstName varchar(70) not null,
surName varchar(40) not null,
dni char(8) not null,
gender boolean not null,/*true => Masculino, false => Femenino*/
birthDate date not null,
createdAt datetime not null,
updatedAt datetime not null,
primary key(idPerson)
) engine=innodb;

create table tcomment(
idComment char(36) not null,
idPerson char(36) not null,
description varchar(1000) not null,
likeMe int not null,
createdAt datetime not null,
updatedAt datetime not null,
foreign key(idPerson) references tperson(idPerson) on delete cascade on update cascade,
primary key(idComment)
) engine=innodb;