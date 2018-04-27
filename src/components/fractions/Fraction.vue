<template>
    <div class="fraction">
        <div class="fraction__numerator">
            <input
                class="fraction__numerator-field"
                type="number"
                :value="numerator"
                >
        </div>
        <div class="fraction__denominator">
            <input
                class="fraction__denominator-field"
                type="number"
                :value="denominator"
                >
        </div>
    </div>
</template>

<script>
export default {
  props: {
    numerator: Number,
    denominator: Number,
    isEditable: Boolean
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
    border-bottom: 3px solid;
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
