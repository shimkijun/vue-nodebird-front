<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>my profile</v-subheader>
          <v-form v-model="valid" @submit.prevent="onChangeNickname">
            <v-text-field 
              v-model="nickname"
              label="Nickname"
              :rules="nicknameRules"
              required
            />
            <v-btn type="submint">
              submit
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>Following</v-subheader>
          <follow-list :users="followingList" :remove="removeFollowing" />
          <v-btn v-if="hasMoreFollowing" style="width:100%" @click="loadMoreFollowings">
            더보기
          </v-btn>
        </v-container>
      </v-card>
    </v-container>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>Followers</v-subheader>
          <follow-list :users="followerList" :remove="removeFollower" />
          <v-btn v-if="hasMoreFollower" style="width:100%" @click="loadMoreFollowers">
            더보기
          </v-btn>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import FollowList from '~/components/FollowList';
export default {
    components : {
        FollowList
    },
    data(){
        return{
            valid : false,
            nickname : '',
            nicknameRules : [
              v => !!v || '닉네임을 입력하세요'
            ]
        }
    },
    computed : {
      followerList(){
        return this.$store.state.users.followerList;
      },
      followingList(){
        return this.$store.state.users.followingList;
      },
      hasMoreFollowing(){
        return this.$store.state.users.hasMoreFollowing;
      },
      hasMoreFollower(){
        return this.$store.state.users.hasMoreFollower;
      }
    },
    fetch({ store }){
      store.dispatch('users/loadFollowers');
      return store.dispatch('users/loadFollowings');
    },
    methods : {
      onChangeNickname(){
        this.$store.dispatch('users/changeNicname',{
          nickname : this.nickname
        })
        
      },
      removeFollowing(userId){
        this.$store.dispatch('users/unfollow',{userId});
      },
      removeFollower(userId){
        this.$store.dispatch('users/removeFollower',{userId});
      },
      loadMoreFollowers(){
        this.$store.dispatch('users/loadFollowers');
      },
      loadMoreFollowings(){
        this.$store.dispatch('users/loadFollowings');
      }
    },
    head(){
        return {
            title : 'Profile',
        };
    },
    middleware : 'authenticated',
}
</script>

<style>
    
</style>