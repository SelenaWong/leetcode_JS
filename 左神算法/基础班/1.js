// A有序 B无序 打印B中所有不在A的数

var A = [1, 2, 3, 4, 5, 6, 7, 8];
var B = [6, 2, 6, 8, 9, 10, 12, 0];

/**
 * 直接indexOf
 * @param {*} a 
 * @param {*} b 
 */
function printExclude(a, b) {
    for (let i = 0; i < b.length; i++) {
        if (a.indexOf(b[i]) === -1) { // indexOf复杂度 ?
            console.log(b[i]);
        }
    }
}

printExclude(A, B);

/**
 * 先把数组B排序, A数组小于B. A移动, A===B B移动, 不打印, B小于A, B打印
 * @param {*} a 
 * @param {*} b 
 */
function printExclude_(a, b) { // sort 改变原数组
    console.log('=============新方法=============');
    b.sort(function (a, b) {
        return a - b;
    });
    a.sort(function (a, b) {
        return a - b;
    });
    let ida = 0;
    let idb = 0;
    while (idb < b.length && ida < a.length) {
        if (a[ida] < b[idb]) {
            ida++;
        }
        else {
            if (b[idb] < a[ida]) {
                console.log(b[idb]);
            }
            idb++;
        }
    }
    while (idb < b.length) {
        console.log(b[idb++]);
    }
}

printExclude_(A, B);

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * 冒泡排序
 * @param {*} params 
 */
function bubble(params) {
    console.log('=======冒泡=======');
    console.log(params);
    if (!params || params.length < 2) return;
    for (let i = params.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (params[j] > params[j + 1]) {
                swap(params, j, j + 1);
            }
        }
    }
    console.log(params);
}

bubble([6, 2, 6, 8, 9, 10, 12, 0]);
/**
 * 选择排序
 * @param {*} params 
 */
function select(params) {
    console.log('=======选择=======');
    console.log(params);
    if (!params || params.length < 2) return;
    for (let i = 0; i < params.length; i++) {
        let min = i;
        for (let j = i + 1; j < params.length; j++) {
            min = params[j] < params[min] ? j : min;
        }
        swap(params, i, min);
    }
    console.log(params);
}

select([6, 2, 6, 8, 9, 10, 12, 0]);
/**
 * 插入排序
 * @param {*} params 
 */
function insert(params) {
    console.log('=======插入=======');
    console.log(params);
    if (!params || params.length < 2) return;
    for (let j = 1; j < params.length; j++) {
        for (let i = j - 1; i >= 0 && params[i] > params[i + 1]; i--) {
            swap(params, i, i + 1);
        }
    }
    console.log(params);
}

insert([6, 2, 6, 8, 9, 10, 12, 0]);

// 对数器

/**
 * 第一步: 生成长度随机的数组
 * @param {*} size 
 * @param {*} value 
 */
function generateRandomArray(size, value) {
    console.log('=======对数器=======');
    let arr = [];
    let length = parseInt((size + 1) * Math.random());
    for (let i = 0; i < length; i++) {
        arr[i] = parseInt((value + 1) * Math.random()) - parseInt(value * Math.random());
    }
    return arr;
}

console.log(generateRandomArray(5, 5));

/**
 * 第二步: 系统的绝对正确方法
 * @param {*} arr 
 */
function rightMethod(arr) {
    Array.prototype.sort.call(arr);
}

/**
 * 第三步: 大样本测试
 * @param {*} testtime 
 */
function test(testtime) {
    let size = 10;
    let value = 10;
    for (let i = 0; i < testtime; i++) {
        let arr1 = generateRandomArray(size, value);
        let arr2 = arr1.slice();
        insert(arr1);
        insert(arr2);
        if (arr1.toString() !== arr2.toString()) {
            console.log(arr1, arr2);
        }
    }
}

/**
 * 递归找数组最大
 * @param {*} arr 
 */
console.log('=======递归找数组最大=======');
function findMax(arr) {
    if (arr.length === 1) return arr[0];
    let max = Math.max(findMax(arr.slice(0, arr.length / 2)), findMax(arr.slice(arr.length / 2)));
    return max;
}

console.log(findMax([1, 2, 4, 23, 5, 6, 7, 8, 3, 2, 2, 45, 5, 23, 4, 53, 23]));