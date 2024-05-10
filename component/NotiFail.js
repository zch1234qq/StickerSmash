import { useAuth } from "../common/AuthContext"
import utils from "../common/utils"
const { NotiBase } = require("./NotiBase")

export const NotiFail=()=>{
  const {state,dispatch}=useAuth()

  return(
    <NotiBase
      message={state.notiMessage}
      visible={state.notiFail}
      icon={"alert"}
      color={utils.TipColor.Fail}
      iconColor="red"
    ></NotiBase>
  )
}