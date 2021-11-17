const db = uniCloud.database();

exports.main = async (event, context) => {
	const collection = db.collection("message")
	const result = await collection.add({
		fileID:event.fileID,
		name:event.name,
		text:event.text,
		date:event.date
	})
	//返回数据给客户端
	return event
};
