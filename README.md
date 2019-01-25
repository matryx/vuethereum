# Vuethereum

### The Vue library Ethereum deserves

```
// Example.vue
<template>
  <vth-status>
    <template slot-scope="{ loading, available, enabled, account, networkVersion, getWeb3 }">
      <p v-if="loading">Please confirm enabling Web3...</p>

      <p v-else-if="!available">Web3 no detected. Please install MetaMask.</p>

      <template v-else-if="enabled">
        <h3>Accessing Smart Contracts</h3>

        <vth-contract
          :address="MyContract.address"
          :abi="MyContract.abi"
          ref="myContractRef"
        />
        <button @click="refTx">$ref Tx 1</button>


        <vth-contract
          :address="MyContract.address"
          :abi="MyContract.abi"
        >
          <button
            slot-scope="MyContract"
            @click="doSomethingWithContract(MyContract)"
          >scoped Tx 1</button>
        </vth-contract>


        <vth-contract
          :address="MyContract.address"
          :abi="MyContract.abi"
        >
          <button
            slot-scope="MyContract"
            @click="callMethodOnContract(MyContract.someMethod, 'params')"
          >scoped Tx 2</button>
        </vth-contract>


        <vth-contract
          :address="MyContract.address"
          :abi="MyContract.abi"
        >
          <button
            slot-scope="{ someMethod }"
            @click="callMethod(someMethod, 'params')"
          >destructured Tx</button>
        </vth-contract>


        <h3>Checking out transactions</h3>
        <vth-tx
          :tx="tx"
          @mined="consoleLog"
        >
          <template slot-scope="{ pending, error, tx, getMinedTx }">
            <p v-if="pending">Waiting on those miners...</p>

            <template v-else-if="error">{{ consoleLog(error) }}</template>

            <p v-else-if="!tx">Transaction not found on this network</p>
            <pre v-else>{{ tx.transactionHash }}</pre>

            <button @click="getMinedTx('0xcb43b7d0b6c68a3a579b8b8c49ba76af09e06e81edf108d971c2e7efad6c8fed')">check new</button>
          </template>
        </vth-tx>

        <button @click="tx = '0x643c5d767858c6d142737eb3699ae66fdf18ab169e223ce7f6444e94bfc80aff'">check new</button>
      </template>

      <template v-else>
        <p>Web3 is not enabled</p>
        <button @click="getWeb3">Enable Web3</button>
      </template>
    </template>
  </vth-status>
</template>

<script>
import MyContract from "./my-contract-address-and-abi.js"
export default {
  data: () => ({
    MyContract,
    tx: "0xcb43b7d0b6c68a3a579b8b8c49ba76af09e06e81edf108d971c2e7efad6c8fed"
  }),
  methods: {
    consoleLog(...e) {
      console.log(...e)
    },
    async refTx() {
      const res = await this.$refs.myContractRef.contract.someMethod('params')
      console.log("Method response = " + res)
    },
    async doSomethingWithContract(contract) {
      const res = await contract.someMethod('params")
      console.log("Method response = " + res)
    },
    async callMethodOnContract(method, ...params) {
      const res = await method(...params)
      console.log("Method response = " + res)
    }
  }
}
</script>
```
