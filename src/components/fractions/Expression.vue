<template>
    <div>
        <div class="expression">
            <ExpressionPart
                v-for="part in expressionParts"
                :key="part.id"
                :part="part"
                @part-change="onPartChange($event)"
            />
            <span class="expression__equal-sign">=</span>
            <Fraction
                :fraction="result"
                :isEditable="false"
            />
        </div>
        <button class="button button--vue" @click="addEmptyFraction()">ADD FRACTION</button>
    </div>
</template>

<script>
import ExpressionPart from '@/components/fractions/ExpressionPart'
import Fraction from '@/components/fractions/Fraction'

export default {
  components: {
    ExpressionPart,
    Fraction
  },
  data: function () {
    return {
      expressionParts: []
    }
  },
  computed: {
    result: function () {
      const partsCount = this.expressionParts.length
      if (partsCount < 2) return null
      let result = this.expressionParts[0]
      // TODO рекурсивно обойти массив expressionParts выполняя действие sign над fraction
      for (let i = 1; i < partsCount; i++) {
        const next = this.expressionParts[i]
        console.log(i, next)
        if ((next.fraction.numerator === '') || (next.fraction.denominator === '')) {
          return { numerator: 0, denominator: 0 }
        }
        result = this.calculate(result, next)
      }
      return result
    },
    partsCount: function () {
      return this.expressionParts.length
    }
  },
  created: function () {
    this.addFraction({
      id: 0,
      sign: '',
      fraction: {
        numerator: 3,
        denominator: 7
      }
    })
    this.addFraction({
      id: 1,
      sign: '+',
      fraction: {
        numerator: 2,
        denominator: 5
      }
    })
  },
  methods: {
    addEmptyFraction: function () {
      var newFraction = {
        id: this.partsCount,
        sign: '+',
        fraction: {
          numerator: '',
          denominator: ''
        }
      }
      this.addFraction(newFraction)
    },
    addFraction: function (fraction) {
      this.expressionParts.push(fraction)
    },
    calculate: (a, b) => {
      let numerator
      let denominator
      switch (b.sign) {
        case '+':
          numerator = (a.fraction.numerator * b.fraction.denominator) + (b.fraction.numerator * a.fraction.denominator)
          denominator = a.fraction.denominator * b.fraction.denominator
          break
        case '-':
          numerator = (a.fraction.numerator * b.fraction.denominator) - (b.fraction.numerator * a.fraction.denominator)
          denominator = a.fraction.denominator * b.fraction.denominator
          break
        case '*':
          numerator = a.fraction.numerator * b.fraction.numerator
          denominator = a.fraction.denominator * b.fraction.denominator
          break
        case '/':
          numerator = a.fraction.numerator * b.fraction.denominator
          denominator = a.fraction.denominator * b.fraction.numerator
          break
      }
      return {
        numerator: numerator,
        denominator: denominator
      }
    },
    simplify: (f) => {
    //   const numerator = a.fraction.numerator * b.fraction.denominator
    //   const denominator = a.fraction.denominator * b.fraction.numerator
      return {
        numerator: 1,
        denominator: 1
      }
    },
    onPartChange: function (part) {
      console.log('part changed', part)
    }
  }
}
</script>

<style lang='scss'>
.expression {
    display: flex;
    flex-wrap: wrap;
    &__equal-sign {
        font-size: 3rem;
        padding-top: 5px;
        margin-left: 1rem;
        margin-right: 1rem;
    }
}

</style>
