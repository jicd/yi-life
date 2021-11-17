const db = uniCloud.database();

exports.main = async (event, context) => {
	const collection = db.collection('user')
	const remove = await collection.where({
		phone:event.phone,
		name:event.name
	}).remove()
	return event
};
