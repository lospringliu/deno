// deno run https://raw.githubusercontent.com/lospringliu/deno/master/example-reactivity.ts

import * as reactivity from "./vue/reactivity/index.ts"
import * as watch from "./vue/index.ts"
// import * as watch from "./vue/apiWatch.ts"

const sleep = (time: number = 1000) => new Promise(res => setTimeout(() => res(), time))
const reactive = setup()
function setup () {
	// const price = reactivity.ref(10)
	// const quantity = reactivity.ref(10)
	const state: any = reactivity.reactive({price: 10,
		quantity: 10,
		total: reactivity.computed(() => state.price * state.quantity)
	})
	
	watch.watch( () => state.price,
		() => {
		console.log(`price = ${state.price}`)
		console.log(`quantiy = ${state.quantity}`)
		console.log(`total: ${state.total}`)
	})
	
	return {
		state
	}
}

reactive.state.price = 20
await sleep(2000)
reactive.state.price = 50
await sleep(2000)
reactive.state.price = 100 
await sleep(2000)
reactive.state.quantity = 20

