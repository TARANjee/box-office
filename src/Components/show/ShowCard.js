import React from 'react'
import { Link } from 'react-router-dom';

const ShowCard = ({id,name,image,summary}) => {

    const summaryAsText = summary
    ? `${summary.split(' ').slice(0,10).join(' ').replace(/<.+?>/g, '')}...`
    : 'No Description';

    return (
        <div>
            <div>
            <img src={image}/>
            </div>
            <h1>{name}</h1>
            <p>{summaryAsText}</p>
            <div><Link to={`/show/${id}`} >Read more</Link></div>
            <button type='button' >starred me</button>
        </div>
    )
}

export default ShowCard
