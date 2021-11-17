const db = uniCloud.database();

exports.main = async (event, context) => {
	const collection = await db.collection("message").get()
	return collection
};
