module.exports = {
  NETWORKS: {
    1: 'https://etherscan.io',
    10: 'http://localhost:8545',
    100: 'https://xdai.poa.network'
  },
  CURRENCY_SYMBOL: `៛`,
  TOKEN_ABI: [
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [
        {
          name: '',
          type: 'string'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'spender',
          type: 'address'
        },
        {
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'approve',
      outputs: [
        {
          name: 'success',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'from',
          type: 'address'
        },
        {
          name: 'to',
          type: 'address'
        },
        {
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'transferFrom',
      outputs: [
        {
          name: 'success',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [
        {
          name: '',
          type: 'uint8'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'to',
          type: 'address'
        },
        {
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'mint',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'burn',
      outputs: [
        {
          name: 'success',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: 'owner',
          type: 'address'
        }
      ],
      name: 'balanceOf',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'from',
          type: 'address'
        },
        {
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'burnFrom',
      outputs: [
        {
          name: 'success',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          name: '',
          type: 'string'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'to',
          type: 'address'
        },
        {
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'transfer',
      outputs: [
        {
          name: 'success',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'to',
          type: 'address'
        },
        {
          name: 'value',
          type: 'uint256'
        },
        {
          name: 'data',
          type: 'bytes'
        }
      ],
      name: 'transfer',
      outputs: [
        {
          name: 'success',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'spender',
          type: 'address'
        },
        {
          name: 'value',
          type: 'uint256'
        },
        {
          name: 'context',
          type: 'bytes'
        }
      ],
      name: 'approveAndCall',
      outputs: [
        {
          name: 'success',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: 'owner',
          type: 'address'
        },
        {
          name: 'spender',
          type: 'address'
        }
      ],
      name: 'allowance',
      outputs: [
        {
          name: 'remaining',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'to',
          type: 'address'
        },
        {
          name: 'value',
          type: 'uint256'
        },
        {
          name: 'data',
          type: 'bytes'
        },
        {
          name: 'custom_fallback',
          type: 'string'
        }
      ],
      name: 'transfer',
      outputs: [
        {
          name: 'success',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_spender',
          type: 'address'
        },
        {
          name: '_currentValue',
          type: 'uint256'
        },
        {
          name: '_value',
          type: 'uint256'
        }
      ],
      name: 'safeApprove',
      outputs: [
        {
          name: 'success',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'admin',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          name: 'initialSupply',
          type: 'uint256'
        },
        {
          name: 'tokenName',
          type: 'string'
        },
        {
          name: 'decimalUnits',
          type: 'uint8'
        },
        {
          name: 'tokenSymbol',
          type: 'string'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      payable: true,
      stateMutability: 'payable',
      type: 'fallback'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'owner',
          type: 'address'
        },
        {
          indexed: true,
          name: 'spender',
          type: 'address'
        },
        {
          indexed: false,
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'Approval',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'from',
          type: 'address'
        },
        {
          indexed: true,
          name: 'to',
          type: 'address'
        },
        {
          indexed: false,
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'Transfer',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'from',
          type: 'address'
        },
        {
          indexed: false,
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'Burn',
      type: 'event'
    }
  ]
}
