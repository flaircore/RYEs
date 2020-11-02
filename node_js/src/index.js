import React from 'react';
import { render } from 'react-dom';

import App from './App'

render(<App />, document.getElementById('listener-con'));

async function text() {

    return 200000000000000000
}


text()
.then(res => {

    console.log('*********************** RES *************************')
    console.log('*********************** RES *************************')
    console.log('*********************** RES *************************')
    console.log(res)
    console.log('*********************** RES *************************')
    console.log('*********************** RES *************************')
    console.log('*********************** RES *************************')
})