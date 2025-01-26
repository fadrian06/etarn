drop table if exists users;
create table users (
  id varchar(255) not null primary key,
  name varchar(255) not null check (length(name) >= 3),
  email varchar(255) not null unique check (email like '%@%'),
  password varchar(255) not null,
  admin boolean not null default true,
  phone_personal varchar(255) unique check (phone_personal like '__________%'),
  phone_job varchar(255) unique check (phone_personal like '__________%'),
  phone_home varchar(255) unique check (phone_personal like '__________%'),
  user_id varchar(255),

  foreign key (user_id) references users(id)
);
