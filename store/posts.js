export const state = () => ({
    mainPosts : [],
    hasMorePost : true,
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
};

export const actions = {
    add({ commit },payload){
        commit('addMainPost',payload);
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
}