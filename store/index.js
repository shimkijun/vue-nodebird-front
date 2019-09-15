export const state = () => ({
   
});

export const mutations = {

};

export const actions = {
    async nuxtServerInit({ dispatch } ){
        return dispatch('users/loadUser');
    }
}