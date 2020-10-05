import Axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import router from './routes/wardrobe';

export default class Wardrobe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: '',
            categories: [
                { category: 'Hats' },
                { category: 'Light Outerwear' },
                { category: 'Heavy Outerwear' },
                { category: 'Footwear' },
                { category: 'Accessories' }
            ],
            addValue: '',
            categoryValues: null,
            isEditing: false
        }

    }

    componentDidMount(){
        Axios.get('/wardrobe')
        .then(res => {
            this.setState({categoryValues: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){

        const addCategory = () => {
            const context = {
                category: this.state.addValue
            }
            // re renders page while concatting context to current categories
            // push does not work bc it returns an int of new array len, must use concat to return new array
            this.setState({categories: this.state.categories.concat(context)})
            // this.setState({document.getElementById('add').value = ''});
            // need a check to see if category already exists
        }

        const handleChange = (evt) => {
            // handles the change for adding values
            evt.preventDefault();
            console.log(evt.target.value)
            this.setState({addValue: evt.target.value})

        }

        const removeValue = () => {
            this.state.categories.forEach(item => {
                // console.log(item.category, this.state.selectedOption, 'all this')
                if (item.category === this.state.selectedOption) {
                    // console.log('getting there!')
                    this.state.categories.splice(this.state.categories.indexOf(item), 1)
                    // console.log(this.state.categories)
                    this.setState({categories: this.state.categories})
                }
            })
            // copyCategories.slice(this.state.categories.indexOf(selected), 1)
        }

        const confirmDelete = () => {
            if (window.confirm('Are you sure you want to delete this category?')) {
                removeValue()
            }
        }

        const selectCategory = (e) => { 
            /*select category is sending e.target.value as e */ 
            console.log(e)
            this.setState({selectedOption: e})
            const getCategories = () => {
                Axios.get('')
                    .then((response) => {
                      const data = response.data;
                      console.log('Look at all this great stuff!');  
                    })
                    .catch(() => {
                        console.log('No stuff to display')
                    })
            }
        }

        const modValue = (res, req) => {
            //goal is to make the field inline editable
            console.log('Gonna change a few things')
            Axios.get('/updateArticle')
                .then(res => {
                    this.setState({isEditing: true})
                    {(res.data.name = e.target.value)}
                }).catch(err => {
                    console.log(err)
                })
            }

        const displayCategories = () => {
            const emptyCategory = []
            for (let i=0; i < this.state.categoryValues.length; i++){
                if (this.state.categoryValues[i].type === this.state.selectedOption) {
                    emptyCategory.push(this.state.categoryValues[i])
                }
            }
            // console.log('display category')
            return emptyCategory.map((category) => (
            <div key={category._id}>
                <h3>{category.name}</h3>
                <p>{category.rating}</p>
                <button onClick={(e) => modValue(e)}>Edit</button>
                <button onClick={() => modValue()}>Delete</button>
            </div>
            ));
        };

        return (
            <>
            <h1>Lion and Witch absent, but you can still edit your Wardrobe!</h1>
        
            <select ref='categorySelector' id='select' onChange={(e) => {selectCategory(e.target.value)}}>
                {this.state.categories.map(category => (
                    <option 
                        key={category.name} 
                        value={category.name}
                        // delete={removeValue.bind(article.id)}
                        >
                        {category.category}
                    </option>
                ))}
            </select>

            <div className='add-category'>
                <input onChange={handleChange} value={this.state.addValue} className='add-category' id='add' type='text' placeholder='add category'></input>
                <button onClick={() => addCategory()}>Add your new Clothing Category</button>
            </div>

            <div className='remove-category'>
                <button onClick={() => confirmDelete()}>Remove this Clothing Category</button>
            </div>
            
            <div className='display-category-value'>
                {this.state.selectedOption !== '' ? displayCategories(): null}                
                
            </div>

        {/* <form onSubmit={handleSubmit(onSubmit)}>
            <input type='text' placeholder='hat' name='hat' ref={register({ required: 'ITEM REQUIRED'})} />
                {errors.hat && <p>{errors.hat.message}</p>}
            <input type='text' placeholder='light outerwear' name='light-outerwear' ref={register({ required: 'ITEM REQUIRED'})} />
                {errors.lightOuterwear && <p>{errors.lightOuterwear.message}</p>} 
            <input type='text' placeholder='heavy outerwear' name='heavy-outerwear' ref={register({ required: 'ITEM REQUIRED'})} />
                {errors.heavyOuterwear && <p>{errors.heavyOuterwear.message}</p>}
            <input type='text' placeholder='footwear' name='footwear' ref={register({ required: 'ITEM REQUIRED'})} />
                {errors.footwear && <p>{errors.footwear.message}</p>}
            <input type='text' placeholder='accessories' name='accessories' ref={register({ required: 'ITEM REQUIRED'})} />
                {errors.accessories && <p>{errors.accessories.message}</p>}
            <button type='submit'>Submit item to wardrobe</button>
        </form> */}
        <br />
        <Link to='/'>Back to Weather</Link>

            </>
        )
    }
}
