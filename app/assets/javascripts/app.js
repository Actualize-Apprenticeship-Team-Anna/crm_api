/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      leads: [],
      time_format: "12/25/17",
      url: "https://www.google.com/", 
      searchTerm: "",
      sort: ""
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

      onClickLead: function(lead) {
        var eventsContainer = document.getElementById(lead.id);
        if (eventsContainer.style.display === "none") {
          eventsContainer.style.display = "flex";
        } else {
          eventsContainer.style.display = "none";
        }
      },

      onClickHeader: function(attribute) {
        if (this.sort === attribute) {
          this.leads.reverse();
        } else {
          this.leads.sort(function(lead1,lead2) {
            return (lead1[attribute] > lead2[attribute]) ? 1 : ((lead2[attribute] > lead1[attribute]) ? -1 : 0);
          } ); 

        }
        this.sort = attribute;
      },
      isValidLead: function(FirstName, LastName, Email) {
        var validFirstName = FirstName.toLowerCase().includes(this.searchTerm.toLowerCase());
        var validLastName = LastName.toLowerCase().includes(this.searchTerm.toLowerCase());
        var validEmail = Email.toLowerCase().includes(this.searchTerm.toLowerCase());
        return validFirstName || validLastName || validEmail;
      }  

    },
    computed: {

    },
  });
});
