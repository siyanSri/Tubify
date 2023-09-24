import React, { useState, useEffect } from 'react';
import SongCards from './SongCards'


function ProgressDisplay(inputData,output) {
    const [progress, setProgress] = useState(0);
    const [all, setAll] = useState([]);
    const cards = [];
    const [checkArr, setCheckArr] = useState([]);


    //fetch track info when inputData changes   
    
    useEffect(() => {
        const intervalId = setInterval(() => {

            fetch('/get_cardInfo')
                .then((response) => response.json())
                .then((data) => {
                    setAll(data.songs);
                });
        }, 2000);


        return () => {
            clearInterval(intervalId);
        };
    }, [inputData]);
    

    //all tracks mapped to cards
    if (all[0]) {
        for (let i = 0; i < all[0].length; i++) {
            cards.push(
                <SongCards
                    key={i}
                    title={all[0][i]}
                    artists={all[1][i]}
                    album={all[2][i]}
                    year={all[3][i]}
                    thumbnail={all[4][i]}
                    check={checkArr[i]}
                />
            )
        }
    }

    //fetch progress when input changes
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Make a request to Flask backend to get the latest progress
            fetch('/get_progress')
                .then((response) => response.json())
                .then((data) => {
                    setProgress(data.progress);
                });
        }, 2000); // Poll every 2 seconds

        return () => {
            clearInterval(intervalId); // Clean up the interval when the component unmounts
        };
    }, [inputData]);
    


    return (
        <div>
            <div>
                <p>Progress: {Math.round(progress * 100)}%</p>
            </div>

            <section id='cards-list'>
                {cards}
            </section>
        </div>
    );

}

export default ProgressDisplay;



//test css

// <section id='cards-list'>
// <div className='card'>
//   <img className='card-img'  src='https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'/>
//   <div className='card-info'>
//     <p><b>Title:</b> Overtime</p>
//     <p>Artists: Zach Bryan</p>
//     <p>Album: Zach Bryan</p>
//     <p>Release: 2022-08-12</p>
//   </div>
// </div>
// <div className='card'>
//   <img className='card-img' src='https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'/>
//   <div className='card-info'>
//   <p>Title: Vaa Vaathi</p>
//   <p>Artists: G. V. Prakash, Shweta Mohan</p>
//   <p>Album: Vaathi</p>
//   <p>Release: 2022-11-10</p>
//   </div>

// </div>
// </section>