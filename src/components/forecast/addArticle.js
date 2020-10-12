import React, { Component } from 'react';

class AddArticle extends Component{
    constructor(props){
        super(props);
    }

    showForm = () => {
       return (
           <div> 
               <form id="add-article">

                   <label>Article Name: </label>
                   <input type="text"> </input>

                   <label>Rating ('Hot', 'Warm', or 'Cool'): </label>
                   <input type="text" ></input>

                   <button>Add Article</button>
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