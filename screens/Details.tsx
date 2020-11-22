import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';

 const Details: React.FC=({ route, navigation })=>{

     const { data } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start',paddingHorizontal:16 }}>
    <Image
  source={{ uri: data.thumbnail }}
        style={{ width:Dimensions.get('screen').width, height: 400 }}
  PlaceholderContent={<ActivityIndicator />}
      />
      <Text style={styles.title}>{data.title}</Text>
      <Text><Text style={styles.title}>ingredients: </Text> {data.ingredients}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight:'bold',
  }
})

export default Details;
