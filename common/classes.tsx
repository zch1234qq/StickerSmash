import axios from "axios"
import utils from "./utils"

interface Res{
  data: Clone
}

class Clone {
  name:string
  type:string
  prompt:string
  adminid:string
  cloneid:string
  constructor(name:string,type:string,prompt:string,adminid:string,cloneid?:string="") {
    this.name=name
    this.type=type
    this.prompt=prompt
    this.adminid=adminid
    this.cloneid=cloneid
  }
  visitclone(cloneid:string,setClone:React.Dispatch<React.SetStateAction<Clone>>) {
    axios.get(
      utils.url+"visitclone/"+cloneid
    )
    .then((res:Res)=>{
      console.log(res.data.prompt)
      let data=res.data
      this.name=data.name
      this.adminid=data.adminid
      this.prompt=data.prompt+"1525"
      this.type=data.type
      this.cloneid=cloneid
      setClone(res.data)
    })
    .catch(res=>{

    })
  }
}

export {
  Clone
}