var instances = (function () {
	var items;

	items = {};

	function getId() {
		var src, max, id, i, index;

		src = ['S', 'U', 'R', 'F', 0, 1, 2, 3, 4, 5 , 6, 7, 8, 9];
		max = 5;
		id = '_';

		for (i = 0; i < max; i++) {
			index = Math.floor(Math.random() * src.length);
			id += src[index];
		}

		return id;
	}

	return {
		set: function (elem) {
			var id = getID();

			if (items[id]) return this.set();

			items[id] = new _Surf();
			return id;
		},
		exist: function () {
		},
		destroy: function () {
		}
	};
});