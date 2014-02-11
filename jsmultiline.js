/*
 * The MIT License (MIT)
 * Copyright (c) 2014 Achilleas Kiritsakas. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

define(function (require, exports, module) {
    "use strict";
    
	var rexEmptyLines = /(^[ \t]*\n)/gm,
		rexLastTabs = /(\t+|\s+)$/gm,
		rexCont = /[^\t\s].*[^\t\s]/,
		rexFormatted = /('*\s[\+|\\|])/g;
	
	
	function _format(text, indentChar, indentSize, slash) {
		var lines = text.split('\n'),
			len = lines.length,
			symbol = (slash) ? '\\' : '+',
			quote = (slash) ? '' : "'",
			x = 0;
		
		for (x; x < len; x++) {
			lines[x] = lines[x].replace(rexLastTabs, '');
			
			if (x === len - 1) {
				lines[x] = lines[x].replace(rexCont,  quote + lines[x].match(rexCont) + "';");
			} else if (x === 0 && slash) {
				lines[x] = lines[x].replace(rexCont, "'" + lines[x].match(rexCont) + " " + symbol);
			} else {
				lines[x] = lines[x].replace(rexCont, quote + lines[x].match(rexCont) + quote + " " + symbol);
			}
		}
			
		return lines.join('\n');
		
	}
	

	function _checkFormat(text, indentChar, indentSize, slash) {
		var formatted = '',
			endsWith = function (txt, char) {
				return txt.charAt(txt.length - 1) === char;
			};
		 
		if (text.indexOf('\n') === -1 && (endsWith(text, ";") || endsWith(text, "\\"))) {
			return text.substr(1, text.length - 3);
		}

		if (rexFormatted.test(text)) {
			formatted = text.replace(rexFormatted, '');
			formatted = formatted.replace(/\t'/g, '\t');
	
			return formatted.substr(1, formatted.length - 3);
		} else {
			text = text.replace(/'/g, '"');
			
			return _format(text.replace(rexEmptyLines, ""), indentChar, indentSize, slash);
		}
		
	}
	
	
   
    
    // --- Export ---
    exports.checkFormat = _checkFormat;
});