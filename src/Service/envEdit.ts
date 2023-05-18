import * as FileSystem from 'expo-file-system';


async function editUid(uid: string) {
    /* console.warn(data)
	fs.writeFile('../../env.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err
		console.log('Dados gravados com sucesso!')
	}) */
    
    let data = require('../../env.json')
    data.uid = 'tal'
    await FileSystem.writeAsStringAsync('../../env.json', data);

}

export { editUid }
