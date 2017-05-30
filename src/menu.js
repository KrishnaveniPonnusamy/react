import React from 'react';
import './App.css'

class Menu extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            menulist: [],
            color: 'grey',
            isActive: 0
        }
    }
    componentWillMount(){
       this.setState({menulist:['Home','Services','About','ContactUS']})
  }
  update(i){   
     this.setState({
         isActive:i
     })
     
  }
    render(){
        return(<div>
       
            <Item key="22" btnStyle={this.state.color} menuitems={this.state.menulist} 
            onUpdate={this.update.bind(this)} status={this.state.isActive} />
       
        </div>)
    }
}

class Item extends React.Component{
    
    render(){

        
        let status = this.props.status;
        let color= this.props.btnStyle;
       let click = this.props.onUpdate;
        let row = [];
       row = this.props.menuitems.map(function(item, i) {

           if(i === status){
               console.log(i);
            color = "red";
           }else{
               color= "";
           }
            return (<a onClick={() => click(i)}  href="#"  key={i}><li style={{ color: color }}  
               >{item}</li></a>)
       });
        return(
            <ul>{row}</ul>
        )
    }
   
  
}
export default Menu;