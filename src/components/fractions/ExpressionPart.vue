<template>
    <div class="expression-part">
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
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  &__sign {
    @include control();
    margin: 1rem;
    width: 3.5rem;
  }
}
</style>
