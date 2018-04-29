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
      let resultDenominator = 0
      let resultNumerator = 0
      for (const part of this.expressionParts) {
        resultNumerator += Number(part.fraction.numerator)
        resultDenominator += Number(part.fraction.denominator)
      }
      return {
        numerator: resultNumerator,
        denominator: resultDenominator
      }
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
        numerator: 1,
        denominator: 5
      }
    })
    this.addFraction({
      id: 1,
      sign: '+',
      fraction: {
        numerator: 3,
        denominator: 4
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
    add: (a, b) => {
      const numerator = (a.numerator * b.denominator) + (b.numerator * a.denominator)
      const denominator = a.denominator * b.denominator
      return {
        numerator: numerator,
        denominator: denominator
      }
    },
    subtract: (a, b) => {
      const numerator = (a.numerator * b.denominator) - (b.numerator * a.denominator)
      const denominator = a.denominator * b.denominator
      return {
        numerator: numerator,
        denominator: denominator
      }
    },
    multiply: (a, b) => {
      const numerator = a.numerator * b.numerator
      const denominator = a.denominator * b.denominator
      return {
        numerator: numerator,
        denominator: denominator
      }
    },
    divide: (a, b) => {
      const numerator = a.numerator * b.denominator
      const denominator = a.denominator * b.numerator
      return {
        numerator: numerator,
        denominator: denominator
      }
    },
    simplify: (f) => {
    //   const numerator = a.numerator * b.denominator
    //   const denominator = a.denominator * b.numerator
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

<style lang="scss">
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
