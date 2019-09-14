<template>
  <div>
    <post-form v-if="me" />
    <div>
      <post-card v-for="p in mainPosts" :key="p.id" :post="p" />
    </div>
  </div>
</template>
<script>
import PostCard from '~/components/PostCard';
import PostForm from '~/components/PostForm';
export default {
    components : {
        PostCard,
        PostForm
    },
    data(){
        return{
            name : 'Nuxt.js'
        }
    },
    computed : {
        me(){
            return this.$store.state.users.me;
        },
        mainPosts(){
            return this.$store.state.posts.mainPosts;
        }
    }
}
</script>

<style>
    
</style>