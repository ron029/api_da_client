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
    <p v-if="result">Search Result: {{ data_result }}</p>
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
const baseURL = 'https://i-scan.hmi.com.ph';
const configToken = {
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
      inputTextname: 'josefina rufino',
      inputTextBirthDate: '',
      data_result: '',
      result: 0,
    }
  },
  methods: {
    async getToken() {
      try {
        const response = await axios.post(baseURL + '/api03/da/generateToken', dataToken, configToken);
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

      dataSearch.name = this.inputTextname,
      dataSearch.dob = this.inputTextBirthDate

      const axiosConfig  = {
        headers:  {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': 'Bearer ' + this.data.access_token
        },
        validateStatus: function (status) {
          return status >= 200 && status < 400
        }
      };
      const url = 'https://i-scan.hmi.com.ph/api03/da/member';
      await axios.post(url, dataSearch, axiosConfig)
        .then(data => {
          this.data_result = data;
          if (this.data_result.length === 0) {
            this.result = 1;
          }
          console.log('Data:', this.data_result);
        })
        .catch(error => {
          // Handle the error here
          if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('Request made but no response received:', error.request);
          } else {
            // Something happened in setting up the request that triggered an error
            console.error('Error:', error.message);
          }
          console.error('Error config:', error.config);
        });
    }
  }
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