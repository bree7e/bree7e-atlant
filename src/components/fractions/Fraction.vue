<template>
    <div class="fraction">
        <div class="fraction__numerator">
            <input
                class="fraction__numerator-field"
                type="number"
                :value="fraction.numerator"
                @input="onNumeratorChange($event.target.value)"
                :disabled="!isEditable"
                >
        </div>
        <div class="fraction__denominator">
            <input
                class="fraction__denominator-field"
                type="number"
                :value="fraction.denominator"
                @input="onDenominatorChange($event.target.value)"
                :disabled="!isEditable"
                >
        </div>
    </div>
</template>

<script>
export default {
  props: {
    fraction: {
      type: Object,
      required: true
    },
    isEditable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onNumeratorChange: function (newValue) {
      const newFraction = {
        numerator: Number(newValue),
        denominator: this.fraction.denominator
      }
      this.$emit('fraction-change', newFraction)
    },
    onDenominatorChange: function (newValue) {
      const newFraction = {
        numerator: this.fraction.numerator,
        denominator: Number(newValue)
      }
      this.$emit('fraction-change', newFraction)
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.fraction {
  display: inline;
  &__numerator {
    padding-bottom: 0.5rem;
    border-bottom: 2px solid;
    width: 3.5rem;
    &-field {
      @include control();
      width: 100%;
    }
  }
  &__denominator {
    padding-top: 0.5rem;
    width: 3.5rem;
    &-field {
      @include control();
      width: 100%;
    }
  }
}
</style>
