import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import config from "./config"

interface Res{
  data: Clone
}

class Clone {
  name:string
  type:string
  prompt:string
  adminid:string
  cloneid:string
  constructor(name:string,type:string,prompt:string,adminid:string,cloneid:string="") {
    this.name=name
    this.type=type
    this.prompt=prompt
    this.adminid=adminid
    this.cloneid=cloneid
  }
  async visitclone(cloneid:string,setClone:React.Dispatch<React.SetStateAction<Clone>>) {
    const value=await AsyncStorage.getItem(cloneid)
    if(value!=null){
      var clone=JSON.parse(value)
      setClone(new Clone(clone.name,clone.type,clone.prompt,clone.adminid))
      console.log(clone)
    }
    else{
      axios.get(
        config.url+"visitclone/"+cloneid
      )
      .then((res:Res)=>{
        console.log(res.data)
        let data=res.data
        // this.name=data.name
        // this.adminid=data.adminid
        // this.prompt=""
        // this.type=data.type
        // this.cloneid=cloneid
        setClone(data)
      })
      .catch(res=>{
  
      })
    }
  }
  adminclone(cloneid:string,setClone:React.Dispatch<React.SetStateAction<Clone>>) {
    axios.get(
      config.url+"visitclone/"+cloneid
    )
    .then((res:Res)=>{
      console.log(res.data.prompt)
      let data=res.data
      this.name=data.name
      this.adminid=data.adminid
      this.prompt=data.prompt
      this.type=data.type
      this.cloneid=cloneid
      setClone(res.data)
    })
    .catch(res=>{

    })
  }
}
class UserInfo{
  cloneids:Array<string>=[]
  clones:Array<Clone>=[]
  maxfscount:number=10
  constructor(cloneids:Array<string>,clones:Array<Clone>,maxfscount:number){
    this.cloneids=cloneids
    this.clones=clones
    this.maxfscount=maxfscount
  }
}
export {
  Clone,
  UserInfo
}