import React, { useState, useEffect }from 'react';

const TextInput = ({handleListenText}) => {
    return <textarea
        rows="30"
        cols="40"
        className="input"
        placeholder="Enter text to listen to..."
        onChange={e => handleListenText(e.target.value) }/>
}

const LangSelect = ({langs, handleLangSelect}) => {

    if (langs.options.length === 0) return null

    if (langs.options.length !== 0) {
        return (
            <div className="select-container">
                <label htmlFor="select_language">Select Language:</label>
                <select name="select_language" defaultValue={langs.default} onChange={ (e) => handleLangSelect(e.target.value)}>
                    {langs.options.map((option) => (
                        <option key={option.name} value={option.name}>{option.name}</option>
                    ))}
                </select>
            </div>
        )
    }

}
const Controls = ({handlePause, handleListen, langs, handleLangSelect, handleUpdateControls }) => {

    return (
        <React.Fragment>
            <LangSelect
                langs={langs}
                handleLangSelect={handleLangSelect}

            />
            <div className="controls">
                <span>
                    <label htmlFor="volume">Volume:</label>
                    <input name="volume" onChange={ (e) => handleUpdateControls(e.target)} defaultValue="1" type="range" min="0"
                       max="2" step="0.2" />
                </span>
                <span>
                    <label htmlFor="pitch">Pitch:</label>
                    <input name="pitch" onChange={ (e) => handleUpdateControls(e.target)} defaultValue="1" type="range" min="0"
                       max="2" step="0.2"/>
                </span>
                <span>
                    <label htmlFor="rate">Rate:</label>
                    <input name="rate" onChange={ (e) => handleUpdateControls(e.target)} defaultValue="1" type="range" min="0"
                       max="2" step="0.2"/>
                </span>

            </div>
            <hr/>

            <div id="audio-mode">
                <button onClick={handleListen}>Listen <span className="fa fa-play"></span></button>
                <button onClick={handlePause}>Stop <span className="fa fa-stop"></span></button>
            </div>


        </React.Fragment>
    )

}



const App = () => {



    const [listening, setListening] = useState('')
    const [controls, setControls] = useState({volume: 1, pitch: 1, rate: 1})
    const [lang, setLang] = useState({ default: "en-US", options: [] })


    const handleUpdateControls = (target) => {
        const { name, value } = target

        let updated_controls = {...controls}
        updated_controls[name] = parseFloat(value)

        setControls(updated_controls)

        toggleSpeech()

    }

    function toggleSpeech(restart = true) {
        const {volume, pitch, rate} = controls
        const { default: df ,speechObj, options } = lang

        const voice = options.find(voice => voice.name === df)
        let speech = new SpeechSynthesisUtterance(listening)

        try {
            speech.voice = voice
        } catch (e) {

            console.log(`Error setting voice:::`,e)
        }

        speech.volume = volume
        speech.rate = rate
        speech.pitch = pitch
        speechObj.cancel()
        if (restart) speechObj.speak(speech)
    }

    const handleListenText = (val) =>  setListening(val)

    const handlePause = () => {
        toggleSpeech(false)
    }

    const handleListen = () =>   {
        toggleSpeech()
    }


    const handleLangSelect = (e) => {
        let new_langs = {...lang}
        new_langs.default = e
        setLang(new_langs)
    }





    useEffect(() => {
        const speechObj = window.speechSynthesis
        speechObj.addEventListener('voiceschanged', availableLang)
        function availableLang() {
            const langs = this.getVoices()
            const langOptions = langs.map( lng => { return {name: lng.name, lang: lng.lang}})

            setLang({ default: langOptions[0].name, options: langOptions, speechObj})

        }

    })

    return (
        <div id="app">
            <span> Read more with less energy....</span>
            <hr/>
            <Controls
                handlePause={handlePause}
                handleListen={handleListen}
                langs={lang}
                handleLangSelect={handleLangSelect}
                handleUpdateControls={handleUpdateControls}
            />
            <hr/>
            <TextInput
                handleListenText={handleListenText}
            />
        </div>
    );
};

export default App;