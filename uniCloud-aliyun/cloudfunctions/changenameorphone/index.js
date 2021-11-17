const db = uniCloud.database();

exports.main = async (event, context) => {
	const collection = db.collection('user')
	const result = await collection.where({
		phone:event.phone,
		name:event.name,
	}).update({
		phone:event.changephone,
		name:event.changename
	})
	return "成功"
};
