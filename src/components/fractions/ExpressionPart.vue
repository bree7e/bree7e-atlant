<template>
    <div>
        ЗНАК (+)
        <Fraction/>
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
  }
}
</script>
