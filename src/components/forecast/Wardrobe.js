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
        // const handleChange = selectedOption => {
        //     this.
        // }

        
        const addValue = () => {
            var select = document.getElementById('select');
            var addVal = document.getElementById('add').value;
            var newOption = document.createElement('OPTION');
            var newOptionVal = document.createTextNode(addVal);

            newOption.appendChild(newOptionVal);
            select.appendChild(newOption, select.lastChild)
        }

        // const removeValue = () => {

        // }
    }

    render(){
        return (
            <>
            <h1>Lion and Witch absent, but you can still edit your Wardrobe!</h1>
        
            <select id='select'>
                {this.state.articles.map(article => (
                    <option 
                        key={article.id} 
                        value={article.article}>
                        {article.article}
                    </option>
                ))}
            </select>

            <div className='add-article'>
                <input className='add-article' id='add' type='text' placeholder='add category'></input>
                <button onClick={() => addValue()}>Add your new Clothing Category</button>
            {/* onSubmit={() => addArticle.add(option)} */}
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

// export default function Wardrobe() {
//     const {register, handleSubmit, errors} = useForm();


//     const onSubmit = (data) => {
//         console.log(data)
//     }

//     var select = document.getElementById("articles");
//     var options = ['Hats', 'Light Outerwear', 'Heavy Outerwear', 'Footwear', 'Accessories']
    
//     for(var i=0; i < options.length; i++) {
//         var opt = options[i]
//         var el = document.createElement('option');
//         el.text = opt;
//         el.value = opt;
//         select.add(el)
//     }

    // var newOption = '';
    // var addArticle = document.getElementById("articles");
    // var option = document.createElement('option');
    // option.text = {newOption}

    // var options = select.options;
    // options[options.length] = new Option("Option text", "option_value");

//     return(
//         <>
//         <div>{console.log(options)}</div>
//         <h1>Lion and Witch absent, but you can still edit your Wardrobe!</h1>
//         <select className='articles'>

//             {/* <option>{select}</option> */}
//             {/* <option>Hats</option>
//             <option>Light Outerwear</option>
//             <option>Heavy Outerwear</option>
//             <option>Footwear</option>
//             <option>Accessories</option> */}
//             {/* <a onClick="getClothingGroup('hats'); hideDropdown($event)">Hats</a> */}
//         </select>

//         <div className='add-article'>
//             <input className='add-article' type='text' placeholder='add category'></input>
//             <button onSubmit={() => addArticle.add(option)}>Add your new Clothing Category</button>
            
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)}>
//             <input type='text' placeholder='hat' name='hat' ref={register({ required: 'ITEM REQUIRED'})} />
//                 {errors.hat && <p>{errors.hat.message}</p>}
//             <input type='text' placeholder='light outerwear' name='light-outerwear' ref={register({ required: 'ITEM REQUIRED'})} />
//                 {errors.lightOuterwear && <p>{errors.lightOuterwear.message}</p>} 
//             <input type='text' placeholder='heavy outerwear' name='heavy-outerwear' ref={register({ required: 'ITEM REQUIRED'})} />
//                 {errors.heavyOuterwear && <p>{errors.heavyOuterwear.message}</p>}
//             <input type='text' placeholder='footwear' name='footwear' ref={register({ required: 'ITEM REQUIRED'})} />
//                 {errors.footwear && <p>{errors.footwear.message}</p>}
//             <input type='text' placeholder='accessories' name='accessories' ref={register({ required: 'ITEM REQUIRED'})} />
//                 {errors.accessories && <p>{errors.accessories.message}</p>}
//             <button type='submit'>Submit item to wardrobe</button>
//         </form>
//         <br />
//         <Link to='/'>Back to Weather</Link>
//         </>
//     )
// }

