'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('user')
	const adddata = await collection.add({
		name:event.name,
		phone:event.phone,
		password:event.password
	})
	return {
		'context':'保存成功'
	}
};
