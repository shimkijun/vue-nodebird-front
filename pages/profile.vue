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
        </v-container>
      </v-card>
    </v-container>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>Followers</v-subheader>
          <follow-list :users="followerList" :remove="removeFollower" />
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
      }
    },
    methods : {
      onChangeNickname(){
        this.$store.dispatch('users/changeNicname',{
          nickname : this.nickname
        })
        
      },
      removeFollowing(id){
        this.$store.dispatch('users/removeFollowing',{id})
      },
      removeFollower(id){
        this.$store.dispatch('users/removeFollower',{id})
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