function reverse<T>(items: T[]): T[] {
  let retVal: T[] = [];

  let ctr = 0
  for (let i = items.length - 1; i >= 0; i--) {
    retVal[ctr] = items[i];
    ctr++;
  }
  return retVal;
}

console.log(reverse<number>([10, 20, 30]));

console.log(reverse<string>(['10', '20', '30']));


console.log(reverse<{ id: number, name: string }>([
  { id: 10, name: 'hari' },
  { id: 20, name: 'krish' },
  { id: 30, name: 'shiv' },
]));