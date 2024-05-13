import axios from "axios"
import utils from "./utils"
import Axios from "./Axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

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
  async visitclone(cloneid:string,setClone:React.Dispatch<React.SetStateAction<Clone>>) {
    const value=await AsyncStorage.getItem(cloneid)
    if(value!=null){
      var clone=JSON.parse(value)
      setClone(new Clone(clone.name,clone.type,clone.prompt,clone.adminid))
      console.log(clone)
    }
    else{
      axios.get(
        utils.url+"visitclone/"+cloneid
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
    Axios.get(
      utils.url+"visitclone/"+cloneid
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

export {
  Clone
}