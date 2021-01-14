<template>
    <form v-on:submit.prevent="save">   <!-- .prevent prevents the page from reloading -->
      <div class="form-group">
        <textarea
        name=""
        id=""
        cols="80"
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
        <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
        <button class="btn-blue">{{isUpdate ? 'Update' : 'Submit post'}}</button>
      </div>
    </form>

</template>

<script>
export default {
  props: {
    threadId: {
      // since we only need the threadId when we create a post
      required: false
    },

    post: {
      type: Object,
      // validator is used for evaluation of data
      validator: obj => {
        // if the prop is valid
        const keyIsValid = typeof obj['.key'] === 'string'
        const textIsValid = typeof obj.text === 'string'
        const valid = keyIsValid && textIsValid
        if (!textIsValid) {
          console.error('The post prop object must include a "text" attribute')
        }
        if (!keyIsValid) {
          console.error('The post prop object must include a ".key" attribute')
        }
        return valid
      }
    }
  },

  data () {
    return {
      text: this.post ? this.post.text : ''
    }
  },

  computed: {
    isUpdate () {
      return !!this.post
    }
  },

  methods: {
    save () {
      this.persist()
      .then(post => {
        this.$emit('save', {post})
      })
    },

    cancel () {
      this.$emit('cancel')
    },

    create () {
      // const postId = 'greatPost' + Math.random()   // we are generating an id since newPost does not have an id
      //  threadId and the userId properties are foreign keys that connect the posts with the related resources.
      // since we won't use the post keyword later on, we can use the const keyword to declare it. This means that we cannot assign values to the variable post again but change it's contents.
      const post = {
        text: this.text,
        threadId: this.threadId
        // since we can't use . in the property name, we will have to wrap it in quotes
        // '.key': postId
      }
      // to clean up the textarea after the post is submitted
      this.text = ''   // this will be reflected in the textarea since we have bound it using two way binding using v-model
      // here, {post} is a object, which we will be accessing using the object key.
      // we are using a custom event to pass data from the child component to the parent component.
      // this.$emit('save', {post})   // this is used to emit a custom event. Here, we are emmitting a save-post event and we are passing the event to the listener.
      return this.$store.dispatch('createPost', post)
    },

    update () {
      const payload = {
        id: this.post['.key'],
        text: this.text
      }
      return this.$store.dispatch('updatePost', payload)
    },

    persist () {
      return this.isUpdate ? this.update() : this.create()
    }
  }
}
</script>

<style scoped>

</style>
