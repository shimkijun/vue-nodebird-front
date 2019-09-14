export const state = () => ({
    me : null,
});

export const mutations = {
    setMe( state,payload ){
        state.me = payload;
    },
    changeNicname(state,payload){
        state.me.nickname = payload.nickname;
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
    }
}