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
	isDomElement: function (elem) {}
};