--drop table users

/*
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  companyid INTEGER DEFAULT 0
);
*/

--Select * from users

/*
CREATE TABLE items (
  id INTEGER PRIMARY KEY,
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  width INTEGER,
  height INTEGER,
  radius INTEGER,
  companyid INTEGET default 0
);


INSERT INTO items (id, x, y, width, height, radius, companyid)
VALUES
  (1, 50, 50, 100, 50, NULL,1),
  (2, 150, 100, NULL, NULL, 25,1),
  (3, 250, 50, 75, 75, NULL,1);
*/

--Select * from items where companyid =1

/*
INSERT INTO companies (companyname) VALUES
('Infosys'),
('Westpac');
*/

--select * from companies

--PRAGMA table_info(companies);

--update users set companyid = 2 where companyid = 0
--update items set companyid =2
ALTER TABLE items ADD COLUMN img TEXT default 'headshot.png';