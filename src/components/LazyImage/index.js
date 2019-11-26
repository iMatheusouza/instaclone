import React from 'react'
import {Small} from './styles'

export default function LazyImage (
  smallSource,
  source,
  aspectRatio = 1) {
  return (
  <Small 
    source={smallSource}
    aspect={aspectRatio}
    resizeMode="contain"
  />
  )    
}

