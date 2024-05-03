import { View } from "react-native";
import CardBase from "./CardBase";
import ChipSMS from "./ChipSMS";
import { Clone } from "../common/classes";

const CardSMS=({clone})=>{
  return(
    <CardBase 
      clone={clone}
      color="#ddeeffff"
      >
      <ChipSMS/>
    </CardBase>
  )
}

CardSMS.defaultProps={
  clone:new Clone()
}
export default CardSMS