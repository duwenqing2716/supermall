export const debounce(fn,delay){
    let timer = null
    return function(...args){
      if(timer){
        clearTimeout(timer)
      }else{
        timer = setTimeout( () => {
          fn.apply(this,args)
        },delay)
      }
    }
  }
