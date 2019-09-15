import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
    mainPosts : [],
    hasMorePost : true,
    imagePaths : [],
});

export const mutations = {
    
    addMainPost( state,payload ){
       state.mainPosts.unshift(payload);
    },
    removeMainPost( state,payload ){
        const index = state.mainPosts.findIndex( v => v.id === payload.postId);
        state.mainPosts.splice(index,1);
    },
    loadComments(state,payload){
        const index = state.mainPosts.findIndex( v => v.id === payload.postId);
        //state.mainPosts[index].Comments = payload.data;
        Vue.set(state.mainPosts[index], 'Comments', payload.data);
    },
    addComment( state,payload ){
        const index = state.mainPosts.findIndex( v => v.id === payload.PostId);
        state.mainPosts[index].Comments.unshift(payload);
    },
    loadPosts(state, payload){
        state.mainPosts = state.mainPosts.concat(payload);
        state.hasMorePost = payload.length === 10;
    }, 
    concatImagePaths(state,payload){
        state.imagePaths = state.imagePaths.concat(payload);
    },
    removeImagePath(state,payload){
        state.imagePaths.splice(payload,1);
    },
    likePost(state,payload){
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts[index].Likers.push({
            id : payload.userId
        })
    },
    unlikePost(state,payload){
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        const userIndex = state.mainPosts.findIndex(v => v.id === payload.userId);
        state.mainPosts[index].Likers.splice(userIndex,1);
    }
};

export const actions = {
    add({ commit , state },payload){
        this.$axios.post('/post',{
            content : payload.content,
            image : state.imagePaths,
        },{
            withCredentials : true,
        })
        .then((res) => {
            commit('addMainPost',res.data);
        })
        .catch((err) => {
            console.error(err);
        });
    },
    remove({ commit }, payload){
        this.$axios.delete(`/post/${payload.postId}`,{
            withCredentials : true,
        })
        .then((res) => {
            commit('removeMainPost' , payload )
        })
        .catch((err) => {
            console.error(err);
        });
    },
    addComment({ commit }, payload){
        this.$axios.post(`/post/${payload.postId}/comment`,{
            content : payload.content
        },{
            withCredentials : true,
        })
        .then((res) => {
            commit('addComment' , res.data );
        })
        .catch((err) => {
            console.error(err);
        })
    },
    loadComments({ commit }, payload){
        this.$axios.get(`/post/${payload.postId}/comments`)
        .then((res) => {
            commit('loadComments',{
                postId: payload.postId,
                data : res.data
            });
        })
        .catch((err) => {
            console.error(err);
        })
    },
    async loadUser({ commit }){
        try {
            const res = await this.$axios.get('/user', {
                withCredentials : true,
            });
            commit('setMe',res.data);
        } catch (err) {
            console.error(err);
        }
    },
    loadPosts : throttle(async function({ commit , state}){
        try { 
            if(state.hasMorePost){ 
                console.log(state);
                const lastPost = state[state.mainPosts.length - 1];
                const res = await this.$axios.get(`/posts?lastId=${lastPost && lastPost.id}&limit=10`);
                console.log(res.data);
                commit('loadPosts',res.data);
                return;
            }
        } catch (err) {
            console.error(err);
        }
    }, 3000),
    uploadImages({ commit }, payload){
        this.$axios.post('/post/images',payload,{
            withCredentials:true,
        })
        .then((res) => {
            commit('concatImagePaths', res.data);
        })
        .catch((err) => {
            console.error(err);
        });
    },
    retweet({ commit }, payload ){
        this.$axios.post(`/post/${payload.postId}/retweet`,{},{
            withCredentials : true,
        })
        .then((res) => {
            commit('addMainPost', res.data);
        })
        .catch((err) => {
            console.error(err);
            alert(err.response.data);
        })
    },
    likePost({ commit }, payload ){
        this.$axios.post(`/post/${payload.postId}/like`,{},{
            withCredentials : true,
        })
        .then((res) => {
            commit('likePost', {
                userId : res.data.userId,
                postId : payload.postId
            });
        })
        .catch((err) => {
            console.error(err);
        })
    },
    unlikePost({ commit }, payload ){
        this.$axios.delete(`/post/${payload.postId}/like`,{
            withCredentials : true,
        })
        .then((res) => {
            commit('unlikePost', {
                userId : res.data.userId,
                postId : payload.postId
            });
        })
        .catch((err) => {
            console.error(err);
        })
    }
}