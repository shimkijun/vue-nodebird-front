export const state = () => ({
    mainPosts : [],
    hasMorePost : true,
    imagePaths : []
});

const totalPosts = 33;
const limit = 10;

export const mutations = {
    
    addMainPost( state,payload ){
       state.mainPosts.unshift(payload);
    },
    removeMainPost( state,payload ){
        const index = state.mainPosts.findIndex( v => v.id === payload.id);
        state.mainPosts.splice(index,1);
    },
    addComment( state,payload ){
        const index = state.mainPosts.findIndex( v => v.id === payload.postId);
        state.mainPosts[index].Comments.unshift(payload);
    },
    loadPosts(state){
        const diff = totalPosts - state.mainPosts.length;
        const fakePosts = Array(diff > limit ? limit : diff ).fill().map( v => ({
            id : Math.random().toString(),
            User :
            {
                id : 1,
                nickname : '제로초',
            },
            content : `Hello infinite sc~ ${Math.random()}`,
            Comments : [],
            Images : [],
        }));
        state.mainPosts = state.mainPosts.concat(fakePosts);
        state.hasMorePost = fakePosts.length === limit;
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
            next(err);
        });
    },
    remove({ commit }, payload){
        commit('removeMainPost' , payload )
    },
    addComment({ commit }, payload){
        commit('addComment' , payload )
    },
    loadPosts({ commit , state}, payload){
        if(state.hasMorePost){
            commit('loadPosts');
        }
    },
    uploadImages({ commit , state}, payload){
        this.$axios.post('http://localhost:3085/post/images',payload,{
            widthCredentials:true,
        })
        .then((res) => {
            commit('concatImagePaths', res.data);
        })
        .catch((err) => {
            console.error(err);

        });
    },
}