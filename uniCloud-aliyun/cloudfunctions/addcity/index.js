const db = uniCloud.database();

exports.main = async (event, context) => {
	const collection = db.collection('user')
	const result = await collection.where({
		phone:event.phone,
		name:event.name
	}).update({
		 city:event.city
	})
	return "成功"
};
