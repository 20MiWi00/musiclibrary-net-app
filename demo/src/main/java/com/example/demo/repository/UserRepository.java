package com.example.demo.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User,String> {
    User findByLogin(String login);
    User findUserById (int id);

    @Query(value = "SELECT login FROM users WHERE role = 'user'", nativeQuery = true)
    List<String> findAllLogins();

}

/*
create table users(
	id serial primary key,
	login varchar(255) unique,
	password varchar(255),
	name varchar(255),
	surname varchar(255),
	email varchar(255) unique,
	role varchar(255)
);

create table entries(
	id Serial primary key,
	user_id int not null,
	title varchar(255),
	singer varchar(255),
	category varchar(255),
	yearOfProduction varchar(255),
	description text,
	songTrack text,
	vinylVersions text,
	filename varchar(255),
	Constraint f_user FOREIGN KEY(user_id) references users(id)
)
 */
