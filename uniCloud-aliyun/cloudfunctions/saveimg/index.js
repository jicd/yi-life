const db = uniCloud.database();

exports.main = async (event, context) => {
	const collection = db.collection('user')
	const result = await collection.where({
		phone:event.phone,
		password:event.password
	}).update({
		 fileID:event.fileID
	})
	return "成功"
};
