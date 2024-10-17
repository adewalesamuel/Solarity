import React from 'react'
import { Image, ImageProps } from 'react-native'

export default function SafeImage(props: ImageProps) {
  const {source} = props;

  if (source === null || source === undefined) {
    return (<Image {...props} source={require('../assets/images/placeholder.jpg')}/>)
  } else {
    return (<Image {...props}/>)
  }
}