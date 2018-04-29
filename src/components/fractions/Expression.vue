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
                :fraction="result.fraction"
                :isEditable="false"
            />
        </div>
        <button class="button button--vue" @click="addEmptyPart()">ADD FRACTION</button>
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
        if ((next.fraction.numerator === '') || (next.fraction.denominator === '')) {
          return { numerator: 0, denominator: 0 }
        }
        result = this.calculateParts(result, next)
      }
      result.fraction = this.simplify(result.fraction)
      return result
    }
  },
  created: function () {
    this.addPart({
      sign: '',
      fraction: {
        numerator: 3,
        denominator: 7
      }
    })
    this.addPart({
      sign: '+',
      fraction: {
        numerator: 2,
        denominator: 5
      }
    })
    this.addPart({
      sign: '-',
      fraction: {
        numerator: 4,
        denominator: 35
      }
    })
  },
  methods: {
    addEmptyPart: function () {
      var emptyFraction = {
        sign: '+',
        fraction: {
          numerator: '',
          denominator: ''
        }
      }
      this.addPart(emptyFraction)
    },
    addPart: function (part) {
      part.id = this.expressionParts.length
      // console.log('on add part', part)
      this.expressionParts.push(part)
    },
    calculateParts: function (a, b) {
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
        sign: a.sign,
        fraction: {
          numerator: numerator,
          denominator: denominator
        }
      }
    },
    getPrimeNumbers: (max) => { // через сито
      let i
      let j
      let sieve = []
      let result = []
      for (i = 2; i <= max; ++i) {
        if (!sieve[i]) {
          // i has not been marked -- it is prime
          result.push(i)
          for (j = i << 1; j <= max; j += i) {
            sieve[j] = true
          }
        }
      }
      return result
    },
    euclidSearch: function (a, b) {
      if (b === 0) {
        return a
      } else {
        return this.euclidSearch(b, a % b)
      }
    },
    simplify: function (f) {
      const divider = this.euclidSearch(f.numerator, f.denominator)
      return {
        numerator: f.numerator / divider,
        denominator: f.denominator / divider
      }
    },
    onPartChange: function (partToChange) {
      const p = this.expressionParts.find(part => part.id === partToChange.id)
      p.fraction = partToChange.fraction
      p.sign = partToChange.sign
      console.log('part changed', partToChange)
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
