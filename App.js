import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { colors } from './src/globals/colors';
//npm install expo-font
import { useFonts } from 'expo-font';
import { fonts } from './src/globals/fonts';
import Navigator from './src/navigation/Navigator';
import { Provider } from 'react-redux';
import {store} from './src/store';
import { init } from './src/config/dbSqlite';
import { useEffect } from 'react';
//npm install react-native-screens react-native-safe-area-context

export default function App() {
  const [fontLoaded] = useFonts(fonts)

  if (!fontLoaded) {
    return null
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Navigator />
        <StatusBar style='light' backgroundColor={colors.black} translucent={false} />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1, //Para que ocupe toda la altura
  },
});
