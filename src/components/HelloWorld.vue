<template>
  <div class="hello">
    <h1>Get Token</h1>
    <button @click="getToken">Get token</button>
    <div v-if="token">
      <h2>Access Token:</h2>
      <pre>{{ token }}</pre>
    </div>
    <h1>Fetch Data</h1>
    <input type="text" v-model="inputTextname" placeholder="Enter name" />
    <input type="text" v-model="inputTextBirthDate" placeholder="Enter date of birth" />
    <p v-if="name">Name: {{ name }}</p>
    <p v-if="birthDate">Birthdate: {{ birthDate }}</p>
    <button @click="fetchData">Fetch Data</button>
    <p v-if="result === 1">No data found.</p>
    <div v-else-if="data_result">
      <h2>Data Result:</h2>
      <pre>{{ data_result }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      token: '',
      name: '',
      birthDate: '',
      inputTextname: 'John Doe',
      inputTextBirthDate: '1990-05-15',
      data_result: null,
      result: 0,
    };
  },
  methods: {
    async getToken() {
      try {
        const response = await axios.post('/api03/da/generateToken');
        this.token = response.data.access_token;
      } catch (error) {
        console.error('Error fetching token:', error);
        // Handle error if needed
      }
    },
    async fetchData() {
      try {
        const dataSearch = {
          name: this.inputTextname,
          dob: this.inputTextBirthDate,
        };

        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token,
        };

        const requestOptions = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(dataSearch),
        };

        const response = await fetch('/api03/da/member', requestOptions);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('No data found');
          }
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        this.data_result = data;

        if (this.data_result.length === 0) {
          this.result = 1;
        } else {
          this.result = 0;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.message === 'No data found') {
          alert('No data found. Please try a different search.');
        }
        // Handle other errors if needed
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
