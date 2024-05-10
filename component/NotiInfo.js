import utils from "../common/utils"
import { useAuth } from "../common/AuthContext"
const { NotiBase } = require("./NotiBase")

export const NotiInfo=()=>{
  const {state,dispatch}=useAuth()

  return(
    <NotiBase
      message={state.notiMessage}
      visible={state.notiInfo}
      icon={"lightbulb-outline"}
      color={utils.TipColor.Info}
    ></NotiBase>
  )
}