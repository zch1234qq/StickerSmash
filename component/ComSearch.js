import * as React from 'react';
import { Searchbar, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import utils from '../common/utils';

export default function ComSearch(){
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  const theme=utils.theme
  function toUse(){
    var id=""
    console.log(searchQuery.length)
    if(searchQuery.length==24){
      id=searchQuery
    }else{
      id=searchQuery.slice(-24)
    }
    utils.navigation.navigate("use",{cloneid:id})
  }
  return (
    <View style={styles.centered}>
      <Searchbar
        placeholder="id / 链接"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ flex:8}}
        elevation={1}
        trailingIconColor="red"
        onSubmitEditing={toUse}
        theme={{ colors: { primary: theme.colors.primary,backgroundColor:"red"} }}
      />
      <Text
        style={{flex:1,textAlign:"center"}}
        onPress={toUse}
      >跳转</Text>
    </View>
  );
}
const styles=StyleSheet.create({
  centered: {
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:"center",
    alignContent:"center",
    zIndex:200,
    position:"absolute",
    top:0
  }
})