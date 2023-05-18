import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import env from '../../../env.json'
import { MaterialIcons, Entypo, Ionicons, FontAwesome } from '@expo/vector-icons'
import { useKeyboard } from '@react-native-community/hooks'

export function CustomTabBar({ state, descriptors, navigation }) {
	const { color } = env
	const { keyboardShown } = useKeyboard()

	if (keyboardShown) {
		return
	} else {
		return (
			<View style={styles.container}>
				<View style={styles.content}>
					{state.routes.map((route, index) => {
						const { options } = descriptors[route.key]

						const isFocused = state.index === index

						const onPress = () => {
							const event = navigation.emit({
								type: 'tabPress',
								target: route.key,
								canPreventDefault: true,
							})

							if (!isFocused && !event.defaultPrevented) {
								navigation.navigate(route.name)
							}
						}

						const onLongPress = () => {
							navigation.emit({
								type: 'tabLongPress',
								target: route.key,
							})
							console.log('teste')
						}

						let icone
						switch (options.tabBarIcon) {
							case 'home':
								icone = <FontAwesome color={isFocused ? color.branco : '#535353'} style={{ margin: 5 }} name="th-list" size={35} onPress={onPress} onLongPress={onLongPress} />
								break
							case 'add':
								icone = <Ionicons color={isFocused ? color.branco : '#535353'} name="add-circle-outline" style={{ marginLeft: 4, marginRight: 1 }} size={45} onPress={onPress} onLongPress={onLongPress} />
								break
							case 'user':
								icone = <FontAwesome name="user" size={40} color={isFocused ? color.branco : '#535353'} style={{ marginHorizontal: 10, marginVertical: 4 }} onPress={onPress} />
								break
							case 'teste':
								icone = <Ionicons name="hammer" size={40} color={isFocused ? color.branco : '#535353'} style={{ marginHorizontal: 5, marginVertical: 4 }} onPress={onPress} />
								break
						}
						return (
							<TouchableOpacity key={route.key} accessibilityRole="button" accessibilityState={isFocused ? { selected: true } : {}} accessibilityLabel={options.tabBarAccessibilityLabel} testID={options.tabBarTestID} onPress={onPress} onLongPress={onLongPress} style={styles.buttonTab}>
								<View style={{ alignItems: 'center', padding: 4 }}>
									<View style={{ padding: 8, borderRadius: 99, backgroundColor: isFocused ? color.azulClaro : 'transparent' }}>{icone}</View>
								</View>
							</TouchableOpacity>
						)
					})}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'red',
	},
	content: {
		marginBottom: Platform.OS === 'ios' ? 38 : 24,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 0,
		backgroundColor: '#f1f1f1',
		flexDirection: 'row',
		borderRadius: 99,
		gap: 8,
		elevation: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 3.8,
	},
	buttonTab: {
		justifyContent: 'center',
		alignItems: 'center',
	},
})
