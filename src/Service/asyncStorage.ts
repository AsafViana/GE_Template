import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = async (key: string, value: any) => {
	return new Promise(async (resolve, reject) => {
		try {
			await AsyncStorage.setItem(key, value)
			resolve('Salvo')
		} catch (e) {
			reject(e)
		}
	})
}

const storeDataObject = async (key, value) => {
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem(key, jsonValue)
	} catch (e) {
		console.error(e)
	}
}

const getData = (key) => {
	return new Promise(async (resolve, reject) => {
		try {
			const value = await AsyncStorage.getItem(key)
			if (value) {
				resolve(value)
			}
		} catch (e) {
			reject(e)
		}
	})
}

const getDataObject = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key)
		return jsonValue != null ? JSON.parse(jsonValue) : null
	} catch (e) {
		console.error(e)
	}
}

export {
	storeData,
	getData,
    storeDataObject,
    getDataObject,
}
