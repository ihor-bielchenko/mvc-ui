import Store from 'components/Store';

const countScriptEmptyPosition = () => {
	const entities = Store().getState().entities;
	const dataKeys = Object.keys(entities.data);
	let i = 0,
		ii = 0,
		iii = 0,
		width = 0,
		height = 0;

	dataKeys.forEach((id) => {
		width = width <= 1000
			? (entities.data[id].x + 300) >= width
				? entities.data[id].x + 300
				: width
			: 1000;
		height = (entities.data[id].y + 160) >= height
			? entities.data[id].y + 160
			: height;
	});
	width += 290;
	height += 160;

	const horizontalLength = Math.ceil(width / 300);
	const verticalLength = Math.ceil(height / 160);

	while (i < verticalLength) {
		const newY = (i * 160) + 60;

		ii = 0;
		while (ii < horizontalLength) {
			const newX = ii * 300;
			const place = {
				flags: [],
				x: newX,
				y: newY,
			};
			
			iii = 0;
			while (iii < dataKeys.length) {
				if (!(((newX >= entities.data[dataKeys[iii]].x && newX <= entities.data[dataKeys[iii]].x + 299) || 
						(newX + 299 >= entities.data[dataKeys[iii]].x && newX + 299 <= entities.data[dataKeys[iii]].x + 299)) &&
					((newY >= entities.data[dataKeys[iii]].y && newY <= entities.data[dataKeys[iii]].y + 139) ||
						(newY + 139 >= entities.data[dataKeys[iii]].y && newY + 139 <= entities.data[dataKeys[iii]].y + 160)))) {
					place
						.flags
						.push(true);
					if (place.flags.length === dataKeys.length) {
						break;
					}
				}
				else {
					place
						.flags
						.push(false);
				}
				iii++;
			}

			if (place.flags.indexOf(false) === -1) {
				return {
					x: place.x,
					y: place.y,
				};
			}
			ii++;
		}
		i++;
	}
	return { 
		x: 0, 
		y: 0, 
	};
};

export default countScriptEmptyPosition;
