import { Clone } from "../common/classes";
import CardBase from "./CardBase";
import ChipKF from "./ChipKF";

const CardKF=({clone})=>{
  return(
    <CardBase 
      clone={clone}
      color="#eeffee"
      >
      <ChipKF/>
    </CardBase>
  )
}

CardKF.defaultProps={
  clone:new Clone()
}
export default CardKF