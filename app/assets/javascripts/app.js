/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      leads: [],
      time_format: "12/25/17",
      url: "https://www.google.com/", 
      searchFirstName: "",
      searchLastName: "",
      searchEmail: ""

    },
    mounted: function() {
      $.get('/api/v1/leads.json').success(function(response) {
        console.log(this);
        this.leads = response;
      }.bind(this));
    },
    methods: {
      moment: function(date) {
        return moment(date);
      },
    isValidLead: function(FirstName, LastName, Email){
      console.log("hello");
      var validFirstName = FirstName.toLowerCase().includes(this.searchFirstName.toLowerCase());

      var validLastName = LastName.toLowerCase().includes(this.searchLastName.toLowerCase());

      var validEmail = Email.toLowerCase().includes(this.searchEmail.toLowerCase());
      return validFirstName && validLastName && validEmail;
     }  
    },
    computed: {

    },
  });
});
