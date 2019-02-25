The following examples require Web3, so we use the `<vth-status>` component to check the status of Web3, as well as this basic smart contract definition:
```html
module.exports = {
  address: '0x692a70d2e424a56d2c6c27aa97d1a86395877b3a',
  abi: [
    {
      "constant": false,
      "inputs": [
        {
          "name": "param",
          "type": "string"
        }
      ],
      "name": "doSomething",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}
```

Access the smart contract through scoped-slots, and pass it to a Vue method
```vue
<template>
  <vth-status>
    <template slot-scope="web3">
      <vth-contract
        v-if="web3.account"
        v-bind:address="address"
        v-bind:abi="abi"
      >
        <button
          slot-scope="MyContract"
          @click="doSomethingWithContract(MyContract)"
        >Click me</button>
      </vth-contract>

      <p v-else>Web3 is not available. Please install <a href="https://metamask.io/">MetaMask</a>, or enable it if it is installed.</p>
    </template>
  </vth-status>
</template>

<script>
// Provide the contract address and abi from somewhere
const { address, abi } = require('./exampleContract');

export default {
  data: () => ({
    address: address,
    abi: abi
  }),

  methods: {
    doSomethingWithContract(contract) {
      // setup params if your method requires them
      const params = '...'
      contract.doSomething(params).then(results => {
        console.log("Results = ", results)
      })
    }
  }
}
</script>
```

Access the smart contract through scoped-slots, and pass its methods to a Vue method
```vue
<template>
  <vth-status>
    <template slot-scope="web3">
      <vth-contract
        v-if="web3.account"
        v-bind:address="address"
        v-bind:abi="abi"
      >
        <button
          slot-scope="MyContract"
          @click="callMethodOnContract(MyContract.doSomething)"
        >Click me</button>
      </vth-contract>

      <p v-else>Web3 is not available. Please install <a href="https://metamask.io/">MetaMask</a>, or enable it if it is installed.</p>
    </template>
  </vth-status>
</template>

<script>
// Provide the contract address and abi from somewhere
const { address, abi } = require('./exampleContract');

export default {
  data: () => ({
    address: address,
    abi: abi
  }),

  methods: {
    callMethodOnContract(method) {
      // setup params if your method requires them
      const params = '...'
      method(params).then(results => {
        console.log("Results = ", results)
      })
    }
  }
}
</script>
```

Access the smart contract through scoped-slots, and pass its methods and some params to a Vue method
```vue
<template>
  <vth-status>
    <template slot-scope="web3">
      <vth-contract
        v-if="web3.account"
        v-bind:address="address"
        v-bind:abi="abi"
      >
        <button
          slot-scope="MyContract"
          @click="callMethod(MyContract.doSomething, 'my params')"
        >Click me</button>
      </vth-contract>

      <p v-else>Web3 is not available. Please install <a href="https://metamask.io/">MetaMask</a>, or enable it if it is installed.</p>
    </template>
  </vth-status>
</template>

<script>
// Provide the contract address and abi from somewhere
const { address, abi } = require('./exampleContract');

export default {
  data: () => ({
    address: address,
    abi: abi
  }),

  methods: {
    callMethod(method, ...params) {
      method(...params).then(results => {
        console.log("Results = ", results)
      })
    }
  }
}
</script>
```

Access the smart contract through scoped-slots, and pass its destructured methods and some params to a Vue method
```vue
<template>
  <vth-status>
    <template slot-scope="web3">
      <vth-contract
        v-if="web3.account"
        v-bind:address="address"
        v-bind:abi="abi"
      >
        <button
          slot-scope="{ doSomething }"
          @click="callMethod(doSomething, 'my params')"
        >Click me</button>
      </vth-contract>

      <p v-else>Web3 is not available. Please install <a href="https://metamask.io/">MetaMask</a>, or enable it if it is installed.</p>
    </template>
  </vth-status>
</template>

<script>
// Provide the contract address and abi from somewhere
const { address, abi } = require('./exampleContract');

export default {
  data: () => ({
    address: address,
    abi: abi
  }),

  methods: {
    callMethod(method, ...params) {
      method(...params).then(results => {
        console.log("Results = ", results)
      })
    }
  }
}
</script>
```

Access the smart contract through $refs
```vue
<template>
  <vth-status>
    <template slot-scope="web3">
      <template v-if="web3.account">
        <vth-contract
          v-bind:address="address"
          v-bind:abi="abi"
          ref="myContractRef"
        />
        <button @click="callContractMethodFromRefs">Click me</button>
      </template>

      <p v-else>Web3 is not available. Please install <a href="https://metamask.io/">MetaMask</a>, or enable it if it is installed.</p>
    </template>
  </vth-status>
</template>

<script>
// Provide the contract address and abi from somewhere
const { address, abi } = require('./exampleContract');

export default {
  data: () => ({
    address: address,
    abi: abi
  }),

  methods: {
    callContractMethodFromRefs() {
      // setup params if your method requires them
      const params = '...'
      this.$refs.myContractRef.contract.doSomething(params).then(results => {
        console.log("Results = ", results)
      })
    }
  }
}
</script>
```
