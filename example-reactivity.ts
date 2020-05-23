// deno run https://raw.githubusercontent.com/lospringliu/deno/master/example-reactivity.ts

// import * as reactivity from "./vue/reactivity/index.ts"
import * as reactivity from "./vue/index.ts";

let total;
const price = reactivity.ref(10);
const quantity = reactivity.ref(10);

const feffect = reactivity.effect(() => {
  console.log(`price = ${price.value}`);
  console.log(`quantiy = ${quantity.value}`);
  total = price.value * quantity.value;
  console.log(`total = ${price.value} * ${quantity.value} = ${total}`);
});

price.value = 20;

quantity.value = 20;

price.value = 1;

quantity.value = 1;

console.log("stopping effect");
reactivity.stop(feffect);

price.value = 10;
quantity.value = 10;

const computed = reactivity.computed(() => price.value * quantity.value);

console.log(`price = ${price.value}`);
console.log(`quantiy = ${quantity.value}`);
console.log(`computed total: ${computed.value}`);

quantity.value = 20;
console.log(`price = ${price.value}`);
console.log(`quantiy = ${quantity.value}`);
console.log(`computed total: ${computed.value}`);
price.value = 20;
console.log(`price = ${price.value}`);
console.log(`quantiy = ${quantity.value}`);
console.log(`computed total: ${computed.value}`);
price.value = 1;
console.log(`price = ${price.value}`);
console.log(`quantiy = ${quantity.value}`);
console.log(`computed total: ${computed.value}`);
quantity.value = 1;
console.log(`price = ${price.value}`);
console.log(`quantiy = ${quantity.value}`);
console.log(`computed total: ${computed.value}`);

console.log("stopping computed effect");
reactivity.stop(computed.effect);
quantity.value = 10000;
console.log(`price = ${price.value}`);
console.log(`quantiy = ${quantity.value}`);
console.log(`computed total: ${computed.value}`);

const factors = reactivity.reactive({ price: 10, quantity: 10 });
let reffect;
const rreffect = reactivity.effect(
  () => reffect = factors.price * factors.quantity,
  { lazy: true, onTrigger: () => console.log("triggered") },
);
console.log(`reactive total: ${reffect}`);
rreffect();
const non_reactive = factors.price * factors.quantity;
const computed_reactive = reactivity.computed(() =>
  factors.price * factors.quantity
);
console.log(`price = ${factors.price}`);
console.log(`quantiy = ${factors.quantity}`);
console.log(`non reactive total: ${non_reactive}`);
console.log(`computed reactive total: ${computed_reactive.value}`);
console.log(`reactive total: ${reffect}`);

factors.price = 20;
console.log(`price = ${factors.price}`);
console.log(`quantiy = ${factors.quantity}`);
console.log(`non reactive total: ${non_reactive}`);
console.log(`computed reactive total: ${computed_reactive.value}`);
console.log(`reactive total: ${reffect}`);

factors.quantity = 20;
console.log(`price = ${factors.price}`);
console.log(`quantiy = ${factors.quantity}`);
console.log(`non reactive total: ${non_reactive}`);
console.log(`computed reactive total: ${computed_reactive.value}`);
console.log(`reactive total: ${reffect}`);
