const db = uniCloud.database();

exports.main = async (event, context) => {
	const collection = db.collection('user')
	const result = await collection.where({
		name:event.name,
		phone:event.phone,
		password:event.oldpassword
	}).update({
		password:event.newpassword
	})
	
	//返回数据给客户端
	return "成功"
};
