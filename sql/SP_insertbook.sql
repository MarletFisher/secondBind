CREATE PROCEDURE InsertBook
    @Title NVARCHAR(255),
    @Author NVARCHAR(255),
    @Genre NVARCHAR(255),
    @Publication DATE,
    @ISBN NVARCHAR(14)
AS
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM Inventory 
        WHERE Title = @Title AND Author = @Author
    )
    BEGIN
        RAISERROR ('A book with the same title and author already exists.', 16, 1);
        RETURN;
    END

    INSERT INTO Inventory (Title, Author, Genre, Publication, ISBN) VALUES (@Title, @Author, @Genre, @Publication, @ISBN);
END