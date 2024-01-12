Księga Gości - Aplikacja
Instrukcje instalacji
1. Pobranie repozytorium

Po pobraniu repozytorium, otwórz terminal i przejdź do głównego katalogu projektu.
2. Konfiguracja bazy danych
a. W phpMyAdmin

Utwórz nową bazę danych o nazwie 'guestbook'.
b. W pliku server

W pliku server, wykonaj następujące kroki:

    Otwórz terminal w katalogu server.
    Wykonaj komendę: npm install express mysql2 sequelize argon2 cors dotenv.

3. Instalacja nodemon

Aby uruchamiać serwer za pomocą nodemon, wykonaj komendę: npm install -g nodemon.
4. Uruchomienie serwera

Aby uruchomić serwer, przejdź do katalogu server i wykonaj komendę: nodemon index.
5. Utworzenie tabel w bazie danych

W pliku server/index.js znajdziesz zakomentowane linie kodu dotyczące utworzenia tabel w bazie danych. Odkomentuj te linie, uruchom serwer, a następnie ponownie zakomentuj linie.
6. Konfiguracja klienta
a. W folderze client

    Otwórz terminal w katalogu client.
    Wykonaj komendę: npm install react-router-dom axios bulma react-icons react-gr-code.

7. Uruchomienie aplikacji React

Aby uruchomić aplikację React, wykonaj komendę: npm start w katalogu client.