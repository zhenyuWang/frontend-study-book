export default function debounce(fn:Function,delay:number=300){
  let timer
  const setTimer = () => {
    timer = setTimeout(() => {
      fn()
      timer = null
    },delay)
  }

  return () => {
    if(!timer){
      setTimer()
    }else{
      clearTimeout(timer)

      setTimer()
    }
  }
}