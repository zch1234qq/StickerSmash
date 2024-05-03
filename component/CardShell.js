import CardSMS from "./CardSMS";
import CardFS from "./CardFS";
import CardKF from "./CardKF";
import { Clone } from "../common/classes";

const CardShell=({clone,type})=>{
  switch (type) {
    case "说明书":
      return <CardSMS clone={clone}/>
      break;
    case "客服":
      return <CardKF clone={clone}/>
      break;
    case "分身":
      return <CardFS clone={clone}/>
      break;
    default:
      return <CardSMS clone={clone}/>
  }
}

CardShell.defaultProps={
  clone:new Clone(),
  type:""
}
export default CardShell