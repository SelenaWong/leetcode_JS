// 代码摘抄自
// https://github.com/mqyqingfeng/Blog/issues/12

let obj = {
    name: 'wei wang'
}

function foo() {
    console.log(this.name);
    console.log(arguments);
}

Function.prototype.bind_ = function ($this) {
    let argv = [];
    for (let i = 1; i < arguments.length; i++) {
        argv.push(arguments[i]);
    }
    let this_ = this;
    let fNOP = function () {};
    let bar = function () {
        for (let i = 0; i < arguments.length; i++) {
            argv.push(arguments[i]);
        }
        return this_.apply(this instanceof fNOP ? this : $this, argv);
    }
    fNOP.prototype = this.prototype;
    bar.prototype = new fNOP();
    return bar;
}

let newFunction = foo.bind_(obj, ...[1, 2, 3]);

newFunction(...[4, 5, 6]);

// 难点
/**
 * 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
 */

let obj_ = {
    name: 'wei wang',
    age: 23
}

function bar(value) {
    console.log(this.name);
    console.log(this.age);
    this.value = 23;
}
let newCreation = bar.bind_(obj_, 23);

let newObj_ = new newCreation(23);

console.log(newObj_.value);

