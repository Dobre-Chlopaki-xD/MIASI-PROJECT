# Rejestracja Produktu

# Uruchamianie projektu w Camundzie

1. Import dependency w mavenie,
2. Maven install (po prawej strony ide) - utworzenie pliku .war
3. Uruchomić raz serwer Camundym,
4. Plik .war do folderu webapps, w plikach Camundy,
5. Jeśli serwer jest uruchomiony to w uruchomionej aplikacji Tomcata zacznie się deploy aplikacji,
6. Skompilowany projekt jest w dashboardzie Camundy w "Processes", nasz nazywa się process-id-Proces-rejestracji-produktu
7. Aby uruchomić trzeba wejść w tasklist i create instance z nazwą procesu.

# Instrukcja postawienia bazy danych

1. Uruchomić serwer Camundy
2. Wchodzimy na http://localhost:8080/h2/h2/ lub inny url, na którym zhostowany jest serwer
3. Logujemy się do bazy
4. Pośrodku znajduje się pole tekstowe, do którego wprowadzamy query. Kasujemy jego zawartość.
5. Wklejamy następującą formułkę:

```sql
CREATE TABLE produkty(
    IDProduktu int auto_increment NOT NULL PRIMARY KEY,
    Nazwa_produktu varchar(60) NOT NULL,
    Masa_produktu int NOT NULL
);

INSERT INTO produkty1(Nazwa_produktu, Masa_produktu)
values ('Mąka', 1250), ('Ryż', 2000), ('Cukier', 2500), ('Śliwki', 420);

```

# Sterowanie za pomocą REST API

1. Aby uruchomić proces należy podać 
```
/engine-rest/process-definition/key/{nazwa_procesu}/start
```

```
localhost:8080/engine-rest/process-definition/key/process-id-Proces-rejestracji-produktu/start
```
2. W celu znalezienia aktywnego user taska, w którym program czeka na użytkownika należy podać
```
/engine-rest/task?processDefinitionKey={nazwa_procesu}
```

```
localhost:8080/engine-rest/task?processDefinitionKey=process-id-Proces-rejestracji-produktu
```

zapytanie zwróci listę aktywnych zadań opisanych parametrami, z czego ważne są ```id``` oraz ```name```
```
{
        "id": "b6bc708d-a8f8-11ea-b107-0a002700000a",
        "name": "Zdejmij produkt",
        ...
}
```

3. User Task - "Odczytaj dane" wymaga przesłania pliku json, z parametrami
```
{
    "variables": {
        "validData": {
            "value": "true",
            "type" : "Boolean"
        },
        "isTagPresent": {
        	"value": "true",
        	"type" : "Boolean"
        },
    	"ProductID" : {
    		"value" : 1,
    		"type" : "Integer"
    	}
    }
```
na endpoint, gdzie id odpowiada numerowi taska z punktu 2.
```
/engine-rest/task/{id}/complete
```

```
localhost:8080/engine-rest/task/afcf5e3b-a8f8-11ea-b107-0a002700000a/complete
```

4. W przypadku innych user tasków należy wywołać zapytanie o aktywyny user task (punkt 2) i następnie wysłać go bez zawartości na endpoint z punktu 3.
