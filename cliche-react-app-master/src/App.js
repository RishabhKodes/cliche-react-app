import React, { Component } from 'react';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      id: null,
      mockData: [{}]
    }
  }

  onSubmitHandle(event) {
    event.preventDefault();

    this.setState({
      mockData: [...this.state.mockData, {
        id: Date.now(),
        title: event.target.item.value,
      }]
    });

    // console.log()

    event.target.item.value = '';

    
  }

  onDeleteHandle() {
    let id = arguments[0];

    this.setState({
      mockData: this.state.mockData.filter(item => {
        if (item.id !== id) {
          return item;
        }
      })
    });
  }

  onEditHandle(event) {
    this.setState({
      edit: true,
      id: arguments[0],
      title: arguments[1]
    });
  }

  onUpdateHandle(event) {
    event.preventDefault();

    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === this.state.id) {
          item['title'] = event.target.updatedItem.value;
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
        <input type="text" name="updatedItem" className="item" defaultValue={this.state.title} />
        <button className="update-add-item">Update</button>
      </form>
    }
  }

  render() {
    return (
      <div>
      Add a Category
        {this.renderEditForm()}
        <form onSubmit={this.onSubmitHandle.bind(this)}>
          <input type="text" name="item" className="item" placeholder="Enter Category" />
          <button className="btn-add-item">Add</button>
        </form>
        <ul>
          {this.state.mockData.map(item => (
            <li key={item.id}>
              {item.title}
              <button onClick={this.onDeleteHandle.bind(this, item.id)}>Delete</button>
              <button onClick={this.onEditHandle.bind(this, item.id, item.title)}>Update</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
