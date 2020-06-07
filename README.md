# Rejestracja Produktu

# Uruchamianie projektu w Camundzie

1. Import dependency w mavenie,
2. Maven install (po prawej strony ide) - utworzenie pliku .war
3. Uruchomić raz serwer Camundy,
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

# CORS

1. Należy przejść do katalogu ```webapps/engine-rest/WEB-INF/web.xml``` w Camundzie
2. W katalogu znajduję się plik ```web.xml```, należy dodać do niego poniższy kod  w dowolnym miejscu wewnątrz znacznika ```<web-aap/>``` np. pod innymi filtrami.

```xml
  <filter>
    <filter-name>CorsFilter</filter-name>
    <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
  </filter>
  <filter-mapping>
    <filter-name>CorsFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

# Instrukcja przerwania

1. Uruchomić serwer Camundy
2. Uruchomić projekt 

## Aby wykonać przerwanie:

W Postmanie na adres
```localhost:8080/engine-rest/signal ```
Wykonać metodę POST z następującym body
```
{
  "name" : "ProductTakenDownSignal"
} 
```


