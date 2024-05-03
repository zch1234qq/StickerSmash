import CardBase from "./CardBase";
import ChipFS from "./ChipFS";
import { Clone } from "../common/classes";

const CardFS=({clone})=>{
  return(
    <CardBase 
      clone={clone}
      color="#ffeeddff"
      >
      <ChipFS/>
    </CardBase>
  )
}

CardFS.defaultProps={
  clone:new Clone()
}
export default CardFS