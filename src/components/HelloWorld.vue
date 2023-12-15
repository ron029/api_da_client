<template>
  <div class="hello">
    <h1>Get Token</h1>
    <button @click="getToken">Get token</button>
    <div v-if="data">
      <h2>Data:</h2>
      <pre>{{ data }}</pre>
    </div>
    <h1>Fetch Data</h1>
    <input type="text" v-model="inputTextname" placeholder="Enter name" />
    <input type="text" v-model="inputTextBirthDate" placeholder="Enter date of birthdate" />
    <p v-if="name">Name: {{ name }}</p>
    <p v-if="birthDate">Birthdate: {{ birthDate }}</p>
    <button @click="fetchData">Fetch Data</button>
    <p v-if="data_result">Search Result: {{ data_result }}</p>
  </div>
</template>

<script>
import axios from 'axios';

const dataToken = new URLSearchParams();
dataToken.append('client_id', '1234-ABDE');
dataToken.append('scope', 'onlc:read');
dataToken.append('grant_type', 'clients_credentials');
dataToken.append('client_secret', 'super_secret_key');

const dataSearch = {
  name: "",
  dob: "",
  nric: ""
}

const baseURL = 'https://api01.hmi.com.ph';
const configToken = {
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

export default {
  name: 'HelloWorld',
  data() {
    return {
      data: '',
      name: '',
      birthDate: '',
      inputTextname: 'John Doe',
      inputTextBirthDate: '1990-05-15',
      data_result: '',
      result: 0,
    }
  },
  methods: {
    async getToken() {
    try {
      const response = await axios.post('/api/v1/generateToken', dataToken, configToken);
      this.data = response.data;
      console.log('Data:', this.data);
      return this.data; // Returning the data in case you need to use it elsewhere
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Throwing the error for further handling if needed
    }
  },
    async fetchData() {
      this.name = this.inputTextname;
      this.birthDate = this.inputTextBirthDate;

      dataSearch.name = this.inputTextname;
      dataSearch.dob = this.inputTextBirthDate;

      /*
      const configSearch = {
        baseURL: baseURL,
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + this.data.access_token
        }
      };
      */

      fetch('https://api01.hmi.com.ph/api/v1/member', {
        method: 'POST',
        // Add your headers and body as needed
      })
      .then(response => {
        if (response.ok) {
          // Handle successful response (status 200-299)
          return response.json(); // Process the data
        } else if (response.status === 404) {
          // Handle 404 specifically for no results found
          // Maybe display a message to the user indicating no matching records were found
          console.log('No matching records found');
        } else {
          // Handle other error scenarios
          throw new Error('Error: ' + response.status);
        }
      })
      .catch(error => {
        // Handle network errors or other exceptions here
        console.error('Fetch Error:', error);
      });
    }
  },
}
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
