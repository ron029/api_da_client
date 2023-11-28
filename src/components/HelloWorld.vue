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
    <input type="text" v-model="inputTextBirthDate" placeholder="Enter date of birth" />
    <p v-if="name">Name: {{ name }}</p>
    <p v-if="birthDate">{{ birthDate }}</p>
    <button @click="fetchData">Fetch Data</button>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
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

const configToken = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      data: '',
      inputTextname: '',
      inputTextBirthDate: ''
    }
  },
  methods: {
    getToken() {
      axios.post('https://my-nodejs-app-iyjd.onrender.com/api/v1/token', dataToken, configToken)
        .then(response => {
          this.data = response.data;
          console.log('Data', this.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    fetchData() {
      this.name = this.inputTextname;
      this.birthDate = this.inputTextBirthDate;

      dataSearch.name = this.inputTextname;
      dataSearch.birthDate = this.inputTextBirthDate;
      const configSearch = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.data.access_token
        }
      };
      axios.post('https://my-nodejs-app-iyjd.onrender.com/api/v1/search', dataSearch, configSearch)
        .then(response => {
          this.data = response.data;
          console.log('Data', this.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
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
