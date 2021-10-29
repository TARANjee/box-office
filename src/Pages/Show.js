import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getapi } from '../misc/config';

const Show = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        getapi(`/shows/${id}?embed[]=seasons&embed[]=cast`)
            .then(results => {
                if (isMounted) {
                    setShow(results);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                if (isMounted) {
                    setError(err.message);
                    setIsLoading(false);
                }
            })

        return () => {
            isMounted = false;
        }


    }, [id])
    console.log(show);

    if (isLoading) {
        return <div>Data is being Loading</div>
    }
    if (error) {
        return <div>Error occured:{error}</div>
    }

    return (
        <div>
            This is show page

            <h1>{show.name}</h1>
        </div>
    )
}

export default Show
