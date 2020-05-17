// deno run https://raw.githubusercontent.com/lospringliu/deno/master/examples/vue-reactivity.ts

import * as reactivity from "../vue/reactivity/index.ts"

let total
const price = reactivity.ref(10)
const quantity = reactivity.ref(10)

const effect = reactivity.effect(() => {
	console.log(`price = ${price.value}`)
	console.log(`quantiy = ${quantity.value}`)
	total = price.value * quantity.value
	console.log(`total = ${price.value} * ${quantity.value} = ${total}`)
})

price.value = 20

quantity.value = 20

price.value = 1

quantity.value = 1
