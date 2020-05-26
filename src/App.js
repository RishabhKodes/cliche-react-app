import React, { Component } from 'react';
import './App.css'; 

class App extends Component{

  constructor(props){
      super(props);


      this.state={

        newItem:"",
        list:[]
      }
  }
  
  updateInput(key, value){
    //update react state
    this.setState({
      [key] :value
    })

  }

  deleteItem(id){

    const list = [...this.state.list];

    const updatedList = list.filter(item => item.id !== id);

    this.setState({list: updatedList});
  }

  updateItem(id, event) {

    const list = [...this.state.list];

      list.map(item => {
        if (item.id === id) {
          return { ...item, complete: !item.complete };
        } else {
          return item;
        }
      })
  };


  addItem(){
    //creating item with unique id
    const newItem={
      id:1 + Math.random(),
      value:this.state.newItem.slice()
    };


    //copy of current list of items
    const list = [...this.state.list];

    //add new item
    list.push(newItem);

    //update state
    this.setState({
      list,
      newItem:" "
    })

  }

  
  onEditHandle(event) {
    this.setState({
      edit: true,
      id: arguments[0],
      value: arguments[1]
    });
  }

  onUpdateHandle(event) {
    event.preventDefault();

    this.setState({
      list: this.state.list.map(item => {
        if (item.id === this.state.id) {
          item['value'] = event.target.updatedItem.value;
          return item;
        }

        return item;
      })
    });

    this.setState({
      edit: false
    });
  }

  renderEditForm() {
    if (this.state.edit) {
      return <form onSubmit={this.onUpdateHandle.bind(this)}>
        <input type="text" name="updatedItem" className="item" defaultValue={this.state.value} />
        <button className="update-add-item">Update</button>
      </form>
    }
  }

  render(){
  return (
    <div className="App">
     <div> 
        Add a Category 
        <br />
        {this.renderEditForm()}
        <input 
          type="text"
          placeholder="Add Category Here"
          value={this.state.newItem}
          onChange = {e => this.updateInput("newItem", e.target.value)}
          // onChange={this.state.changeEvent}
        />

        <button 
            onClick={() => this.addItem()}
        >
        Add
        </button>
        <br />

        <ul>
          {this.state.list.map(item => {
              
              return(
                <li key={item.id}>
                  {item.value}
                  <button
                  onClick = {() => this.deleteItem(item.id)}
                  >Delete</button>
                  <button
                  onClick = {() => this.onEditHandle.bind(this, item.id, item.value)}
                  >Update</button>
                </li>

              )
          })}
        </ul>
     </div>
    </div>
  );
}
}

export default App;
