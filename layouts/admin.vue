<template>
  <div> 
    <v-toolbar>
      <v-toolbar-title>
        <nuxt-link to="/">
          NodeBird
        </nuxt-link>
      </v-toolbar-title>
      <div class="flex-grow-1" />
      <v-toolbar-items> 
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
    <nuxt />
  </div> 
</template>

<script>
export default {
    data(){
        return {
            
        }
    }
}
</script>

<style>
    
</style>