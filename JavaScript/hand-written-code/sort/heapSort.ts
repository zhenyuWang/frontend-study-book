class MinHeap {
  private list:number[] = []
  public size:number = 0

  push(val:number){
    this.list.push(val)
    this.size++

    if(this.size>1){
      let child = this.size-1
      let parent = (child-1)>>1

      while(child>0 && this.list[child]<this.list[parent]){
        [this.list[parent],this.list[child]] = [this.list[child],this.list[parent]]

        child = parent
        parent = (child-1)>>1
      }
    }
  }

  pop(){
    if(this.size===0){
      return
    }

    if(this.size===1){
      const res = this.list[0]
      this.list = []
      this.size = 0
      return res
    }

    const res = this.list[0]
    this.list[0] = this.list.pop()!
    this.size--

    let parent = 0
    let childL = 1
    let childR = 2

    while(
      (childL<this.size && this.list[childL]<this.list[parent])
      || (childR<this.size && this.list[childR]<this.list[parent])
    ){
      if(childR<this.size && this.list[childR]<this.list[childL]){
        [this.list[parent],this.list[childR]] = [this.list[childR],this.list[parent]]
        parent = childR
      }else{
        [this.list[parent],this.list[childL]] = [this.list[childL],this.list[parent]]
        parent = childL
      }

      childL = parent * 2 + 1
      childR = parent * 2 + 2
    }

    return res
  }
}

// O(n*logn)/O(n)
export default function heapSort(original:number[]){
  const len = original.length
  const minHeap = new MinHeap()

  for(let i = 0;i<len;i++){
    minHeap.push(original[i])
  }

  original.length = 0

  while(minHeap.size){
    original.push(minHeap.pop()!)
  }
}