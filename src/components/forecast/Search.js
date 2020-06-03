import React, { useState } from 'react';
import axios from 'axios';

const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                    'August', 'September', 'October', 'Novemeber', 'Decemeber'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}

const Search = () => {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [jacket, setJacket] = useState('');
    const [clouds, setClouds] = useState('');

    // http://cors-anywhere.herokuapp.com/

    const findCity = (e) => {
        e.preventDefault()
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=fa1cf0341b6f15f31e7672b24b61df94`)
        .then(res => {
            setWeather(res.data);
            setClouds(cloudConditions(res.data))
            setJacket(jacketWeather(res.data))
            setQuery('');       
        }).catch(err => console.log(err))
    }

    const cloudConditions = (weather) => {
         // try with ? ternary operators
        if (weather.clouds.all < 12) {
            return 'Clear'
        } else if (weather.clouds.all > 12 && weather.clouds.all < 37) {
            return 'Mostly Sunny'
        } else if (weather.clouds.all < 38 && weather.clouds.all < 74) {
         return 'Partly Cloudy'
        } else {
         return 'Cloudy'
        }
    }

    const jacketWeather = (weather) => {
        if (weather.main.feels_like < 40) {
            return 'You should wear a jacket and a hat!'
        } else if (weather.main.feels_like < 50 && weather.main.feels_like > 40) {
            return 'You should wear a jacket'
        } else if (weather.main.feels_like < 60 && weather.main.feels_like > 50) {
            return 'You should wear a sweater or a longsleeve'
        } else if (weather.main.feels_like < 70 && weather.main.feels_like > 60) {
            return 'T shirt weather!'
        } else {
            return 'Gonna be a scorcher! Sunblock and a hat!'
        }
    }

    return(
        <React.Fragment>
            <h1>Jacket.app</h1> 
            <p>Get the weather in your city!</p>
            
            <div>{dateBuilder(new Date())} </div>
            <br />
                <form onSubmit={findCity}>
                        <input 
                            type='text' 
                            className='city-search'
                            placeholder='What city are you looking for?'
                            name='city-name'
                            onChange={e => setQuery(e.target.value)}
                            value={query}
                        /> 
 
                    <button
                        type='submit'>
                        Get City
                    </button>
                </form>

            {( typeof weather.main != 'undefined') ? ( 
                <div>
                    <h1 className='location'>{weather.name}, {weather.sys.country}</h1>
                    <h1 className='forecase'>{weather.weather[0].description}</h1>
                    <div className='clouds'>{clouds}</div>
                    <div className='jacket'>{jacket}</div>
                    <div className='temperature'>It's {Math.round(weather.main.temp)} °F right now!</div>                
                    <div className='temperature2'>It feels like {Math.round(weather.main.feels_like)} °F right now!</div>
                    <div className='windspeed'>Wind speed is currently  {Math.round(weather.wind.speed)} mph</div>  
                </div>
            ) : ('') }
            <br />
        </React.Fragment>
    )
    
}

export default Search;
