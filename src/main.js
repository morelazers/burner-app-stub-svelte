import App from './App.svelte'

import parseBurnerUrl from 'burner-url-parser'

const ethereumDetails = parseBurnerUrl(window.location.href)

// you can now pass this to a file which sets up the wallet etc
// console.log(ethereumDetails)
// http://localhost:5000/?tokenAddress=0x27f706edde3aD952EF647Dd67E24e38CD0803DD6&networkId=100#0xaslongasthisisaprivatekeyyouaregolden

// if you don't need the ethereumDetails passed to your view
// feel free to remove this
const app = new App({
  target: document.body,
  props: ethereumDetails
})

export default app
