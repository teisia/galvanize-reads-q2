module.exports = {
  titleIsNotBlank: function(input) {
    return !input.trim() ? 'Title cannot be blank' : '';
  },
  genreIsNotBlank: function(input) {
    return !input.trim() ? 'Genre cannot be blank' : '';
  },
  imageIsNotBlank: function(input) {
    return !input.trim() ? 'Cover Image cannot be blank' : '';
  },
  descriptionIsNotBlank: function(input) {
    return !input.trim() ? 'Description cannot be blank' : '';
  },
  authorIsNotBlank: function(input) {
    return !input.trim() ? 'Author cannot be blank' : '';
  }
}
