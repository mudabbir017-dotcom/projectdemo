let arr = [1, 2, 2, 3, 4, 3, 2, 1];

let count = {};

for (let i = 0; i < arr.length; i++) {
    let num = arr[i];

    if (count[num]) {
        count[num]++;
    } else {
        count[num] = 1;
    }
}

console.log(count);