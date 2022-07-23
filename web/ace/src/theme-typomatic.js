define("ace/theme/typomatic",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-typomatic";
exports.cssText = ".ace-typomatic .ace_gutter {\
background: #282828;\
color: #e0e0e0\
}\
.ace-typomatic .ace_print-margin {\
width: 1px;\
background: #232323\
}\
.ace-typomatic .ace_cursor {\
color: #e0e0e0\
}\
.ace-typomatic .ace_marker-layer .ace_selection {\
background: rgba(221, 240, 255, 0.20)\
}\
.ace-typomatic.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #141414;\
}\
.ace-typomatic .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.ace-typomatic .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid rgba(255, 255, 255, 0.25)\
}\
.ace-typomatic .ace_marker-layer .ace_active-line {\
background: rgba(255, 255, 255, 0.03125)\
}\
.ace-typomatic .ace_gutter-active-line {\
background-color: rgba(255, 255, 255, 0.03125)\
}\
.ace-typomatic .ace_marker-layer .ace_selected-word {\
border: 1px solid rgba(221, 240, 255, 0.20)\
}\
.ace-typomatic .ace_invisible {\
color: rgba(255, 255, 255, 0.25)\
}\
.ace-typomatic .ace_keyword,\
.ace-typomatic .ace_meta {\
color: #CDA869\
}\
.ace-typomatic .ace_constant,\
.ace-typomatic .ace_constant.ace_character,\
.ace-typomatic .ace_constant.ace_character.ace_escape,\
.ace-typomatic .ace_constant.ace_other,\
.ace-typomatic .ace_heading,\
.ace-typomatic .ace_markup.ace_heading,\
.ace-typomatic .ace_support.ace_constant {\
color: #CF6A4C\
}\
.ace-typomatic .ace_invalid.ace_illegal {\
color: #F8F8F8;\
background-color: rgba(86, 45, 86, 0.75)\
}\
.ace-typomatic .ace_invalid.ace_deprecated {\
text-decoration: underline;\
font-style: italic;\
color: #D2A8A1\
}\
.ace-typomatic .ace_support {\
color: #9B859D\
}\
.ace-typomatic .ace_fold {\
background-color: #AC885B;\
border-color: #F8F8F8\
}\
.ace-typomatic .ace_support.ace_function {\
color: #DAD085\
}\
.ace-typomatic .ace_list,\
.ace-typomatic .ace_markup.ace_list,\
.ace-typomatic .ace_storage {\
color: #F9EE98\
}\
.ace-typomatic .ace_entity.ace_name.ace_function,\
.ace-typomatic .ace_meta.ace_tag {\
color: #AC885B\
}\
.ace-typomatic .ace_string {\
color: #8F9D6A\
}\
.ace-typomatic .ace_string.ace_regexp {\
color: #E9C062\
}\
.ace-typomatic .ace_comment {\
font-style: italic;\
color: #5F5A60\
}\
.ace-typomatic .ace_variable {\
color: #7587A6\
}\
.ace-typomatic .ace_xml-pe {\
color: #494949\
}\
.ace-typomatic .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWMQERFpYLC1tf0PAAgOAnPnhxyiAAAAAElFTkSuQmCC) right repeat-y\
}\
.ace-typomatic .ace_gutter-cell.ace_error {\
background-image: url('ace/css/ace-error.png');\
}\
";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass, false);
});                (function() {
                    window.require(["ace/theme/typomatic"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            
