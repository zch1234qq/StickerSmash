import { useEffect } from "react"
import PageProtocolBase from "./PageProtocolBase"

const url="https://bxjs.store:8443/privacy"
export default PageProtocolPrivacy=({route})=>{
  useEffect(()=>{
    console.log(route.params.logup)
  },[])
  return(
    <PageProtocolBase url={url} logup={route.params.logup}></PageProtocolBase>
  )
}