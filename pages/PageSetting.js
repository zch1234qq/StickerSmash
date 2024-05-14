import { Card, Text } from "react-native-paper";
import PageBase1 from "../component/PageBase1";

export default function PageSetting(){
  return(
    <PageBase1 name={"设置页"}>
      <Card style={{width:"100%"}}>
        <Card.Content>
          <Text>客服电话:13324052902</Text>
        </Card.Content>
      </Card>
    </PageBase1>
  )
}