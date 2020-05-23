// deno run https://raw.githubusercontent.com/lospringliu/deno/master/example-reactivity.ts

import * as reactivity from "./vue/reactivity/index.ts";
import * as runtime from "./vue/index.ts";
// import * as runtime from "./vue/apiWatch.ts"

const sleep = (time: number = 1000) =>
  new Promise((res) => setTimeout(() => res(), time));
const reactive = setup();
function setup() {
  // const price = reactivity.ref(10)
  // const quantity = reactivity.ref(10)
  const state: any = reactivity.reactive({
    price: 10,
    quantity: 10,
    total: reactivity.computed(() => state.price * state.quantity),
  });

  runtime.watch(
    () => state.price,
    (value, oldValue) => {
      console.log(
        `price = ${state.price}, changed from ${oldValue} to ${value}`,
      );
      console.log(`total: ${state.total}`);
      console.log("---------------------");
    },
  );
  runtime.watch(
    () => state.quantity,
    (value, oldValue) => {
      console.log(
        `quantity = ${state.quantity}, changed from ${oldValue} to ${value}`,
      );
      console.log(`total: ${state.total}`);
      console.log("                     ---------------------");
    },
  );

  return {
    state,
  };
}

setInterval(() => {
  reactive.state.price += 10;
  reactive.state.quantity += 5;
}, 1000);
