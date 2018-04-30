// https://code.tutsplus.com/articles/data-structures-with-javascript-tree--cms-23393
// http://www.internet-technologies.ru/articles/strukturirovanie-dannyh-s-pomoschyu-javascript-derevo.html

function Node (data) {
    this.data = data
    this.parent = null
    this.left = null
    this.right = null
  }
  
  function Tree (node) {
    this._root = node
  }
  
  Tree.prototype.add = function(data, toData, traversal) {
      var child = new Node(data),
          parent = null,
          callback = function(node) {
              if (node.data === toData) {
                  parent = node;
              }
          };
   
      this.contains(callback, traversal);
   
      if (parent) {
          parent.children.push(child);
          child.parent = parent;
      } else {
          throw new Error('Cannot add node to a non-existent parent.');
      }
  };
  
  /*
   one
   ├── two
   │   ├── four
   │   └── five
   └── three
       ├── six
       └── seven
  */
  
  // let tree = new Tree('one');
  
  // tree._root.left = new Node('two')
  // tree._root.left.parent = tree
  
  // tree._root.left.left = new Node('four')
  // tree._root.left.left.parent = tree._root.left
  
  // tree._root.left.right = new Node('five')
  // tree._root.left.right.parent = tree._root.left
  
  // tree._root.right = new Node('three')
  // tree._root.right.parent = tree
   
  // tree._root.right.left = new Node('six')
  // tree._root.right.left.parent = tree._root.left
  
  // tree._root.right.right = new Node('seven')
  // tree._root.right.right.parent = tree._root.left
  
  
  /*
    2+3*4
  
   +
   ├── 2
   └── *
       ├── 3
       └── 4
  */
  
let lastNode = null

const two = new Node(2)
lastNode = two
let expr = new Tree(two); // {_root: Node {data: 2, parent: null, left: null, right: null }}

const plusNode = new Node('+') // операция ставится рутом последней левой ноды
plusNode.left = lastNode
if (lastNode.parent === null) {
    expr._root = plusNode
} else {
    lastNode.parent.right = plusNode
    plusNode.parent = lastNode.parent
}
lastNode.parent = plusNode
lastNode = plusNode

const three = new Node(3)
three.parent = lastNode
lastNode.right = three
lastNode = three

const multiNode = new Node('*') 
multiNode.left = lastNode
if (lastNode.parent === null) {
    expr._root = multiNode
} else {
    lastNode.parent.right = multiNode
    multiNode.parent = lastNode.parent
}
lastNode.parent = multiNode
lastNode = multiNode

const four = new Node(4)
four.parent = lastNode
lastNode.right = four
lastNode = four


console.log(expr)