// deno run https://raw.githubusercontent.com/lospringliu/deno/master/example-shared.ts

import * as shared from "./vue/reactivity/shared/index.ts";

console.log(shared.isOn("onMounted"));
console.log(shared.isOn("onCreated"));
console.log(shared.isOn("offMounted"));
