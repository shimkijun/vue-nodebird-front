import Vue from 'vue';

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
    }
};

export const actions = {
    add({ commit },payload){
        this.$axios.post('http://localhost:3085/post',{
            content : payload.content,
            imagePaths : state.imagePaths,
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
        this.$axios.delete(`http://localhost:3085/post/${payload.postId}`,{
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
        console.log(payload);
        this.$axios.post(`http://localhost:3085/post/${payload.postId}/comment`,{
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
        this.$axios.get(`http://localhost:3085/post/${payload.postId}/comments`)
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
    async loadUser({ state, commit }){
        try {
            const res = await this.$axios.get('http://localhost:3085/user', {
                withCredentials : true,
            });
            commit('setMe',res.data);
        } catch (err) {
            console.error(err);
        }
    },
    async loadPosts({ commit , state}){
        try {
            if(state.hasMorePost){
                const res = await this.$axios.get(`http://localhost:3085/posts?offset=${state.mainPosts.length}&limit=10`)
                commit('loadPosts',res.data);
            }
        } catch (err) {
            console.error(err);
        }
    },
    uploadImages({ commit , state}, payload){
        this.$axios.post('http://localhost:3085/post/images',payload,{
            withCredentials:true,
        })
        .then((res) => {
            commit('concatImagePaths', res.data);
        })
        .catch((err) => {
            console.error(err);

        });
    },
}