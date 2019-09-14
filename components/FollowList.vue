<template>
  <v-list-title>
    <v-chip-group>
      <v-chip v-for="user in users" :key="user.id">
        <span>{{ user.nickname }}</span>
        <v-icon @click="remove(user.id)">
          mdi-minus-circle-outline
        </v-icon>
      </v-chip>
    </v-chip-group>
  </v-list-title>
</template>
<script>
export default {
  props : {
    users : {
      type : Array,
      required : true
    },
    remove : {
      type : Function,
      required : true
    }
  }
}
</script>