import { Card, Text } from "react-native-paper";
import PageBase0 from "../component/PageBase0";

export default function PageSetting(){
  return(
    <PageBase0 name={"设置页"}>
      <Card style={{width:"100%"}}>
        <Card.Content>
          <Text>客服电话:13324052902</Text>
        </Card.Content>
      </Card>
    </PageBase0>
  )
}