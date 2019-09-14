<template>
  <v-card>
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-textarea 
          v-model="content"
          outlined
          auto-grow
          clearable
          label="무엇을 작성할까요?"
          :hide-details="hideDetails"
          :success-messages="successMessages"
          :success="success"
          :rules="[v => !!v.trim() || '내용을 입력하세요.']"
          @input="onChangeTextarea"
        />
        <v-btn type="submit" absolute right>
          짹짹
        </v-btn>
        <input ref="imageInput" type="file" multiple hidden @change="onChangeImages">
        <v-btn @click="onClickImageUpload" type="button">이미지 업로드</v-btn>
        <div>
          <div v-for="(p,i) in imagePaths" :key="p" style="display:inline-block">
            <img :src="`http://localhost:3085/${p}`" :alt="p" style="width:200px;">
            <div>
              <v-btn @click="onRemoveImage(i)" type="button">제거</v-btn>
            </div>
          </div>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data(){
        return {
            valid : false,
            hideDetails : true,
            success : false,
            successMessages : '',
            content : ''
        }
    },
    computed : {
        ...mapState( 'users' , ['me'] ),
        ...mapState( 'posts' , ['imagePaths'] ),
    },
    methods : {
        onChangeTextarea(value){
          if(value.length){
            this.hideDetails = true;
            this.success = false;
            this.successMessages = '';
          }
        },
        onSubmitForm(){
            if(this.$refs.form.validate()){
                this.$store.dispatch('posts/add' ,{
                    content : this.content,
                })
                .then(() => {
                    this.content = '';
                    this.hideDetails = false;
                    this.success = true;
                    this.successMessages = '게시글 등록 성공';
                })
                .catch(() => {

                });
            }
        },
        onClickImageUpload(){
          this.$refs.imageInput.click();
        },
        onChangeImages(e){
          const imageFormData = new FormData();
          [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image',f);
          });
          this.$store.dispatch('posts/uploadImages' , imageFormData);
        },
        onRemoveImage(index){
          this.$store.commit('posts/removeImagePath',index);
        }
    }
}
</script>