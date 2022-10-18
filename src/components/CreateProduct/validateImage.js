

export default  function validateImage(value) {
    const error = {}
    const regexUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    if(!regexUrl.test(value)) error.images = 'image url only'
    if(value.length < 10) error.images = 'image url only'
    return error;
  }
  