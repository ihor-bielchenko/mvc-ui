// import Store from 'components/Store';

const findTreeDownByArrows = async (entityId, initArrowTypeId, arrows, collector = []) => {
	const nextArrows = arrows.filter((arrow) => arrow.from_entity_id === entityId);

	nextArrows.forEach(async (arrow) => {
		if (arrow.arrow_type_id !== initArrowTypeId) {
			collector.push(arrow);
			collector = await findTreeDownByArrows(
				arrow.to_entity_id, 
				arrow.arrow_type_id === process.env.ARROW_TYPE_DEFAULT
					? initArrowTypeId
					: 0, 
				arrows, 
				collector
			);
		}
	});
	return collector;
};
const findTreeUpByArrows = async (entityId, arrowTypeId, arrows, collector = []) => {
	const prevArrow = arrows.find((arrow) => arrow.to_entity_id === entityId);

	if (prevArrow) {
		collector.unshift(prevArrow);

		return prevArrow.arrow_type_id !== arrowTypeId
			? await findTreeUpByArrows(prevArrow.from_entity_id, arrowTypeId, arrows, collector)
			: collector;
	}
	return collector;
};

// логика промисов
// цикл по перебору стрелок с передачей индекса в рекурсии для оптимизации рессурсов
// удалять из массива arrows обработанные стрелки
// рекурсивный поиск по стрелкам вверх в зависимости от существующих элементов в temp
const build = async (entityId, arrows, temp) => {
	temp = temp ?? { 
		[entityId]: {
			x: 0,
			y: 40,
			last: [ true, true ],
		},
	};
	let index = 0;

	while (index < arrows.length) {
		const _index = index;
		const _arrow = { ...arrows[_index] };
		let _temp = temp;

		if (_arrow.from_entity_id === entityId) {
			await (new Promise((resolve, reject) => setTimeout(async () => {
				const _entityId = _arrow.from_entity_id;

				_temp[_arrow.to_entity_id] = {
					x: _temp[_entityId].x,
					y: _temp[_entityId].y + 162,
					last: [ true, true ],
				};
				// console.log('upArrows', _entityId, { ..._temp });

				if (_arrow.arrow_type_id === process.env.ARROW_TYPE_DEFAULT) {
					_temp[_entityId].last = [ false ];
				}
				else if (_arrow.arrow_type_id === process.env.ARROW_TYPE_FALSE) {
					_temp[_arrow.to_entity_id].x = _temp[_entityId].x - 200;
					_temp[_entityId].last[0] = false;

					const upArrows = await findTreeUpByArrows(_entityId, process.env.ARROW_TYPE_TRUE, arrows);

					if (upArrows[0].arrow_type_id === process.env.ARROW_TYPE_TRUE) {
						console.log('upArrows', _entityId, _arrow, upArrows);
						upArrows.forEach((item, ii) => {
							if (temp[item.to_entity_id]) {
								temp[item.to_entity_id].x += 200;
							}
						});
						_temp[_arrow.to_entity_id].x += 200;
						console.log('upArrows', _entityId, { ..._temp[5] });

						if (upArrows[1]) {
							// console.log('upArrows', _entityId, upArrows[1], { ..._temp[_entityId] });
							const downArrows = await findTreeDownByArrows(upArrows[0].to_entity_id, process.env.ARROW_TYPE_FALSE, arrows);
						
							console.log('downArrows', downArrows);
							downArrows.forEach((item, ii) => {
								if (temp[item.to_entity_id]
									&& upArrows.findIndex((up) => up.id === item.id) === -1) {
									temp[item.to_entity_id].x += 200;
								}
							});
						}
					}
					// _temp[_arrow.to_entity_id].x += 200;
				}
				else if (_arrow.arrow_type_id === process.env.ARROW_TYPE_TRUE) {
					_temp[_arrow.to_entity_id].x = _temp[_entityId].x + 200;
					_temp[_entityId].last[1] = false;

					const upArrows = await findTreeUpByArrows(_entityId, process.env.ARROW_TYPE_FALSE, arrows);
					
					if (upArrows[0].arrow_type_id === process.env.ARROW_TYPE_FALSE) {
						upArrows.forEach((item, ii) => {
							if (temp[item.to_entity_id]) {
								temp[item.to_entity_id].x -= 200;
							}
						});
						// console.log('upArrows', _entityId, { ...temp[_entityId] });

						if (upArrows[1]) {
							const downArrows = await findTreeDownByArrows(upArrows[0].to_entity_id, process.env.ARROW_TYPE_TRUE, arrows);
						
							// console.log('downArrows', upArrows[0], downArrows);

							downArrows.forEach((item, ii) => {
								if (temp[item.to_entity_id]
									&& upArrows.findIndex((up) => up.id === item.id) === -1) {
									temp[item.to_entity_id].x -= 200;
								}
							});
						}
						_temp[_arrow.to_entity_id].x -= 200;
					}
				}
				_temp = await build(_arrow.to_entity_id, arrows, _temp);

				resolve(_index);
			}, 0)));
		}
		index++;
	}
	return temp;
};

export default build;
