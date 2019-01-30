```vue
<template>
  <div>
    <form @submit.prevent="updateTx">
      <label>Transaction hash:
        <br />
        <input v-model="txInput" />
      </label>
      <button type="submit">Check</button>
    </form>

    <vth-tx
      v-if="tx"
      v-bind:tx="tx"
      @mined="onMined"
    >
      <template slot-scope="tx">
        <p v-if="tx.pending">Waiting on those miners...
          <br /> (make sure you are on the same network if this takes too long)
        </p>

        <p v-else-if="tx.error">{{ tx.error.message }}</p>

        <p v-else-if="!tx">The transaction was not found.</p>

        <pre v-else>{{ tx }}</pre>
      </template>
    </vth-tx>
  </div>
</template>

<script>
export default {
  data: () => ({
    txInput: "",
    tx: ""
  }),

  methods: {
    onMined(tx) {
      console.log('That transaction was mined:', tx)
    },

    updateTx() {
      this.tx = this.txInput
    }
  }
}
</script>
```
