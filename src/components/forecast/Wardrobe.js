import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Wardrobe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: null,
            articles: [
                { id: '1', article: 'Hats' },
                { id: '2', article: 'Light Outerwear' },
                { id: '3', article: 'Heavy Outerwear' },
                { id: '4', article: 'Footwear' },
                { id: '5', article: 'Accessories' },
            ]
        }

    }

    render(){

        const addValue = () => {
            var select = document.getElementById('select');
            var addVal = document.getElementById('add').value;
            var newOption = document.createElement('OPTION');
            var newOptionVal = document.createTextNode(addVal);

            newOption.appendChild(newOptionVal);
            select.appendChild(newOption, select.lastChild)
            console.log(this.articles)
        }

        const removeValue = (index) => {
            const copyArticles = Object.assign([], this.state.articles)
            //deletes the item at the top of the select
            // need to ensure that the item selected is deleted
            copyArticles.splice(index, 1)
            this.setState({
                articles : copyArticles
            })
        }

        const selectArticle = (e) => {  
            console.log(this.articleSelector.value)
        }

        return (
            <>
            <h1>Lion and Witch absent, but you can still edit your Wardrobe!</h1>
        
            <select ref='articleSelector' id='select' onChange={(e) => {selectArticle()}}>
                {this.state.articles.map(article => (
                    <option 
                        key={article.id} 
                        value={article.article}
                        // delete={removeValue.bind(article.id)}
                        >
                        {article.article}
                    </option>
                ))}
            </select>

            <div className='add-article'>
                <input className='add-article' id='add' type='text' placeholder='add category'></input>
                <button onClick={() => addValue()}>Add your new Clothing Category</button>
            </div>
            <div className='remove-article'>

            <button onClick={() => removeValue()}>Remove this Clothing Category</button>
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
