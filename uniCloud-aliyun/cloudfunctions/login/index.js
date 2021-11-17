const db = uniCloud.database();

exports.main = async (event, context) => {
	const collection = db.collection('user')
	const results = await collection.where({
		phone:event.phone,
		password:event.password
	}).get()
	return {
		results
	}
};
