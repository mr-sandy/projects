$env:DATABASE_HOST='localhost'
$env:DATABASE_NAME='projects'
$env:DATABASE_USER_ID='projects'
$env:DATABASE_PASSWORD='projects'

dotnet ef database update
