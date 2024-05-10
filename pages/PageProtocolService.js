import PageProtocolBase from "./PageProtocolBase"

const url="https://bxjs.store:8443/service"
export default function PageProtocolService({route}){
  return(
    <PageProtocolBase url={url} logup={route.params.logup}></PageProtocolBase>
  )
}