let arr=[1,2,3,4,5,6,7,8];
let even=[]
let odd=[]
let idx=0
let idx1=0
for(let i=0;i<arr.length;i++){
    if(arr[i]%2==0){
        even[idx]=arr[i];
        idx1++;
    }
    else{
        odd[idx]=arr[i];
        idx++;
    }
}
console.log(even);
console.log(odd);
