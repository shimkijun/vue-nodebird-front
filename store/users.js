export const state = () => ({
    me : null,
    followerList : [
        {
            id : 1,
            nickname : '팔로워1',
        },
        {
            id : 2,
            nickname : '팔로워2',
        },
        {
            id : 3,
            nickname : '팔로워3',
        },
        {
            id : 4,
            nickname : '팔로워4',
        },
        {
            id : 5,
            nickname : '팔로워5',
        },
        {
            id : 6,
            nickname : '팔로워6',
        },
        {
            id : 7,
            nickname : '팔로워7',
        },
        {
            id : 8,
            nickname : '팔로워8',
        },
        {
            id : 9,
            nickname : '팔로워9',
        }
    ],
    followingList : [
        {
            id : 1,
            nickname : '팔로윙1',
        },
        {
            id : 2,
            nickname : '팔로윙2',
        },
        {
            id : 3,
            nickname : '팔로윙3',
        }
    ],
});

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
    }
};

export const actions = {
    signUp( { commit } , payload ){
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
    }
}