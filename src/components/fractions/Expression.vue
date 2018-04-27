<template>
    <div class="expression">
        <ExpressionPart
            :key="1"
            :sign="''"
        />
        <ExpressionPart
            v-for="i in n"
            :key="i + 1"
            :sign="'+'"
        />
        <span class="expression__equal-sign">=</span>
        <Fraction
          :numerator="rNumerator"
          :denominator="rDenominator"
        />

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
  props: {
    expressionParts: {
      type: Number
    }
  },
  computed: {
    rNumerator: function () {
      return 2 + 2
    },
    rDenominator: function () {
      return 3 + 5
    },
    n: function () {
      return this.expressionParts - 1
    }
  }
//   data: function () {
//     return {
//       n: this.expressionParts
//     }
//   }
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
</style>
