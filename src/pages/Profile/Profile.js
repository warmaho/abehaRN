import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar, Image,
} from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { clearFav } from '../../slices/app.slice'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  list: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minWidth: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  tinyLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  pokemon: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',

    minWidth: '40%',
  },
  id: {
    fontSize: 20,
  },
})

const Profile = () => {
  const { favorites } = useSelector((state) => state.app)
  const dispatch = useDispatch()
  useFocusEffect(
    React.useCallback(() => {
      console.log('aqui', favorites)
    }, [favorites]),
  )

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      {favorites.length ? (
        <Text style={styles.title}>Favoritos</Text>
      ) : (
        <Text style={styles.title}>Agrega pokémon favoritos para verlos</Text>
      )}
      {favorites.length > 0 && (
        <View style={styles.list}>
          <Image
            style={styles.tinyLogo}
            source={require('../../../assets/images/pokedex.png')}
          />
          <Text style={styles.pokemon}>Pokemon</Text>

          <Text style={styles.id}>Id</Text>
        </View>
      )}
      {favorites.length > 0
        && favorites.map((e) => (
          <View key={e.id} style={styles.list}>
            <Image style={styles.tinyLogo} source={{ uri: e.img }} />
            <Text style={styles.pokemon}>{e.name}</Text>

            <Text style={styles.id}>{e.id}</Text>
          </View>
        ))}
      {favorites.length > 0 && (
        <Button
          title="Eliminar"
          color="white"
          backgroundColor={colors.lightPurple}
          onPress={() => {
            dispatch(clearFav())
          }}
        />
      )}
    </View>
  )
}

Profile.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
}

Profile.defaultProps = {
  navigation: { navigate: () => null },
}

export default Profile
