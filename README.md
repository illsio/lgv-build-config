CSL
=================

Command für den Grunt build

* grunt build --path=portal/master --name=master-p --env=internet

Kopieren 
* 'lgv-config' Ordner in 'C:\Users\CSL\IdeaProjects\masterP\lgv\dist\2.0.1\master-p'

Navigate (for netlify)
* cd C:\Users\CSL\IdeaProjects\masterP\lgv\dist\2.0.1\master-p

netlify (braucht ihr einen eigenen accoutn ...)
* netlify deploy -s master-p





# LGV Build Configuration for Grunt
#
#### Links zu den eingesetzten Tasks
- [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean)
- [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)
- [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)
- [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)
- [grunt-jscs](https://github.com/jscs-dev/grunt-jscs)
- [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
- [grunt-contrib-requirejs](https://github.com/gruntjs/grunt-contrib-requirejs)
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
- [grunt-connect-proxy](https://github.com/drewzboto/grunt-connect-proxy)
- [grunt-jsdoc](https://github.com/krampstudio/grunt-jsdoc)

#### Vorschlag für eine Versionierung
```
2.3.5
│ │ └───── Revisionsnummer --> Fehlerbehebungen, Refactoring
│ └─────── Nebenversionsnummer --> funktionelle Erweiterungen, neue Tasks
└───────── Hauptversionsnummer --> komplette Umstrukturierung des Codes
```

# corsserver

Lokaler Server, der CORS für alle Domains (*) konfiguriert hat. Läuft unter Port 3000 und bietet das Master-Portal unter lgv-cors an, wenn im Master-Ordner unter node_modules installiert.
Diese Schritte sind notwendig im Master-Ordner, um den Server zu installieren und zu starten:

```
# cd node_modules/build-config/corsserver
# npm install
# node server.js
```
