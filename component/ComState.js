import { View } from "react-native"
import { Card, Divider, List, Text } from "react-native-paper"
import { Clone } from "../common/classes"
import { useEffect } from "react"

const ComState=({clone,messages})=>{
  return(
    <Card style={{width:"100%"}}>
      <Card.Title title={clone.name}/>
      <Card.Content>
          {messages.map((item,index)=>
            <View key={index}>
              {index%2==1 && <Text>{item}</Text>}
              {index%2==0 && <Text style={{color:"gray"}}>{item}</Text>}
              <Divider ></Divider>
            </View>
          )}
      </Card.Content>
    </Card>
  )
}

ComState.defaultProps={
  clone:new Clone(),
  messages:[]
}

export default ComState