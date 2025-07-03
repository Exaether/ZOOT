# The ZOOT system

A set of tools for Arknights.  
I don't trust PRTS anymore, so i created this.  
ZOOT can help you analyse multiple things, including:

- Review operators
    - Stats
    - DPS/HPS/Survivability calculation
    - Comparisons
- Events (still in dev)
    - Shop calculations
    - Ressources

# Setup guide for devs
To setup a ZOOT server, follow the instructions:
- clone this repo
- `cd ZOOT`
- `npm install`

## run the server
For dev:
```
npm run watch
```
- Live restart of file change
- Debug logs

For prod:
```
npm start
```

This website is made with the Express framework
