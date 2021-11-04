import React, { useState, useEffect } from 'react'
import MainPageLayout from '../Components/MainPageLayout'
import { useShows } from '../misc/custom-hook'
import { getapi } from '../misc/config'
import ShowGrid from '../Components/show/ShowGrid'

const Starred = () => {

    const [Starred] = useShows();
    const [shows, setShows] = useState(null)
    const [isloading, setloading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        if (Starred && Starred.length > 0) {

            const promise = Starred.map(showId => getapi(`/shows/${showId}`))
            Promise.all(promise)
            .then(apidata=>apidata.map(show=>({show})))
            .then(results => {    
                setShows(results);
                setloading(false);
            }).catch(err=>{
                setError(err.message);
                setloading(false);
            })

        } else {
            setloading(false)
        }

    }, [Starred])

    return (
        <MainPageLayout>
            {isloading && <div>Shows are still Loading</div>}
            {error && <div>Error occured {error}</div> }
            {!isloading && !shows && <div>No Shows</div>}
            {!isloading && !error && shows && <ShowGrid data={shows} />}
        </MainPageLayout>
    )
}

export default Starred
