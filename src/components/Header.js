import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../globals/colors'
import ArrowGoBack from './ArrowGoBack';
import { useNavigation } from '@react-navigation/native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../features/userSlice';
import { deleteSession } from '../config/dbSqlite';

const Header = ({ titulo }) => {
  const navigate = useNavigation()
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(deleteUser())
    deleteSession()
  }

  return (
    <View style={styles.container}>
      {navigate.canGoBack() ? <ArrowGoBack/> : null }
      <Text style={styles.title}>{titulo}</Text>
      <Pressable onPress={onLogout} style={styles.logout}>
        <SimpleLineIcons name="logout" size={21} color={colors.white} /> 
      </Pressable>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.brown,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    position: "relative"
  },
  title: {
    color: colors.white,
    fontSize: 15,
    fontFamily: "quicksand_regular",
    textTransform: "uppercase",
  },
  logout: {
    position: "absolute",
    right: 20
  }
})