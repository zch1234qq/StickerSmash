const { Icon } = require("react-native-paper")

const TabBarIcon=({name0,name1,focused})=>{
  if(focused){
    return <Icon source={name0} size={24}></Icon>
  }
  else{
    return <Icon source={name1} size={24}></Icon>
  }
}
export default TabBarIcon