use blogs;
select discription,username,create_at from post
join user 
on post.id=user.id;
select * from ;

select discription,username,create_at,post_id,user.id from post
     join user 
     on post.id=user.id;
create table user(
  id int primary key auto_increment,
  username varchar(100) not NULL UNIQUE,
  email varchar(100) not null,
  password varchar(100) not null,
  create_at timestamp default current_timestamp 

);
INSERT into user(username,email,password)
values
("kabirhasan","kabir@gmail.com");
SELECT * from post;