Use the scoped-slot
```vue
<template>
  <vth-status>
    <pre slot-scope="web3">{{ web3 }}</pre>
  </vth-status>
</template>

<script>
export default {}
</script>
```

Use only destructured properties
```vue
<template>
  <vth-status>
    <template slot-scope="{ loading, available, enabled, account, networkVersion }">
      <p v-if="loading">Please confirm enabling Web3 🤔</p>

      <p v-else-if="enabled">👍
        <br />Your address: {{ account }},
        <br />Your network version: {{ networkVersion }}
      </p>

      <p v-else-if="available">Web3 is installed, but not enabled 😒</p>

      <p v-else>No Web3 detected. Please install <a href="https://metamask.io/">MetaMask.</a> 😉</p>
    </template>
  </vth-status>
</template>

<script>
export default {}
</script>
```

Defer calling ethereum.enable until later or reprompt to enable
```vue
<template>
  <vth-status deferred>
    <template slot-scope="web3">
      <pre>{{ web3 }}</pre>
      <button v-if="web3.available" @click="web3.getWeb3">Get Web3</button>
      <p>Web3 is required for this example</p>
    </template>
  </vth-status>
</template>

<script>
export default {}
</script>
```
