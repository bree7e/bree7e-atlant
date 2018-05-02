/**
 * Узел дерева (Оператор или операнд)
 */
class Node {
  constructor (data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

export default class PartTree {
  constructor (part) {
    const newNode = new Node(part.fraction)
    this.root = newNode
    this.lastOperator = null
    this.lastOperand = newNode
  }
  /**
   * Добавление дроби и знака оператора к дереву
   * @param {*} part Дробь со знаком
   */
  addPart (part) {
    const newOperator = new Node(part.sign)
    const newOperand = new Node(part.fraction)
    newOperator.right = newOperand

    switch (part.sign) {
      case '+':
      case '-':
        newOperator.left = this.root
        this.root = newOperator
        break
      case '*':
      case '/':
        newOperator.left = this.lastOperand
        if (this.lastOperator) {
          this.lastOperator.right = newOperator
        } else {
          this.root = newOperator
        }
        break
    }

    this.lastOperator = newOperator
    this.lastOperand = newOperand
  }

  /**
   * Обход In-order в глубину
   * @param {Node} node
   */
  calculate (node) {
    let left = null
    if (node.left) {
      left = this.calculate(node.left)
    } else {
      return node.data
    }
    const right = this.calculate(node.right)
    return this.calculateFractions(left, right, node.data)
  }

  euclidSearch (a, b) {
    if (b === 0) {
      return a
    } else {
      return this.euclidSearch(b, a % b)
    }
  }

  simplify (f) {
    const divider = this.euclidSearch(f.numerator, f.denominator)
    return {
      numerator: f.numerator / divider,
      denominator: f.denominator / divider
    }
  }

  calculateFractions (a, b, operator) {
    let numerator = 0
    let denominator = 0
    switch (operator) {
      case '+':
        numerator = a.numerator * b.denominator + b.numerator * a.denominator
        denominator = a.denominator * b.denominator
        break
      case '-':
        numerator = a.numerator * b.denominator - b.numerator * a.denominator
        denominator = a.denominator * b.denominator
        break
      case '*':
        numerator = a.numerator * b.numerator
        denominator = a.denominator * b.denominator
        break
      case '/':
        numerator = a.numerator * b.denominator
        denominator = a.denominator * b.numerator
        break
    }
    let fraction = {
      numerator: numerator,
      denominator: denominator
    }
    return this.simplify(fraction)
  }

  result () {
    return this.calculate(this.root)
  }
}

let exp = new PartTree({ sign: '', fraction: { numerator: 3, denominator: 7 } })
exp.addPart({ sign: '*', fraction: { numerator: 5, denominator: 2 } })
exp.addPart({ sign: '+', fraction: { numerator: 2, denominator: 5 } })
// exp.addPart({sign: '+', fraction:  {  numerator: 1,  denominator: 35 }})
// exp.addPart({sign: '*', fraction:  {  numerator: 1,  denominator: 2 }})
// exp.addPart({sign: '+', fraction:  {  numerator: 1,  denominator: 2 }})
// exp.addPart({sign: '+', fraction:  {  numerator: 1,  denominator: 2 }})

// let exp = new PartTree({sign: '', fraction: '5'})
// exp.addPart({sign: '/', fraction: '7'})
// exp.addPart({sign: '*', fraction: '7'})
// exp.addPart({sign: '+', fraction: '4'})
// exp.addPart({sign: '+', fraction: '8'})
// exp.addPart({sign: '*', fraction: '4'})
// exp.addPart({sign: '/', fraction: '9'})
// exp.addPart({sign: '-', fraction: '30'})

console.log(exp.result())
