import React, { useState } from 'react'
import ActorGrid from '../Components/actor/ActorGrid'
import CustomRadio from '../Components/CustomRadio'
import MainPageLayout from '../Components/MainPageLayout'
import ShowGrid from '../Components/show/ShowGrid'
import { getapi } from '../misc/config'
import { useLastQuery } from '../misc/custom-hook'
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled'


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

            <SearchInput
                placeholder="Search for Something"
                type='text'
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                value={input} />

            <RadioInputsWrapper>
                <div>
                    <CustomRadio
                        label="Shows"
                        id="shows-search"
                        value="shows"
                        checked={isShowSearch}
                        onChange={onRadioChange}
                    />
                </div>
                <div>
                    <CustomRadio
                        label="Actors"
                        id="actor-search"
                        value="people"
                        checked={!isShowSearch}
                        onChange={onRadioChange}
                    />
                </div>
            </RadioInputsWrapper>
            <SearchButtonWrapper>
                <button type="button" onClick={onSearch}  >Search</button>
            </SearchButtonWrapper>
            {renderResults()}
        </MainPageLayout>
    )
}

export default Home
