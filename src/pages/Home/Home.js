import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Image,
} from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { saveMe, saveFav } from '../../slices/app.slice'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 24,
    marginBottom: 0,
  },
  pokemon: {
    fontSize: 24,
    marginBottom: 10,
  },
  error: {
    fontSize: 10,
    color: 'red',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  tinyLogo: {
    marginTop: 20,
    width: 180,
    height: 150,
  },
})

const Home = () => {
  const [text, onChangeText] = React.useState('')
  const [error, setError] = React.useState('')
  const { pokemon, favorites } = useSelector((state) => state.app)
  const dispatch = useDispatch()

  // TODO: switch router by loggedIn state
  console.log('aqui', pokemon)

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Pokédex</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Busca tu pokémon"
      />
      <Button
        title="Buscar "
        color="white"
        backgroundColor={colors.lightPurple}
        onPress={() => {
          setError('')
          if (text) {
            axios
              .get(`https://pokeapi.co/api/v2/pokemon/${text}`)
              .then((res) => {
                const info = res.data
                const poke = {
                  id: info.id,
                  name: info.name,
                  img: info.sprites.front_default,
                }

                dispatch(saveMe({ pokemon: poke }))
              })
              .catch(() => {
                setError('Pokemón no encontrado')
              })
          } else {
            setError('Ingresa un nombre para buscar')
          }
        }}
      />
      <Text style={styles.error}>{error || ''}</Text>
      {pokemon.id ? (
        <Image style={styles.tinyLogo} source={{ uri: pokemon.img }} />
      ) : (
        <Image
          style={styles.tinyLogo}
          source={require('../../../assets/images/pokedex.png')}
        />
      )}
      {pokemon.id && <Text style={styles.pokemon}>{pokemon.name}</Text>}
      {pokemon.id && (
        <Button
          title="Añadir a favoritos"
          color="white"
          backgroundColor={colors.lightPurple}
          onPress={() => {
            const search = favorites.find((e) => e.id === pokemon.id)
            if (!search) {
              dispatch(saveFav({ favorites: pokemon }))
            }
          }}
        />
      )}
    </View>
  )
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}

export default Home
