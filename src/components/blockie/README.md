```vue
<template>
  <vth-blockie string="vuethereum is awesome!" />
</template>

<script>
export default {}
</script>
```

```vue
<template>
  <vth-blockie string="vuethereum is awesome!" round />
</template>

<script>
export default {}
</script>
```

```vue
<template>
  <vth-blockie string="vuethereum is awesome!" v-bind:options="options" />
</template>

<script>
export default {
  data: () => ({
    options: {
      // See all options at https://github.com/ethereum/blockies#use
      size: 15,
      scale: 10,
    }
  })
}
</script>
```
