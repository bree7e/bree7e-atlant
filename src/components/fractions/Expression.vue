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
      <div class="expression__result">
        <Fraction
          :fraction="result.fraction"
          :isEditable="false"
        />
      </div>
    </div>
    <button class="button button--vue" @click="addEmptyPart()">ADD FRACTION</button>
  </div>
</template>

<script>
import ExpressionPart from '@/components/fractions/ExpressionPart'
import Fraction from '@/components/fractions/Fraction'
import PartTree from '@/tree'

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
      const xFraction = { sign: '', fraction: { numerator: null, denominator: null } }
      const partsCount = this.expressionParts.length
      if (partsCount < 2) return xFraction

      // нет пустых дробей
      for (let i = 0; i < partsCount; i++) {
        const part = this.expressionParts[i]
        if ((part.fraction.numerator === '') || (part.fraction.denominator === '')) {
          return xFraction
        }
      }

      let expressionTree = new PartTree(this.expressionParts[0])
      for (let i = 1; i < partsCount; i++) {
        const part = this.expressionParts[i]
        expressionTree.addPart(part)
      }

      const result = {
        sign: '',
        fraction: expressionTree.result()
      }
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
  },
  methods: {
    addEmptyPart: function () {
      var emptyPart = {
        sign: '+',
        fraction: {
          numerator: '',
          denominator: ''
        }
      }
      this.addPart(emptyPart)
    },
    addPart: function (part) {
      part.id = this.expressionParts.length
      // console.log('on add part', part)
      this.expressionParts.push(part)
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
    onPartChange: function (partToChange) {
      const p = this.expressionParts.find(part => part.id === partToChange.id)
      p.fraction = partToChange.fraction
      p.sign = partToChange.sign
      // console.log('part changed', partToChange)
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
    padding-top: 12px;
    margin-left: 0.5rem;
    margin-right: 1rem;
  }
  &__result {
    padding: 0.5rem;
  }
}
</style>
