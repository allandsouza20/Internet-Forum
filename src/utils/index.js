const countObjectProperties = obj => {
//  check if the passed arguement is typeof object
  if (typeof obj === 'object') {
    // convert it's keys to an array and return it's length
    return Object.keys(obj).length
  }
//  if it's not an object, return 0
  return 0
}

// export {} is used to export an object, so later, if we create another helper, we can append it to the object we are exporting
export {
  countObjectProperties
}
