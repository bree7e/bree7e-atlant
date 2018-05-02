<template>
    <div id="app">
        <h1>{{ msg }}</h1>
        <nav class="navigation">
            <ul class="navigation__list">
                <li class="navigation__item">
                    <router-link to="/">Главная</router-link>
                </li>
                <li class="navigation__item">
                    <router-link to="/fractions">Дроби</router-link>
                </li>
                <li class="navigation__item">
                    <router-link to="/comments">Комментарии</router-link>
                </li>
            </ul>
        </nav>
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to My Vue.js App'
    }
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px;
  max-width: 800px;
}
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fff;
}
.navigation {
  &__list {
    list-style-type: none;
    padding: 0;
  }
  &__item {
    display: inline-block;
    margin: 0 10px;
    a {
      color: #42b983;
    }
  }
}

.button {
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.175rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  &--small {
    font-size: 0.7rem;
  }
  &--vue {
    color: #fff;
    background-color: #42b983;
    border-color: #42b983;
  }
  &--pending {
    color: #ddd;
  }
}

</style>
