<template>
    <div class="expression-part">
      <div class="expression-part__main"
        v-bind:class="{ 'expression-part__main--error': hasError() }">
        <select class="expression-part__sign"
          :value="part.sign"
          @change="onSignChange($event.target.value)"
          v-if="showSign()">
          <option>+</option>
          <option>-</option>
          <option>*</option>
          <option>/</option>
        </select>
        <Fraction
          :fraction="part.fraction"
          @fraction-change="onFractionChange($event)"
        />
      </div>
      <ul class="expression-part__error-list" v-show="hasError">
        <li
          class="expression-part__error"
          v-for="(error, index) in errors"
          :key="index"
        >{{ error }}</li>
      </ul>
    </div>
</template>

<script>
import Fraction from '@/components/fractions/Fraction'

export default {
  components: {
    Fraction
  },
  props: {
    part: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      errors: []
    }
  },
  methods: {
    showSign: function () {
      if (['+', '-', '*', '/'].indexOf(this.part.sign) > -1) return true
    },
    onFractionChange: function (newFraction) {
      var newPart = {
        id: this.part.id,
        sign: this.part.sign,
        fraction: newFraction
      }
      this.$emit('part-change', newPart)
    },
    onSignChange: function (newSign) {
      var newPart = {
        id: this.part.id,
        sign: newSign,
        fraction: this.part.fraction
      }
      this.$emit('part-change', newPart)
    },
    check: function () {
      this.errors = []
      if (this.part.fraction.numerator === '') {
        this.errors.push('Введите числитель')
      }
      if (this.part.fraction.denominator === '') {
        this.errors.push('Введите знаменатель')
      }
      if ((this.part.fraction.denominator === 0) ||
        ((this.part.sign === '/') && (this.part.fraction.numerator === 0))) {
        this.errors.push('Делить на 0 нельзя')
      }
    },
    hasError: function () {
      return this.errors.length
    }
  },
  watch: {
    part: {
      handler: function (newPart, oldPart) {
        this.check()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
@mixin control() {
  display: block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  box-sizing: border-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.expression-part {
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
  &__main {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    &--error {
      border: 2px solid #f7654e;
      border-radius: 5px;
    }
  }
  &__sign {
    @include control();
    margin-right: 1rem;
    width: 3.5rem;
  }
  &__error-list {
    list-style-type: none;
    padding: 5px;
    color: #f7654e;
    font-size: 0.75rem;
  }
}
</style>
