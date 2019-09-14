<template>
  <div>
    <v-container>
      <v-card>
        <v-subheader>
          Sign-Up
        </v-subheader>
        <v-container>
          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="onSubmitForm"
          >
            <v-text-field
              v-model="email"
              label="E-mail"
              :rules="emailRules"
              required
            />
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :rules="passwordRules"
              required
            />
            <v-text-field
              v-model="passwordCheck"
              label="Confirm Password"
              type="password"
              :rules="passwordCheckRules"
              required
            />
            <v-text-field
              v-model="nickname"
              label="Nickname"
              :rules="nicknameCheckRules"
              required
            />
            <v-checkbox 
              v-model="terms"
              label="agree"
              :rules="[ v=> !!v || 'You must agree to the terms']"
              required
            />
            <v-btn type="submit">
              submit
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
    data(){
        return{
            valid : false,
            email : '',
            password : '',
            passwordCheck : '',
            nickname : '',
            terms : false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
            ],
            passwordCheckRules: [
                v => !!v || 'PasswordCheck is required',
                v => v === this.password || 'Passwords do not match'
            ],
            nicknameCheckRules: [
                v => !!v || 'Nickname is required',
            ],
        }
    },
    methods : {
        onSubmitForm(){
            if(this.$refs.form.validate()){
               this.$store.dispatch('users/signUp',{
                   email : this.email,
                   nickname : this.nickname,
                   password : this.password
               })
            }
        }
    },
    head(){
        return {
            title : 'Sign-Up',
        };
    }
}
</script>

<style>
    
</style>