<template>
    <form v-on:submit.prevent="save">   <!-- .prevent prevents the page from reloading -->
      <div class="form-group">
        <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        class="form-input"
        v-model="text"
        >  <!-- $event.target.value means that if the value of newPostText changes, then the textarea changes as well. If the content of the textarea changes, then newPostText will change as well.
        v-bind:value="newPostText"
        @input="newPostText = $event.target.value". This is called as two way binding. We can also use the v-model directive. -->
        </textarea>    <!-- The value held by the textarea is bound to the data property newPostText using v-bind-->
      <!-- The idea here is to update newPostText every time the user types something -->
      <!-- v-on is used to listen to a native or a custom event, We can also use @ instead of v-on -->
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit post</button>
      </div>
    </form>

</template>

<script>
export default {
  props: {
    threadId: {
      required: true
    }
  },

  data () {
    return {
      text: ''
    }
  },

  methods: {
    save () {
      const postId = 'greatPost' + Math.random()   // we are generating an id since newPost does not have an id
      //  threadId and the userId properties are foreign keys that connect the posts with the related resources.
      // since we won't use the post keyword later on, we can use the const keyword to declare it. This means that we cannot assign values to the variable post again but change it's contents.
      const post = {
        text: this.text,
        // Date.now() can be used to get the current timestamp. it returns the timestamp in milliseconds.
        // to get it in seconds, we can divide it by 1000
        // Math.floor returns the largest integer that is less than or equal to the given number
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.threadId,
        userId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2',
        // since we can't use . in the property name, we will have to wrap it in quotes
        '.key': postId
      }
      // to clean up the textarea after the post is submitted
      this.text = ''   // this will be reflected in the textarea since we have bound it using two way binding using v-model
      // here, {post} is a object, which we will be accessing using the object key.
      // we are using a custom event to pass data from the child component to the parent component.
      this.$emit('save', {post})   // this is used to emit a custom event. Here, we are emmitting a save-post event and we are passing the event to the listener.
    }
  }
}
</script>

<style scoped>

</style>