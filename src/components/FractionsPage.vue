<template>
  <div class="fraction-page">
    <h2>Калькулятор дробей</h2>
    <Expression
     :expressionParts="count"
     />
    <button class="fraction-page__add-button" @click="addFraction()">ADD FRACTION</button>
  </div>
</template>

<script>
import Expression from '@/components/fractions/Expression'

export default {
  components: {
    Expression
  },
  data: function () {
    return {
      count: 2
    }
  },
  methods: {
    addFraction: function () {
      this.count++
      console.log(this.count)
    }
  }
}
</script>

<style lang="scss">
.fraction-page__add-button {
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
