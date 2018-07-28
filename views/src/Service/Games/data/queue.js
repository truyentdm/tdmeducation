
var queue = function(){
    this.store = [];
    this.enqueue = function(els){
        this.store.push(els);
    }
    this.dequeue = function(){
        return this.store.shift();
    }
    this.peek = function(){
        return this.store[0];
    }
    this.print = function(){
        return this.store;
    }
    this.isEmpty = function(){
        return this.store.length == 0;
    }
    this.clear = function(){
        this.store = [];   
    }
    this.count = function(){
        return this.store.length;
    }
}

export default queue;

