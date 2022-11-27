


https://www.npmjs.com/package/throat


```ts{1,4,5-8}
export async function asyncPool<Item, Result>({
  concurrency,
  items,
  fn
}: {
  concurrency: number
  items: Item[]
  fn: (item: Item) => Promise<Result>
}): Promise<Result[]> {
  const promises: Promise<Result>[] = []
  const pool = new Set<Promise<Result>>()
  for (const item of items) {
    const promise = fn(item)
    promises.push(promise)
    pool.add(promise)
    const clean = () => pool.delete(promise)
    promise.then(clean, clean)
    if (pool.size >= concurrency) await Promise.race(pool)
  }
  return Promise.all(promises)
}

```

```js


function limit(maxCount){
  // [,5]
  // [2,34,]
  let queue = []
  let activeCount = 0

  const next = ()=>{
    //下一个任务
    activeCount--
    if(queue.length>0){
      queue.shift()()
    }
  }
  const run = async (fn,resolve,args)=>{
    //执行一个函数
    activeCount++
    const result = (async()=>fn(...args))()
    resolve(result)
    await result
    next() //下一个
  }
  const push = async (fn,resolve,args)=>{
    queue.push(run.bind(null,fn,resolve,args))
    if(activeCount<maxCount && queue.length>0){
      // 队列没满 并且还有任务 启动任务
      queue.shift()()
    }
  }

  let runner = (fn,...args)=>{
    return new Promise((resolve)=>{
      push(fn,resolve,args)
    })
  }
  return runner


}
async function sleep(n,name='test'){
  return new Promise(resolve=>{
    console.log(n,name,'start')
    setTimeout(()=>{
      console.log(n,name,'end','-------------')
      resolve({n,name})
    },n*1000)
  })
}

async function start(){
  let runner = limit(2) //并发量是3
  let tasks = [
    ()=> sleep(1,'吃饭'),
    ()=> sleep(3,'睡觉'),
    ()=> sleep(5,'打游戏'),
    ()=> sleep(3.5,'学习算法'),
    ()=> sleep(4,'学习Vue和React'),
  ].map(runner)
  let result = await Promise.all(tasks)
  console.log(result,'end')
}
// @think 如果任务有优先级呢
start()

```