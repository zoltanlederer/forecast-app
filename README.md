# Forecast App

## [Demo oldal](https://forecast-zoltan.netlify.app)
Teszteléshez a kulcs: 1797475b23c89795b6c891c69a22224f

### Funkcionalitás

- Az API használatával jelenítse meg a következő adatokat:
    - Hőmérséklet
    - Időjárás (Rain, Sunny, stb.)
    - Hőérzet
    - Időjárásnak megfelelő design (icon, layout)

- Induláskor egy popup-on kérje be a felhasználó saját API kulcsát.

- Lokalizáció
    - Aktuális pozíció (Ez az alapértelmezett. Az alkalmazás ezzel induljon)
    - Kereső mező (város)

- Reszponzív layout készítése (tablet, telefon, monitor)
- Hibakezelés (pl. Aktuális pozíció használata nem elérhető)
- Napszaknak megfelelő üdvözlés
    - 07:00 – 12:00
    - 12:00 – 18:00
    - 18:00 – 07:00

- Többnyelvűség (kapcsolóval választható)
    - Angol
    - Magyar
- Sötét/világos mód (kapcsolóval választható)
- Frissítés gomb, amivel újra lekérdezhetjük az adott város időjárási
adatait.
- Automatikus frissítés 10 percenként.