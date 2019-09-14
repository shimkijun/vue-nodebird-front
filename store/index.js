export const state = () => ({
   
});

export const mutations = {

};

export const actions = {
    nuxtServerInit({ commit , dispatch }){
        return dispatch('users/loadUser');
    }
}