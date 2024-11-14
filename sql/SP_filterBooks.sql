CREATE PROCEDURE filterBooks
    @Title NVARCHAR(255),
    @Author NVARCHAR(255),
    @Genre NVARCHAR(255),
    @StartYear DATE,
    @EndYear DATE,
    @ISBN NVARCHAR(14)
AS
BEGIN
    SELECT * FROM Inventory 
    WHERE Title LIKE '%' + @Title + '%' AND
    Author LIKE '%' + @Author + '%' AND
    Publication >= @StartYear AND
    Publication <= @EndYear AND
    ISBN LIKE '%' + @ISBN + '%' AND
    (@Genre IS NULL OR EXISTS (
        SELECT 1 FROM string_split(@Genre, ',') AS InputGenres
        WHERE TRIM(InputGenres.[value]) IN (SELECT TRIM(value) FROM string_split(Inventory.Genre, ','))
    ))
END