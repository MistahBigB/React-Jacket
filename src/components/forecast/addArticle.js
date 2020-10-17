import Axios from 'axios';
import React, { Component } from 'react';

class AddArticle extends Component{
    constructor(props){
        super(props);
        this.state = {value: ''};
    }

    handleSubmit(evt) {
        alert('A name was submitted: ' + this.state.value);
        evt.preventDefault();

        Axios.post('/addArticle')
      }

    showForm = () => {
       return (
           <div> 
               <form id="add-article">

                   <label>Article Name: </label>
                   <input type="text" required> </input>

                   <label>Rating: ('Hot', 'Warm', or 'Cool'): </label>
                   <input type="text" required></input>

                   <label>Category: {this.state.selectedOption}</label>

                   <button onSubmit={this.handleSubmit}>Add Article</button>
              </form>
          </div>
       );
    }

    render(){
        return (
            <div className='add-article'>
                <h1>Add article</h1>
                <button onClick={ this.setState({showForm: true}) }>Add New Article</button>
                {this.state.showForm ? this.showForm() : null}
            </div>
        );
    }
}

export default AddArticle;