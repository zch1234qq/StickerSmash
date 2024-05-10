import { useAuth } from "../common/AuthContext"
import utils from "../common/utils"
const { NotiBase } = require("./NotiBase")

export const NotiSuccess=()=>{
  const {state,dispatch}=useAuth()

  return(
    <NotiBase
      message={state.notiMessage}
      visible={state.notiSuc}
      icon={"check-circle"}
      color={utils.TipColor.Success}
      textColor={"black"}
      iconColor="black"
    ></NotiBase>
  )
}