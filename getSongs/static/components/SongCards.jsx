import React from 'react';

function SongCards(props) {
    return (
        <div className='card'>
            <img  className='card-img' src={props.thumbnail}/>
            <div className='card-info'>
                <p><b>Title:</b>{props.title}</p>
                <p><b>Artists:</b>{props.artists}</p>
                <p><b>Album:</b>{props.album}</p>
                <p><b>Release:</b>{props.year}</p>
            </div>
        </div>
    );
}


export default SongCards;