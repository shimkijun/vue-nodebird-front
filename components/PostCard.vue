<template>
  <v-container>
    <v-card>
      <v-image />
      <v-card-title>
        <h3>
          <nuxt-link :to="'/user/' + post.id">
            {{ post.User.nickname }}
          </nuxt-link>
        </h3>
      </v-card-title>
      <v-card-text>
        <div>
          {{ post.content }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn icon>
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <v-btn icon @click="onToggleComment">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <div style="background:white">
            <v-btn dark color="red" @click="onRemovePost">
              삭제
            </v-btn>
            <v-btn text @click="onEditPost">
              수정
            </v-btn>
          </div>
        </v-menu>
      </v-card-actions>
    </v-card>
    <template v-if="commentOpend">
      <comment-form :post-id="post.id" />
      <v-list>
        <v-list-item v-for="c in post.Comments" :key="c.id">
          <v-list-item-avatar color="teal">
            <span>{{ c.User.nickname[0] }}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <h3>{{ c.User.nickname }}</h3>
            <div>{{ c.content }}</div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-container>
</template>

<script>
import CommentForm from "~/components/CommentForm";
export default {
  components :{
    CommentForm
  },
  props : {
      post : {
          type : Object,
          required : true
      }
  },
  data(){
    return {
      commentOpend : false
    } 
  },
  methods : {
    onRemovePost(){
      this.$store.dispatch('posts/remove',{
        postId : this.post.id,
      });
    },
    onEditPost(){

    },
    onToggleComment(){
      if(!this.commentOpend){
        this.$store.dispatch('posts/loadComments',{
          postId : this.post.id
        });
      }
      this.commentOpend = !this.commentOpend;
    }
  }
}
</script>

<style>
  a{
    color:inherit;
    text-decoration: none;
  }
</style>