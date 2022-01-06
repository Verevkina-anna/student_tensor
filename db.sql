create database student_db;

create table student_db.public.students (
	id serial,
    name varchar(300) not null,
    university varchar(300) not null,
    course int not null,
    city varchar(300) not null,
    avatar_url varchar(300) DEFAULT 'https://yandex.ru/images/search?pos=18&from=tabbar&img_url=https%3A%2F%2Fsun9-67.userapi.com%2Fimpg%2FO66dYyDUUYVjVqulPZMdeG1YXQmeSolKeaw-Eg%2FXYGnyW-DmaQ.jpg%3Fsize%3D604x604%26quality%3D96%26sign%3Daa8aa03a1131b3d52db89229c67a6560%26type%3Dalbum&text=аватарка+png&rpt=simage'
);

INSERT INTO student_db.public.students
	(name, university, course, city, avatar_url) 
VALUES 
	('Анна Волкова', 'СибГУТИ', 2, 'Новосибирск','https://avatars.mds.yandex.net/get-zen_doc/147743/pub_5b9a260de44ba100abfd1bf1_5b9a261a87dcc100ae6d2872/scale_1200'), 
	('Алина Красавина', 'СибГУТИ', 3, 'Новосибирск','https://cokoloco.com/wp-content/uploads/2018/07/happy-charming-young-woman-with-backpack-standing-and-holding-notebooks-in-park.jpg'),
    ('Мария Иванова', 'УГАТУ', 2, 'Уфа', 'https://avatars.mds.yandex.net/get-zen_doc/248942/pub_5a869afaf4a0dd2dff56e7b9_5a869b17c8901051b944f479/scale_1200'), 
	('Владимир Кон', 'УГАТУ', 2, 'Уфа','https://gradepowerlearning.com/wp-content/uploads/2014/06/ThinkstockPhotos-492655144-1024x680.jpg'),
    ('Виктория Андреева','МГУ', 2 , 'Москва','https://visaapp.ru/wp-content/uploads/2018/12/Studentka-universiteta-SHvejtsarii.jpg'),
    ('Антон Николаев', 'ТГУ', 4, 'Томск','https://lentachel.ru/netcat_files/Image/foto/2019/03/07/8b45b3fb3307974d56458ebde6b3bfd1/7d95848ce9.jpg'),
    ('Дарья Гришина', 'УГАТУ', 3, 'Уфа','https://s1.1zoom.ru/big7/948/Female_students_Brown_haired_Hands_Glance_Smile_574711_2560x1706.jpg'),
    ('Петр Еремин', 'СГУПС', 4, 'Новосибирск','https://islamnews.ru/wp-content/uploads/2020/12/6ececc90b536450c4683339361b88dde.png'),
    ('Владислав Алеев', 'КГАСУ', 2, 'Казань','https://perm.hse.ru/data/2021/07/05/1431151151/3shutterstock_1860471403.jpg'),
    ('Семен Расказов', 'УГАТУ', 2, 'Уфа','http://oldmdms.omskportal.ru/ru/RegionalPublicAuthorities/executivelist/MDMS/news/2016/04/18/1460983853344/PageContent/0/image/19.04.16_selektornoe_anons.jpg');
    
    
SELECT * FROM student_db.public.students;