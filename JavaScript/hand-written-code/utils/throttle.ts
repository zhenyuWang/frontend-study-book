export default function throttle(fn:Function,delay:number=300){
  let timer

  return () => {
    if(timer){
      return
    }
    timer = setTimeout(() => {
      fn()
      timer = null
    },delay)
  }
}