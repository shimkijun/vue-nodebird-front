export const state = () => ({
    me : null,
    followerList : [],
    followingList : [],
    hasMoreFollower : true,
    hasMoreFollowing : true,
});

const totalFollowers = 10;
const totalFollowings = 8;
const limit = 3;

export const mutations = {
    setMe( state,payload ){
        state.me = payload;
    },
    changeNicname(state,payload){
        state.me.nickname = payload.nickname;
    },
    addFollowing(state,payload){
        state.followingList.push(payload);
    },
    addFollower(state,payload){
        state.followerList.push(payload);
    },
    removeFollowing(state,payload){
       const index = state.followingList.findIndex( v => v.id === payload.id);
       state.followingList.splice(index,1);
    },  
    removeFollower(state,payload){
        const index = state.followerList.findIndex( v => v.id === payload.id);
        state.followerList.splice(index,1);
    },
    loadFollowings( state ){
        const diff = totalFollowings - state.followingList.length;
        const fakeUsers = Array( diff > limit ? limit : diff).fill().map( v => ({
            id : Math.random().toString(),
            nickname : Math.floor(Math.random() * 1000),
        }));
        state.followingList = state.followingList.concat(fakeUsers);
        state.hasMoreFollowing = fakeUsers.length === limit;
    },
    loadFollowers( state ){
        const diff = totalFollowers - state.followerList.length;
        const fakeUsers = Array(diff > limit ? limit : diff).fill().map( v => ({
            id : Math.random().toString(),
            nickname : Math.floor(Math.random() * 1000),
        }));
        state.followerList = state.followerList.concat(fakeUsers);
        state.hasMoreFollower = fakeUsers.length === limit;
    }
};

export const actions = {
    signUp( { commit } , payload ){
        this.$axios.post('http://localhost:3085/user', {
            email: payload.email,
            nickname : payload.nickname,
            password : payload.password
        });
        commit( 'setMe', payload );
    },
    logIn( { commit } , payload ){
        commit( 'setMe', payload );
    },
    logOut( { commit } , payload ){
        commit( 'setMe', null );    
    },
    changeNicname( { commit } , payload ){
        commit('changeNicname',payload);
    },
    addFollowing( { commit } , payload ){
        commit('addFollowing',payload);
    },
    addFollower( { commit } , payload ){
        commit('addFollower',payload);
    },
    removeFollowing( { commit } , payload ){
        commit('removeFollowing',payload);
    },
    removeFollower( { commit } , payload ){
        commit('removeFollower',payload);
    },
    loadFollowers( { commit, state } , payload ){
        if(state.hasMoreFollower){
            commit('loadFollowers',payload);
        }
    },
    loadFollowings( { commit, state } , payload ){
        if(state.hasMoreFollowing){
            commit('loadFollowings',payload);
        }
    },
}