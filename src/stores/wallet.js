import ethers from 'ethers'
import { writable } from 'svelte/store'

// this is the object which will let us do all the funky things like send
// tokens, sign messages, etc. we'll bind all the functions to the wallet obj
export let wallet

// the following are not exported, they are instead script variables which are
// used when we send assets and do wallet operations from elsewhere. these are
let tokenContract
let ethersWallet
let assist

/**
 * Initialise the wallet store, and set up a few helper functions for refreshing
 * the wallet etc.
 * @param {Object} options Burner wallet initialisation options
 */
export default async function init(options) {
  // this is all very opinionated
  const { privateKey, networkId, tokenAddress, config } = options
  const { NETWORKS, TOKEN_ABI, CURRENCY_SYMBOL } = config
  assist = options.assist

  const provider = getProvider(NETWORKS[networkId])
  ethersWallet = getWallet(privateKey, provider)
  tokenContract = getTokenContract(tokenAddress, TOKEN_ABI, provider)

  // our export
  wallet = {
    // sendEth: (...args) => wallet.sendBaseAsset(...args),
    // sendBaseAsset: (...args) => sendBaseAsset(...args), // could be ETH/xDAI
    sendTokens: (...args) => sendTokenTransaction(...args),
    address: ethersWallet.address,
    tokenBalance: writable(0),
    baseAssetBalance: writable(0),
    provider: provider,
    tokenBalanceOf: async address => await getTokenBalance(address),
    notify: (...args) => assist.notify(...args)
  }

  // we need to do this once when we load the app
  setTokenBalance(await getTokenBalance(wallet.address))
  setupBalanceWatchers(wallet.address)

  async function sendTokenTransaction(
    to,
    value,
    bytes = '0x',
    string = 'tokenFallback',
    options,
    messages
  ) {
    console.log(string)
    const txMessages = Object.assign(
      getDefaultTokenMessages(CURRENCY_SYMBOL, value),
      messages
    )
    const dismiss = assist.notify('pending', txMessages.txSent(), {
      customTimeout: -1
    })
    const nonce = await provider.getTransactionCount(
      ethersWallet.address,
      'pending'
    )
    console.log({ to, value, bytes, string })
    console.log(tokenContract)
    const tx = tokenContract['transfer(address,uint256,bytes,string)'](
      to,
      value,
      bytes,
      string,
      {
        gasPrice: 1, // default on xDAI
        gasLimit: 500000,
        nonce: nonce
      }
    )
    tx.catch(() => {
      dismiss()
      assist.notify('error', txMessages.txStall())
    })
    tx.then(async r => {
      await r.wait()
      dismiss()
      assist.notify('success', txMessages.txConfirmed())
    })
    return tx
  }

  function setupBalanceWatchers(walletAddress) {
    // sometimes this listener fires twice??
    tokenContract.on(
      tokenContract.filters.Transfer(null, null),
      async (f, t, v) => {
        console.log('-- GOT A TRANSFER EVENT --')
        console.log({ f, t, v })
        if (t.toLowerCase() === walletAddress.toLowerCase()) {
          assist.notify(
            'success',
            `Received ${CURRENCY_SYMBOL}${v.toNumber().toLocaleString()}!`
          )
          setTokenBalance(await getTokenBalance(walletAddress))
        } else if (f.toLowerCase() === walletAddress.toLowerCase()) {
          setTokenBalance(await getTokenBalance(walletAddress))
        }
      }
    )
    // this actually fires once to get the initial balance, so we don't need to
    // initialise it first, which is handy but a little confusing, as the
    // behaviour for a token is different
    provider.on(walletAddress, balance => {
      setBaseAssetBalance(ethers.utils.formatEther(balance))
    })
  }

  async function getTokenBalance(address) {
    return await tokenContract.balanceOf(address)
  }

  function setTokenBalance(b) {
    console.log('-- SETTING TOKEN BALANCE TO --', b.toNumber())
    wallet.tokenBalance.set(b)
  }

  function setBaseAssetBalance(b) {
    wallet.baseAssetBalance.set(b)
  }
}

/**
 * Creates an ethers wallet object from the given private key and attaches it to
 * a given provider
 * @param {String} privateKey private key, in plain text :woop:
 * @param {Object} provider ethers.js provider object
 */
function getWallet(privateKey, provider) {
  return new ethers.Wallet(privateKey, provider)
}

/**
 * Creates an ethers js provider with the given rpc url
 * @param {String} url rpc url
 */
function getProvider(url) {
  return new ethers.providers.JsonRpcProvider(url)
}

function getTokenContract(address, abi, provider) {
  const c = new ethers.Contract(address, abi, provider)
  // connect our burner account with the contract so we can send txs
  return c.connect(ethersWallet)
}

// we might not even need this?
function sendBaseAsset(to, value, options, messages, error) {}

function getDefaultTokenMessages(currencySymbol, value) {
  return {
    txSent: () => `Sending ${currencySymbol}${Number(value).toLocaleString()}`,
    txConfirmed: () =>
      `Sent ${currencySymbol}${Number(value).toLocaleString()}`,
    txStall: () => `Something's wrong...`,
    txConfirmed: () => `Sent ${currencySymbol}${Number(value).toLocaleString()}`
  }
}
