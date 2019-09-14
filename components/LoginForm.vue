<template>
  <v-container v-if="!me">
    <v-card>
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
          <v-btn 
            type="submit" 
            :disabled="!valid"
          >
            Login
          </v-btn>
          <v-btn
            nuxt
            to="/signup"
          >
            SignUp
          </v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-card>
      {{ me.nickname }}로그인 되었습니다.
      <v-btn @click="onLogOut">
        Logout
      </v-btn>
    </v-card>
  </v-container>
</template>
<script>
export default {
    data(){
        return {
            valid : false,
            email : '',
            password : '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
            ]
        }
    },
    computed : {
        me() {
            return this.$store.state.users.me;
        }
    },
    methods : {
        onSubmitForm(){
            if(this.$refs.form.validate()){
               this.$store.dispatch('users/signUp',{
                   email : this.email,
                   nickname : '심기준',
                   password : this.password
               })
               .then(() => {
                   this.$router.push({
                        path : '/',
                    });
               })
               .catch(()=>{
                   alert('회원가입 실패');
               });
               
            }
            
        },
        onLogOut(){
            this.$store.dispatch('users/logOut');
        }
    }
}
</script>
<style >
    
</style>