/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      leads: [],
      time_format: "12/25/17",
      url: "https://www.google.com/", 
      searchTerm: ""
    },
    mounted: function() {
      $.get('/api/v1/leads.json').success(function(response) {
        this.leads = response;
        this.leads.map(function(lead) { 
          if (lead.events) {
            var sortedEvents = lead.events.sort((a, b) => b.updated_at > a.updated_at);
            lead.events = sortedEvents;
          }
        });
        // this.leads = this.leads.sort((a, b) => a.events[0].updated_at > b.events[0].updated_at);
        this.leads = this.leads.sort(function(a, b) {
          if (a.events[0] && b.events[0]) {
            return b.events[0].updated_at - a.events[0].updated_at;
          }
        });
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
