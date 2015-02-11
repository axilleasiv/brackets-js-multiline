brackets-js-multiline
=====================

[Brackets](https://github.com/adobe/brackets/) extension that adds multiline string support for javascript


## Features
* transform a selected area in a javascript file or html file into multiline string 
by adding backslash per line or by string concatenation
* unformat previous formatted multiline string to the initial string
* if no text selected in a html file transform the entire text in this will be formatted

## Install

#### Git Clone
1. Select **Brackets > Help > Show Extensions Folder..**
2. Git clone this repository inside the folder user.


## Key Bindings - Commands

The default key bindings are "shift+ctrl++" for string concatenation and "shift+ctrl+\",
to use the not so safe add backslash per line for Windows and "shift+cmd++", "shift+cmd+\" for Mac

if the string is already formatted, both two commands will unformat the string to the
initial state


