// Main app page
console.log('From foreground.....')
chrome.tabs.executeScript(null, {file: './foreground.js'}, () => console.log('I injected'))