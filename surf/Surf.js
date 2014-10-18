(function (global) {
	//= include utils.js
	//= include _Surf.js
	//= include instances.js

	global.Surf = function (elem) {
		var isDOMElement = utils.isDOMElement(elem);

		/*
		TODO:
		Check if elem has multiple elems.
		If multiple elems check to which intances
		it is related, and use that instance in
		the returned methods.
		*/

		if (isDOMElement) {
		}

		return {};
	};
} (window));