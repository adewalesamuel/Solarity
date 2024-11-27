import React from 'react'
import { Image, ImageProps } from 'react-native'

export default function SafeImage(props: ImageProps) {
  const {source} = props;

  if (!source) {
    return (<Image {...props} source={require('../assets/images/placeholder.jpg')}/>)
  } else {
    return (<Image {...props} source={{uri: source as string}}/>)
  }
}