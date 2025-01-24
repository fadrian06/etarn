drop table if exists users;
create table users (
  id varchar(255) primary key,
  email varchar(255) not null unique check (email like '%@%'),
  password varchar(255) not null,
  admin boolean not null default true,
  user_id varchar(255),

  foreign key (user_id) references users(id)
);
