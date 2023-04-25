import { Asset } from 'expo-asset'

const images = {
  logo_sm: require('../../assets/images/logo.png'),
  logo_lg: require('../../assets/images/logo.png'),
}

// image preloading
export const imageAssets = Object.keys(images).map((key) => Asset.fromModule(images[key]).downloadAsync())

export default images
