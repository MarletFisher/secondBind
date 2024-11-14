-- CREATE DATABASE SecondBindDB
-- USE SecondBindDB

-- DROP TABLE dbo.Inventory;

-- DB Creation
CREATE TABLE Inventory (
    EntryID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Author NVARCHAR(255) NOT NULL,
    Genre NVARCHAR(255) NOT NULL,
    Publication DATE,
    ISBN NVARCHAR(14)
)

-- DB Sample
INSERT INTO Inventory (Title, Author, Genre, Publication, ISBN) VALUES ('I Am A Cat', 'Soseki Natsume', 'Comedy,Satire', '1906', '9780804832656');
INSERT INTO Inventory (Title, Author, Genre, Publication, ISBN) VALUES ('Crime and Punishment', 'Fyodor Dostoevsky', 'Crime,Philosophy', '1866-12-01', '9780553211757');
INSERT INTO Inventory (Title, Author, Genre, Publication, ISBN) VALUES ('Jojos Bizarre Adventure - Golden Wind', 'Hirohiko,Araki', 'Adventure,Action,Manga', '1995-12-11', '9781974723492');
INSERT INTO Inventory (Title, Author, Genre, Publication, ISBN) VALUES ('JAPAN INC', 'Ishinomori, Shotaro', 'Commentary,Non-fiction,Manga', '1988', '9780520062894');

SELECT * FROM Inventory;

-- Testing

DROP PROCEDURE dbo.InsertBook;

EXEC InsertBook
    @Title='I Am A Cat',
    @Author='Soseki Natsume',
    @Genre='',
    @Publication DATE,
    @ISBN NVARCHAR(14)

-- Test Methods
EXEC filterBooks
    @Title='',
    @Author='',
    @Genre='Philosophy,',
    @StartYear='0001-01-01',
    @EndYear='2024-12-31',
    @ISBN=''

