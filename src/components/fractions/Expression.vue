<template>
    <div class="expression">
        <ExpressionPart
            v-for="i in 3"
            :key="i"
        />
        <span class="expression__equal-sign">=</span>
        <Fraction
          :numerator="rNumerator"
          :denominator="7"
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
  computed: {
    rNumerator: function () {
      return 2 + 2
    },
    rDenominator: function () {
      return 3 + 5
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
</style>
