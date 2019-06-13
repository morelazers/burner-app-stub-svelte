import ethers from 'ethers'
import { readable, writable } from 'svelte/store'
import { wallet } from './wallet'

export let dapp

let contract

export default async function init(options) {
  const { CURRENCY_SYMBOL } = options.config
  // okay - let's build our fkn dapp

  // set our initial dapp state
  dapp = {
    address: '0x952dc143d3e8d9c3a1341f016c4b8457da7e550c', // put our dapp address in here
    status: writable('INITIALISED'),
    price: 10,
    pot: writable(0, setPot),
    roll: () => {
      setStatus('ROLLING')
      const tx = wallet.sendTokens(
        dapp.address,
        10,
        ethers.utils.bigNumberify(dapp.price).toHexString(),
        'roll(address,uint256,bytes)'
      )
      tx.then(async r => {
        console.log({ r })
        await r.wait()
        setStatus('INITIALISED')
      })
    },
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'amount',
            type: 'uint256'
          },
          {
            indexed: false,
            name: 'odds',
            type: 'uint256'
          },
          {
            indexed: false,
            name: 'actual',
            type: 'uint256'
          }
        ],
        name: 'Win',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'odds',
            type: 'uint256'
          },
          {
            indexed: false,
            name: 'actual',
            type: 'uint256'
          }
        ],
        name: 'Lose',
        type: 'event'
      }
    ],
    getContract: () => {
      return new ethers.Contract(dapp.address, dapp.abi, wallet.provider)
    }
  }

  console.log('-- SETTING UP LISTENERS --')
  const contract = dapp.getContract()
  contract.on(contract.filters.Win(), (won, odds, actual) => {
    console.log(won.toNumber(), odds.toNumber(), actual.toNumber())
    wallet.notify('success', `You won ${CURRENCY_SYMBOL}${won.toNumber()}`)
    setPot()
  })
  contract.on(contract.filters.Lose(), (odds, actual) => {
    console.log(odds.toNumber(), actual.toNumber())
    wallet.notify('error', `You lost`)
    setPot()
  })

  async function setStatus(newStatus) {
    dapp.status.set(newStatus)
  }

  async function setPot() {
    const potSize = await wallet.tokenBalanceOf(dapp.address)
    dapp.pot.set(potSize.toNumber())
  }
}
