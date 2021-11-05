import React, { useState } from 'react'
import ActorGrid from '../Components/actor/ActorGrid'
import MainPageLayout from '../Components/MainPageLayout'
import ShowGrid from '../Components/show/ShowGrid'
import { getapi } from '../misc/config'
import { useLastQuery } from '../misc/custom-hook'


const Home = () => {

    
    const [input, setInput] = useLastQuery()
    const [results, setResults] = useState(null)
    const [searchOption, setSearchOption] = useState("shows")
    const isShowSearch = searchOption === 'shows'

    
    const onInputChange = (ev) => {
        setInput(ev.target.value)
    }
    const onKeyDown = (ev) => {
        if (ev.keyCode == 13) {
            onSearch()
        }

    }
    const onSearch = () => {
        getapi(`/search/${searchOption}?q=${input}`)
            .then((result) => setResults(result))

    }
    const renderResults = () => {
        if (results && results.length === 0) {
            return <div>No Results</div>
        }
        if (results && results.length > 0) {
            return results[0].show ? <ShowGrid data={results} /> : <ActorGrid data={results} />

        }
        return null;
    }
    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value);

    }
    console.log(results);
    return (
        <MainPageLayout>
            <input placeholder="Search for Something" type='text' onChange={onInputChange} onKeyDown={onKeyDown} value={input} />

            <div>
                <label htmlFor="shows-search">
                    Shows
                    <input
                        id="shows-search"
                        type='radio'
                        value="shows"
                        checked={isShowSearch}
                        onChange={onRadioChange}
                    />
                </label>
                <label htmlFor="actor-search">
                    Actors
                    <input
                        id="actor-search"
                        type='radio'
                        value="people"
                        checked={!isShowSearch}
                        onChange={onRadioChange}
                    />
                </label>
            </div>
            <button type="button" onClick={onSearch}  >Search</button>
            {renderResults()}
        </MainPageLayout>
    )
}

export default Home
