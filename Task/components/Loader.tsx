import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Colors } from '@/constants/Colors'

const Loader = () => {

    
  return (
    <View style={{marginTop:300}}>
      <ActivityIndicator color={Colors.primary}  size={"large"}/>
    </View>
  )
}

export default Loader