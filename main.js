define(function (require, exports, module) {
    "use strict";
    

    var CommandManager = brackets.getModule("command/CommandManager"),
        Commands = brackets.getModule('command/Commands'),
        EditorManager = brackets.getModule("editor/EditorManager"),
        Editor = brackets.getModule("editor/Editor").Editor,
        DocumentManager = brackets.getModule("document/DocumentManager"),
        PreferencesManager = brackets.getModule('preferences/PreferencesManager'),
        Menus = brackets.getModule("command/Menus"),
        COMMAND_PLUS = "me.achil.JSMultiline.plus",
        COMMAND_SLASH = "me.achil.JSMultiline.slash",
		menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU),
		windowsCommandPlus = {
			key: "Ctrl-Shift-+",
			platform: "win"
		},
		macCommandPlus = {
			key: "Cmd-Shift-+",
			platform: "mac"
		},
		commandPlus = [windowsCommandPlus, macCommandPlus],
		windowsCommandSlash = {
			key: "Ctrl-Shift-\\",
			platform: "win"
		},
		macCommandSlash = {
			key: "Cmd-Shift-\\",
			platform: "mac"
		},
		commandSlash = [windowsCommandSlash, macCommandSlash],
		js_multiline = require('jsmultiline');

	
	CommandManager.register("JS Multiline Plus", COMMAND_PLUS, run);
	CommandManager.register("JS Multiline Slash", COMMAND_SLASH, run_slash);
	
    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_PLUS, commandPlus);
    menu.addMenuItem(COMMAND_SLASH, commandSlash);
	
	

	
	function run_slash() {
		run(true);
	}
	
	function run(slash) {

		var indentChar,
			indentSize,
			formattedText,
			unformattedText,
			isSelection = false,
			useTabs = Editor.getUseTabChar(),
			editor = EditorManager.getCurrentFullEditor(),
			selectedText = editor.getSelectedText(),
			selection = editor.getSelection(),
			cursor = editor.getCursorPos(),
			scroll = editor.getScrollPos(),
			doc = DocumentManager.getCurrentDocument(),
			language = doc.getLanguage(),
			fileType = language._id;
		
        if (useTabs) {
            indentChar = '\t';
            indentSize = 1;
        } else {
            indentChar = ' ';
            indentSize = Editor.getSpaceUnits();
        }
		
        if (selectedText.length > 0) {
            isSelection = true;
            unformattedText = selectedText;
        }
		
        switch (fileType) {
			case 'javascript':
			formattedText = js_multiline.checkFormat(unformattedText, indentChar, indentSize, slash);
			break;
			case 'json':
			formattedText = js_multiline.checkFormat(unformattedText, indentChar, indentSize, slash);
			break;
			case 'html':
			unformattedText = (isSelection) ? unformattedText : DocumentManager.getCurrentDocument().getText();
			formattedText = js_multiline.checkFormat(unformattedText, indentChar, indentSize, slash);
			break;
			default:
			return;
        }
		
        doc.batchOperation(function () {
			if (isSelection) {
				doc.replaceRange(formattedText, selection.start, selection.end);
				
				editor._codeMirror.setSelection(selection.start, {
					'line': selection.end.line,
					'ch': selection.end.ch + 3
				});
				
			} else {
				doc.setText(formattedText);
			}

            editor.setScrollPos(scroll.x, scroll.y);
			
        });
		
    }
	
});
