<template>
    <div class="expression-part">
        <select class="expression-part__sign" v-model="selected">
          <option>+</option>
          <option>-</option>
          <option>*</option>
          <option>/</option>
        </select>
        <Fraction
          :numerator="1"
          :denominator="2"
        />
        <!-- Компонент дроби. Состои из знака и Fraction.
        Если слева, то имеет dropbown с +/*-
        Если справа, то span c = -->
    </div>
</template>

<script>
import Fraction from '@/components/fractions/Fraction'

export default {
  components: {
    Fraction
  },
  props: {
    sign: {
      type: String,
      required: true,
      default: function () {
        return '+'
      }
    }
  },
  methods: {
    inLeftPart: function () {
      if (this.sign in ['+', '-', '*', '/']) return true
    }
  },
  data: function () {
    return {
      selected: this.sign
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
  &__sign {
    @include control();
    margin: 1rem;
    width: 3.5rem;
  }
}
</style>
