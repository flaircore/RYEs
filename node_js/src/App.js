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
                <select name="select_language" defaultValue={langs.default.name} onChange={ (e) => handleLangSelect(e.target.value)}>
                    {langs.options.map((option) => (
                        <option key={option.name} value={option}>{option.name}</option>
                    ))}
                </select>
            </div>
        )
    }

}
const Controls = ({updateVolume, updatePitch, handlePause, handleListen, langs, handleLangSelect }) => {

    return (
        <React.Fragment>
            <LangSelect
                langs={langs}
                handleLangSelect={handleLangSelect}

            />
            <label htmlFor="volume">Volume:</label>
            <input name="volume" onChange={ (e) => updateVolume(e.target.value)} defaultValue="1" type="range" min="0"
                   max="2" step="0.2"/>
            <label htmlFor="pitch">Pitch:</label>
            <input name="pitch" onChange={ (e) => updatePitch(e.target.value)} defaultValue="1" type="range" min="0"
                   max="2" step="0.2"/>
            <hr/>

            <button onClick={handleListen}>Listen</button>
            <button onClick={handlePause}>Pause</button>

        </React.Fragment>
    )

}



const App = () => {



    const [listening, setListening] = useState('')
    const [volume, setVolume] = useState(1)
    const [pitch, setPitch] = useState(1)
    const [lang, setLang] = useState({ default: "en-US", options: [] })

    function toggleSpeech(restart = true) {
        const speech = new SpeechSynthesisUtterance()

        // Voice better
        //speech.voice = lang.options.find(voice => voice.name === lang.default.name)
        speech.text = listening
        speech.volume = volume
        speech.rate = 1
        speech.pitch = pitch


        window.speechSynthesis.cancel()
        if (restart) window.speechSynthesis.speak(speech)
    }

    const handleListenText = (val) =>  setListening(val)

    const handlePause = () => {

    }

    const handleListen = () =>   {
        toggleSpeech()
    }


    const updateVolume = (e) => setVolume(e)

    const updatePitch = (e) => setPitch(e)


    const handleLangSelect = (e) => {

        // TODO:: set voice from here
        setLang({ default: { name: e.name, lang: e.lang }, options: lang.options })
    }





    useEffect(() => {
        window.speechSynthesis.addEventListener('voiceschanged', availableLang)
        function availableLang() {
            const langs = this.getVoices()
            const langOptions = langs.map( lng => { return {name: lng.name, lang: lng.lang}})
            //console.log(lang)
            setLang({ default: { name: langOptions[0].name, lang: langOptions[0].lang }, options: langOptions })
            //console.log(langOptions)

        }

    })


    if (listening){

        //window.speechSynthesis.speak(speech)
    }

    return (
        <div>
            THE APPLICATIONS
                <div>

                </div>
                <Controls
                    updateVolume={updateVolume}
                    updatePitch={updatePitch}
                    handlePause={handlePause}
                    handleListen={handleListen}
                    langs={lang}
                    handleLangSelect={handleLangSelect}
                />
                <hr/>
                <TextInput
                    handleListenText={handleListenText}
                />
        </div>
    );
};

export default App;