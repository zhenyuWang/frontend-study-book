let fullName

function getFullName(){
  fullName = person.firstName+person.lastName
}

let person = createActiveObject({
  firstName:'张',
  lastName:'三'
},getFullName)
function createActiveObject(raw,fn){
  return new Proxy(raw,{
    get(target,key){
      const res = Reflect.get(target,key)
      return res

    },
    set(target,key,value){
      const res = Reflect.set(target,key,value)
      fn()
      return res
    }
  })
}

getFullName()

console.log(fullName)

person.firstName = '李'
console.log(fullName)

person.lastName = '四'
console.log(fullName)
