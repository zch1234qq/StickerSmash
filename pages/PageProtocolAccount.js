import PageProtocolBase from "./PageProtocolBase"

const url="https://bxjs.store:8443/account"
export default function PageProtocolAccount({route}){
  return(
    <PageProtocolBase url={url} logup={route.params.logup}></PageProtocolBase>
  )
}