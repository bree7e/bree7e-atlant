// https://code.tutsplus.com/articles/data-structures-with-javascript-tree--cms-23393
// http://www.internet-technologies.ru/articles/strukturirovanie-dannyh-s-pomoschyu-javascript-derevo.html

function Tree (node) {
  this._root = node
}

function Node (data) {
  this.data = data
  this.parent = null
  this.left = null
  this.right = null
}

Tree.prototype.add = function(data, toNode) {
  const newNode = new Node(data)
  if (['+', '-', '*', '/'].indexOf(data) > -1) {
    newNode.left = toNode
    if (toNode.parent === null) {
      this._root = newNode
    } else {
      toNode.parent.right = newNode
      newNode.parent = toNode.parent
    }
    toNode.parent = newNode
  } else {
    newNode.parent = toNode
    toNode.right = newNode
  }
  return newNode    
};
  
/*
  2+3*4

  +
  ├── 2
  └── *
      ├── 3
      └── 4
*/
const twoR = new Node(2)
let exp = new Tree(twoR)
const plusR = exp.add('+', twoR)
const threeR = exp.add(3, plusR)
const multiR = exp.add('*', threeR)
const fourR = exp.add(4, multiR)

console.log(exp);
  
let toNode = null

const two = new Node(2)
toNode = two
let expr = new Tree(two); // {_root: Node {data: 2, parent: null, left: null, right: null }}

const plusNode = new Node('+') // операция ставится рутом последней левой ноды
plusNode.left = toNode
if (toNode.parent === null) {
    expr._root = plusNode
} else {
    toNode.parent.right = plusNode
    plusNode.parent = toNode.parent
}
toNode.parent = plusNode
toNode = plusNode

const three = new Node(3)
three.parent = toNode
toNode.right = three
toNode = three

const multiNode = new Node('*') 
multiNode.left = toNode
if (toNode.parent === null) {
    expr._root = multiNode
} else {
    toNode.parent.right = multiNode
    multiNode.parent = toNode.parent
}
toNode.parent = multiNode
toNode = multiNode

const four = new Node(4)
four.parent = toNode
toNode.right = four
toNode = four

function isEquivalent(a, b) {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
      return false;
  }

  for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
          return false;
      }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}

console.log(expr)

console.log(isEquivalent(exp,expr));