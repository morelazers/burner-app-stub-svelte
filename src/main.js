import parseBurnerUrl from 'burner-url-parser'

import App from './App.svelte'
import stores from './stores'
import config from './config'
import bnc from 'bnc-assist'

const ethereumDetails = parseBurnerUrl(window.location.href)
// you can now pass this to a file which sets up the wallet etc
// console.log(ethereumDetails)
// http://localhost:5000/?tokenAddress=0x27f706edde3aD952EF647Dd67E24e38CD0803DD6&networkId=100#0xaslongasthisisaprivatekeyyouaregolden

const assist = bnc.init({
  dappId: '14b0bca3-4028-475c-8c78-ccee89ada6cc',
  networkId: 100
})

const storeConfig = Object.assign({}, ethereumDetails, { config }, { assist })
stores(storeConfig)

// if you don't need the ethereumDetails passed to your view
// feel free to remove the props here
const app = new App({
  target: document.body,
  props: ethereumDetails
})

export default app
