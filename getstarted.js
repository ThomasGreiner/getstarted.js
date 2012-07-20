/* 
 * Copyright 2012 Thomas Greiner
 * thomas@greinr.com
 *
 * The contents of this file are subject to the Artistic License 2.0.
 * The full text can be found in the LICENSE.txt file and at
 * http://www.opensource.org/licenses/artistic-license-2.0
 */
(function getstarted(custom_locale) {
	var show_help_at_start = true;
	var default_locale = "en";
	var custom_locale = custom_locale || document.getElementsByTagName("html")[0].lang || default_locale;
	
	//TODO: load required locales dynamically with (synchronous) XHR and call JSON.parse

	function i18n(id) {
		return locales[custom_locale] && locales[custom_locale][id] || locales[default_locale][id];
	}

	function check(v, vName) {
		var hasError = false;
		var errMsg = vName+" "+i18n("_error_check")+" ";
		var typeName = i18n("_info_different");
		var typeOf = "object";

		switch(vName) {
			case "class_name":
			case "content":
			case "id":
			case "locale":
			case "name":
			case "tag_name":
			case "text":
			case "text_to_search":
				typeOf = "string";
				typeName = i18n("_info_string");
				break;
			case "element":
				typeOf = HTMLElement;
				typeName = i18n("_info_HTMLElement");
				break;
			case "elements":
				typeOf = NodeList;
				typeName = i18n("_info_NodeList");
				break;
		}

		if(typeof(typeOf) == "string") {
			hasError = typeof(v) != typeOf;
		} else {
			hasError = !(v instanceof typeOf);
		}
		if((typeof(typeOf) == "string") ? typeof(v) != typeOf : !(v instanceof typeOf)) {
			throw new Error(errMsg+typeName);
		}
	}

	window._getstarted = new (function() {
		this[i18n("hide_help_at_start")] = function() {
			show_help_at_start = false;
		}
		
		//TODO: remove global variables of previous locale when called
		this.set_locale = this[i18n("set_locale")] = function(locale) {
			check(locale, "locale");
			if(!locales[locale])
				throw new Error(i18n("_error_unknown_locale")+" "+default_locale);

			document.removeEventListener("DOMContentLoaded", welcome);
			getstarted(locale);
		}
		
	})();

	window[i18n("about_getstarted")] = new (function() {
		this[i18n("contact_developer")] = function() {
			location.href = "https://twitter.com/#!/ThomasGreiner";
		}
		this[i18n("show_examples")] = function() {
			location.href = "http://www.greinr.com";
		}
	})();

	window[i18n("add")] = new (function() {
		this[i18n("and_create_new_element_to_page_that_is")] = function(tag_name) {
			check(tag_name, "tag_name");

			var element = document.createElement(tag_name);
			document.body.appendChild(element);
			return element;
		}
		this[i18n("existing_element_to_page")] = function(element) {
			check(element, "element");

			try {
				document.body.appendChild(element);
			} catch(ex) {
				console.error("System "+ex.stack.substr(0, ex.stack.indexOf("\n")));
			}
		}
	})();

	window[i18n("change")] = new (function() {
		this[i18n("class_of_element")] = function(element, class_name) {
			check(element, "element");
			check(class_name, "class_name");

			element.className = class_name;
		}
		this[i18n("content_of")] = new (function() {
			this[i18n("each_element")] = function(elements, content) {
				check(elements, "elements");
				check(content, "content");

				for(var i=0, len=elements.length; i<len; i++) {
					elements[i].innerHTML = content;
				}
			}
			this[i18n("element")] = function(element, content) {
				check(element, "element");
				check(content, "content");

				element.innerHTML = content;
			}
		})();
		this[i18n("id_of_element")] = function(element, id) {
			check(element, "element");
			check(id, "id");

			element.setAttribute("id", id);
		}
		this[i18n("name_of_element")] = function(element, name) {
			check(element, "element");
			check(name, "name");

			element.setAttribute("name", name);
		}
		this[i18n("text")] = new (function() {
			//...
		})();
		this[i18n("visibility_of_element_to")] = new (function() {
			this[i18n("hidden")] = function(element) {
				check(element, "element");

				element.style.display = "none";
			}
			this[i18n("the_opposite")] = function(element) {
				check(element, "element");

				if(element.style.display == "none") element.style.display = "inline";
				else element.style.display = "none";
			}
			this[i18n("visible")] = function(element) {
				check(element, "element");

				element.style.display = "inline";
			}
		})();
	})();

	window[i18n("find_out")] = new (function() {
		this[i18n("if_text")] = new (function() {
			this[i18n("contains")] = function(text, text_to_search) {
				check(text, "text");
				check(text_to_search, "text_to_search");

				return text.indexOf(text_to_search) > -1;
			}
			this[i18n("ends_with")] = function(text, text_to_search) {
				check(text, "text");
				check(text_to_search, "text_to_search");

				return text.lastIndexOf(text_to_search)+text_to_search.length == text.length;
			}
			this[i18n("starts_with")] = function(text, text_to_search) {
				check(text, "text");
				check(text_to_search, "text_to_search");

				return text.indexOf(text_to_search) == 0;
			}
		})();
		this[i18n("more_about_element")] = function(element) {
			check(element, "element");

			var descr = i18n("_msg_more")+" ";
			switch(element.tagName) {
				case "BODY":
					descr += i18n("_info_BODY");
					break;
				case "IMG":
					descr += i18n("_info_IMG");
					break;
				case "HTML":
					descr += i18n("_info_HTML");
					break;
				default:
					descr = i18n("_info_none");
			}

			console.log(descr);
			console.dir(element);
		}
	})();

	window[i18n("get")] = new (function() {
		this[i18n("content_of")] = new (function() {
			this[i18n("element")] = function(element) {
				check(element, "element");

				return element.innerHTML;
			}
		})();

		this[i18n("element_that")] = new (function() {
			this[i18n("has_class")] = function(class_name) {
				check(class_name, "class_name");

				return document.getElementsByClassName(class_name)[0];
			}
			this[i18n("has_id")] = function(id) {
				check(id, "id");

				return document.getElementById(id);
			}
			this[i18n("has_name")] = function(name) {
				check(name, "name");

				return document.getElementsByName(name)[0];
			}
			this[i18n("is")] = function(tag_name) {
				check(tag_name, "tag_name");

				return document.getElementsByTagName(tag_name)[0];
			}
		})();

		this[i18n("elements_that")] = new (function() {
			this[i18n("are")] = function(tag_name) {
				check(tag_name, "tag_name");

				return document.getElementsByTagName(tag_name);
			}
			this[i18n("have_class")] = function(class_name) {
				check(class_name, "class_name");

				return document.getElementsByClassName(class_name);
			}
			this[i18n("have_name")] = function(name) {
				check(name, "name");

				return document.getElementsByName(name);
			}
		})();

		this[i18n("entire_page")] = function() {
			return document.body.parentNode;
		}
	})();

	window[i18n("remove")] = new (function() {
		this[i18n("element")] = function(element) {
			check(element, "element");

			return element.parentNode.removeChild(element);
		}
	})();

	window[i18n("when")] = new (function() {
		this[i18n("element_is")] = new (function() {
			this[i18n("clicked")] = new (function() {
				//...
			})();
		})();
	})();

	window[i18n("help")] = new (function Info() {
		this[i18n("about_getstarted")] = window[i18n("about_getstarted")],
		this[i18n("add")] = window[i18n("add")];
		this[i18n("change")] = window[i18n("change")];
		this[i18n("find_out")] = window[i18n("find_out")];
		this[i18n("get")] = window[i18n("get")];
		this[i18n("remove")] = window[i18n("remove")];
		this[i18n("when")] = window[i18n("when")];
	})();

	function welcome() {
		if(!show_help_at_start) return;

		console.log(
			i18n("_help_at_start_1")+"\n"
			+ i18n("_help_at_start_2")+"\n"
			+ i18n("_help_at_start_3")+"\n"
			+ "\tget.element_that.is(\"body\") -> ", window[i18n("get")][i18n("element_that")][i18n("is")]("body"), "\n"
			+ i18n("_help_at_start_4")+" ", window[i18n("help")]
		);
	}

	document.addEventListener("DOMContentLoaded", welcome, false);
})();