var utils;

utils = {
	findWhere: function (list, attrs) {
		if (!Array.isArray(list) || typeof attrs !== 'object') return list;

		var i, item, matches;

		for (i = 0; i < list.length; i++) {
			matches = true;

			for (item in attrs) {
				if (attrs[item] !== list[i][item]) {
					matches = false;
					break;
				}
			}

			if (matches) return [list[i]];
		}

		return [];
	},
	isDOMElement: function (subject) {
		// Solution from:
		// http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
		if (typeof HTMLElement === 'function' || typeof HTMLElement === 'object') {
			return subject instanceof HTMLElement;
		} else if (subject && typeof subject === "object" && subject !== null && subject.nodeType === 1 && typeof subject.nodeName === "string") {
			return true;
		}

		return false;
	}
};