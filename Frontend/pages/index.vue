<template>
<div id="app">
    <form>
    <div v-if="step === 1">
      <h1>Step One</h1>
      <p>
      <legend for="name">Your Name:</legend>
      <input id="name" name="name" v-model="registration.name">
      </p>
      <p>
      <legend for="email">Your Email:</legend>
      <input id="email" name="email" type="email" v-model="registration.email">
      </p>
      <button @click.prevent="next()">Next</button>
    </div>
    <div v-if="step === 2">
      <h1>Step Two</h1>
      <p>
      <legend for="street">Your Street:</legend>
      <input id="street" name="street" v-model="registration.street">
      </p>
      <p>
      <legend for="city">Your City:</legend>
      <input id="city" name="city" v-model="registration.city">
      </p>
      <p>
      <legend for="state">Your State:</legend>
      <input id="state" name="state" v-model="registration.state">
      </p>
      <button @click.prevent="prev()">Previous</button>
      <button @click.prevent="next()">Next</button>
    </div>
        <div v-if="step === 3">
      <h1>Step Three</h1>
      <p>
      <legend for="title">Article Title:</legend>
      <input id="title" name="title" v-model="registration.title">
      </p>
      <button @click.prevent="prev()">Previous</button>
      <button @click.prevent="next()">Next</button>
    </div>
    <div v-if="step === 4">
      <h1>Step Four</h1>
      <p>
      <p>
      <legend for="body">Article Body:</legend>
      <input id="body" name="body" v-model="registration.body">
      </p>
      <legend for="numtickets">Number of Tickets:</legend>
      <input id="numtickets" name="numtickets" type="number" v-model="registration.numtickets">
      </p>
      <p>
      <legend for="shirtsize">Shirt Size:</legend>
      <select id="shirtsize" name="shirtsize" v-model="registration.shirtsize">
        <option value="S">Small</option>
        <option value="M">Medium</option>
        <option value="L">Large</option>
        <option value="XL">X-Large</option>
      </select>
      </p>
      <button @click.prevent="prev()">Previous</button>
      <button @click.prevent="submit()">Save</button>
    </div>
    </form>
    <br/><br/>Debug: {{registration}}
  </div>
</template>
<script>

</script>
<script>
export default {
  el: '#app',
  data () {
    return {
      step: 1,
      registration: {
        // name: null,
        // email: null,
        // street: null,
        // city: null,
        // state: null,
        title: "null",
        body: "null",
        // numtickets: 0,
        // shirtsize: 'XL'
      }
    }
  },
  methods: {
    prev () {
      this.step--
    },
    next () {
      this.step++
    },
    async submit () {
      // const res = await this.$store.dispatch('postIncidents')
      // console.log(res)
      // this.incidents = res.data.data.incidents
      this.$axios.post('/articles', this.registration)
        .then(function( response ){
          console.log(response)
        }.bind(this));
    }
  }
}
</script>
