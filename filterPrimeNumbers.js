a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
b =[]

function isPrime(n) {
  if(n == 1){
    return false;
  }
  for (let i = 2; i<=n; i++){
    // console.log(i + '   '+n)
    if(n % i === 0) {
      return false;
    }
    return true;
  }
  return true;
}


for (let j in a) {
  
  if(isPrime(a[j])) {
    b.push(a[j])
  }
}

console.log(b)
