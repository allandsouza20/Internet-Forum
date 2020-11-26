<template>
  <div class="forum-list">
    <h2 class="list-title">
      <router-link :to="{name: 'Category', params: {id: category['.key']}}">
        {{ category.name }}
      </router-link>
    </h2>

    <ForumList v-bind:forums="categoryForums" />
  </div>
</template>

<script>
import ForumList from './ForumList'
import sourceData from '@/data'

export default {
  components: {
    ForumList
  },

  props: {
    category: {
      required: true,
      type: Object
    }
  },

  computed: {
    // this computed property will find the forums of a category in sourceData and returns them in an Array
    categoryForums () {
      return Object.values(sourceData.forums).filter(forum => forum.categoryId === this.category['.key'])
    }
  }
}
</script>

<style scoped>

</style>