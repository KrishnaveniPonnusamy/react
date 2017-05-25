import React from 'react';


class TodoListApp extends React.Component{
    constructor(){
        super();
        this.state = {
            items: [],
            itemText: ""
        }
    }
    handle(e){
        this.setState({itemText:e.target.value})
    }
    update(e){
        var newItem = {
            text: this.state.itemText,
            id: Date.now()
        }
        this.setState((prevState)=>(
            {
                items:prevState.items.concat(newItem),
                itemText: "",
            }
            ))
    }

    render(){
    
        return(
        <div>
          <input type="text" onChange={this.handle.bind(this)} value={this.state.itemText}/>
          <button onClick={this.update.bind(this)}>Add</button>
          <TodoList tasklist={this.state.items}/>
        </div>
        )
    }
}
 class TodoList extends React.Component{
     render(){
        
         return(
             <ul>
                {
                    this.props.tasklist.map((item)=>(<li key={item.id}>{item.text}</li>))
                }
            </ul>
         )
     }
 }
export default TodoListApp;
