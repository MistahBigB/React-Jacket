import Axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createContext } from 'vm';
import AddArticle, { showForm } from './addArticle.js';


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
            categoryValues: [],
            isEditing: false,
            showForm: false
        }

    }

    componentDidMount(){
        Axios.get('/wardrobe')
        .then(res => {
            console.log(res, 'component did mount!')
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
            // console.log(typeof this.state.addValue)
            // forEach runs the if AND else forEach item in categories and won't break, but for will
            fetch(
                '/addCategory',
                {
                    method: 'post',
                    body: JSON.stringify({
                        name: this.state.addValue
                    })
                }).then(res =>
                    res.json()
                    ).then(
                        data => console.log(data)
                    )
            for (let i = 0; i < this.state.categories.length; i++) {
                if (this.state.categories[i].category === context.category) {
                    console.log(this.state.categories[i].category)
                    alert(`You already have a category called ${context.category}`)
                    break
                } else {
                    // re renders page while concatting context to current categories
                    // push does not work bc it returns an int of new array len, must use concat to return new array

                    this.setState({categories: this.state.categories.concat(context)})
                    console.log('Added!')
                }
            }

            // Axios.post({
            //     method: 'post',
            //     url: '/addCategory',
            //     data: {
            //       name: 'DOOOM'
            //     }
            //   }).then(res => {
            //       console.log(res, 'add category response')
            //   })
            Axios.get('/wardrobe')
                .then(res => {
                console.log(res, 'objects in the wardrobe')
                this.setState({categoryValues: res.data})
                }).catch(err => {
                    console.log(err)
            })
            console.log(this.state.categories)
            // this.setState({document.getElementById('add').value = ''});
        }
        
        // handles the change for adding values
        const handleChange = (evt) => {    
            evt.preventDefault();
            console.log(evt.target.value)
            this.setState({addValue: evt.target.value})
        }

        const removeCategory = () => {
            this.state.categories.forEach(item => {
                // console.log(item.category, this.state.selectedOption, 'remove all this')
                if (item.category === this.state.selectedOption) {
                    console.log('trying to delete a category')
                    this.state.categories.splice(this.state.categories.indexOf(item), 1)
                    // console.log(this.state.categories)
                    this.setState({categories: this.state.categories})
                }
            })
            // copyCategories.slice(this.state.categories.indexOf(selected), 1)
            Axios.post('/deleteCategory')
                .then(req => {
                    console.log(req, 'category deleted!')
                }).catch(err => {
                console.log(err)
            })
            
        }

        const confirmCategoryDelete = () => {
            if (window.confirm('Are you sure you want to delete this category?')) {
                removeCategory()
            }
        }

        const selectCategory = (e) => { 
            /*select category is sending e.target.value as e */ 
            console.log(e)
            this.setState({selectedOption: e})
            const getCategories = () => {
                Axios.get('/Wardrobe')
                    .then((response) => {
                      const data = response.data;
                      console.log('Look at all this great stuff!');  
                    })
                    .catch(() => {
                        console.log('No stuff to display')
                    })
            }
        }

        const addArticle = () => {
            // hides button until a category is chosen
            // if (!displayCategories()) return null;

            new AddArticle()
            this.state.showForm = true

            const context = {
                category: this.state.addValue
            }
            console.log(this.state.selectedOption, 'selected option')

            // has the db values ready to check against
            Axios.get('/wardrobe')
                .then(res => {
                console.log(res, 'selected option values')
                this.setState({categoryValues: res.data})
                }).catch(err => {
                console.log(err)
                })
            
            

            for (let i = 0; i < this.state.categoryValues.length; i++) {    
                if (this.state.categoryValues[i] === context) {
                    console.log(this.state.categoryValues)
                    alert(`You already have an article called ${context}`)
                    break
                } else {
                    // re renders page while concatting context to current categories
                    // push does not work bc it returns an int of new array len, must use concat to return new array
                    this.setState({categories: this.state.categoryValues.concat(context)})
                    console.log('Added!')
                }
            }
            Axios.post('/newArticle')
                .then(res => {
                console.log(res, 'adding an article')
                this.setState({categoryValues: res.data})
                })
                .catch(err => {
                console.log(err)
            })
            console.log(this.state.categories)
            // this.setState({document.getElementById('add').value = ''});
        }

        const modArticle = (res, req, e) => {
            //goal is to make the field inline editable
            console.log('Gonna change this article!')
            Axios.get('/updateArticle')
                .then(res => {
                    this.setState({isEditing: true})
                    {(res.data.name = e.target.value)}
                }).catch(err => {
                    console.log(err)
                })
            }

        const confirmArticleDelete = (e) => {
            if (window.confirm('Are you sure you want to delete this article?')) {
                removeArticle(e)
            }
        }

        const removeArticle = (categoryId) => {
            console.log('Gonna delete this article!')
            console.log(categoryId, "e.target.value")
            Axios.post('/deleteArticle', {id: categoryId})
                .then(
                    // in order to rerender the page with new data
                    // axios needs to be called again
                    Axios.get('/wardrobe')
                    .then(res => {
                        // console.log(res, 'can you hear me now?')
                        this.setState({categoryValues: res.data})
                    }).catch(err => {
                    console.log(err)
                    })
                ).catch(err => {
                    console.log(err)
                })
            }
            // copyCategories.slice(this.state.categories.indexOf(selected), 1)

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
                <button onClick={(e) => modArticle(e)}>Edit</button>
                <button onClick={(category) => confirmArticleDelete(category._id)}>Delete</button>
            </div>
            ));
        };

        return (
            <>
            <h1>Lion and Witch absent, but you can still edit your Wardrobe!</h1>
        
            <select ref='category-selector' id='select' onChange={(e) => {selectCategory(e.target.value)}}>
                {this.state.categories.map(category => (
                    <option 
                        key={category.name} 
                        value={category.name}
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
                <button onClick={() => confirmCategoryDelete()}>Remove this Clothing Category</button>
            </div>
            
            <div className='display-category-value'>
                {this.state.selectedOption !== '' ? displayCategories(): null}
                {this.state.selectedOption === '' ? null : <button id='add-article' onClick={() => addArticle()}>Add an Item</button>}

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
