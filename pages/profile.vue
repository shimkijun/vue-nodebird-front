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
          <follow-list />
        </v-container>
      </v-card>
    </v-container>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>Followers</v-subheader>
          <follow-list />
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
    methods : {
      onChangeNickname(){
        this.$store.dispatch('users/changeNicname',{
          nickname : this.nickname
        })
        
      }
    },
    head(){
        return {
            title : 'Profile',
        };
    }
}
</script>

<style>
    
</style>