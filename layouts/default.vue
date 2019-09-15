<template>
  <v-app>
    <div>
      <v-toolbar>
        <v-toolbar-title>
          <nuxt-link to="/">
            NodeBird
          </nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items> 
          <v-form @submit.prevent="onSearchHashtag">
            <div :style="{ display : 'flex', height:'100%', alignItems : 'center' }">
              <v-text-field
                v-model="hashtag" 
                hide-details
                label="search" 
                prepend-icon="mdi-magnify"
              />
            </div>
          </v-form>
          <v-btn
            text
            nuxt
            to="/profile"
          >
            profile
          </v-btn>
          <v-btn
            text
            nuxt
            to="/signup"
          >
            signup
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col
            :cols="12"
            :md="4"
          >
            <login-form />
          </v-col>
          <v-col
            :cols="12"
            :md="8"
          >
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app> 
</template>

<script>
import LoginForm from '~/components/LoginForm';
export default {
    components : {
        LoginForm
    },
    data(){
        return {
            hashtag : ''
        }
    },
    methods : {
      onSearchHashtag(){
        this.$router.push({
          path : `/hashtag/${this.hashtag}`,
        });
        this.hashtag = '';
      },
    }
}
</script>

<style scoped>
    a{
        color:inherit;
        text-decoration: none;
    }
</style>