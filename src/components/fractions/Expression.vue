<template>
    <div>
        Выражение 1/2 + 1/4 = 3/4
        <ExpressionPart/>
        <ExpressionPart/>
        <ExpressionPart/>
        <!-- <ExpressionPart
            v-for="epart in expressionParts"
        /> -->
    </div>
</template>

<script>
import ExpressionPart from '@/components/fractions/ExpressionPart'

export default {
  components: {
    ExpressionPart
  }
}</script>
