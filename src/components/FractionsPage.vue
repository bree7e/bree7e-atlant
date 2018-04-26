<template>
  <div>
    <h2>Калькулятор дробей</h2>
    <Expression/>
    <button>ADD FRACTION</button>
  </div>
</template>

<script>
import Expression from '@/components/fractions/Expression'

export default {
  components: {
    Expression
  }
}
</script>
