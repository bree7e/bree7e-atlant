<template>
    <div>
        <div class="expression">
            <ExpressionPart
                v-for="part in expressionParts"
                :key="part.id"
                :part="part"
            />
            <span class="expression__equal-sign">=</span>
            <Fraction
            :numerator="result.numerator"
            :denominator="result.denominator"
            />
        </div>
        <button class="add-button" @click="addEmptyFraction()">ADD FRACTION</button>
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
        id: this.partCount,
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
    }
  }
}
</script>

<style lang="scss">
.expression {
    display: flex;
    &__equal-sign {
        font-size: 3rem;
        padding-top: 5px;
        margin-left: 1rem;
        margin-right: 1rem;
    }
}
.add-button {
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    margin-top: 1rem;
    padding: 0.175rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    color: #fff;
    background-color: #42b983;
    border-color: #42b983;
}
</style>
