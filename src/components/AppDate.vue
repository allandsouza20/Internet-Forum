<template>
  <span 
  v-bind:title="timestamp | humanFriendlyDate">   <!-- title is a HTML attribute which displays the required text on hover -->
  <!-- The filter humanFriendlyDate is appended using a pipe symbol. We can also append multiple filters using the 
  pipe operator, e.g. | humanFriendlyDate | uppercase, if we had a new filter that would convert the text to uppercase -->
  <!-- NOTE: Filters do not allow you to do something new, they are just methods with a special syntax -->
    {{ timestamp | diffForHumans }}  
  </span>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    timestamp: {
      required: true,
      // In javascript, we do not have any specific types for numbers, like Integer or Float
      // Therefore, the timestamp is just represented by Number
      type: Number
    }
  },
  filters: {
    // the filter needs a date arguement and then
    humanFriendlyDate (date) {
      // use return moment.unix(date).locale('fr').format('MMMM Do YYYY, h:mm:ss a') to change the language in which the date is displayed to French
      return moment.unix(date).format('MMMM Do YYYY, h:mm:ss a')
    },

    // this filter gives us the time that was passed since the post was published
    diffForHumans (date) {
      return moment.unix(date).fromNow()
    }
  }
}
</script>

<style scoped>

</style>
