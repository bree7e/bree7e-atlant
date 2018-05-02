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

class PartTree {
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
        if (this.lastOperator) this.lastOperator.right = newOperator
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
      return Number(node.data)
    }
    switch (node.data) {
      case '+':
        return left + this.calculate(node.right)
      case '-':
        return left - this.calculate(node.right)
      case '*':
        return left * this.calculate(node.right)
      case '/':
        return left / this.calculate(node.right)
    }    
  }

  result () {
    return this.calculate(this.root)
  }
}
 
let exp = new PartTree({sign: '', fraction: '2'})
exp.addPart({sign: '+', fraction: '3'})
exp.addPart({sign: '+', fraction: '4'})
exp.addPart({sign: '*', fraction: '5'})
exp.addPart({sign: '-', fraction: '7'})
// let exp = new PartTree({sign: '', fraction: '2'})
// exp.addPart({sign: '+', fraction: '2'})
// exp.addPart({sign: '*', fraction: '2'})

console.log(exp.result())
