/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      leads: [],
      time_format: "12/25/17",
      url: "https://www.google.com/", 
      searchTerm: "",
      count: 0
    },
    mounted: function() {
      $.get('/api/v1/leads.json').success(function(response) {
        var count = 0;
        this.leads = response;
        this.leads.map(function(lead) { 
          count = count + 1;
          // console.log(lead);
          if (lead.events) {
            var sortedEvents = lead.events.sort((a, b) => b.updated_at > a.updated_at);
            lead.events = sortedEvents;
          }
        });
        if (count === this.leads.length) {
          // console.log("inside if");
          function compare(a,b) {
            var lead1 = new Date(a.events && a.events[0] && a.events[0].updated_at || a.events && a.events[0] && a.events[0].created_at);
            var lead2 = new Date(b.events && b.events[0] && b.events[0].updated_at || b.events && b.events[0] && b.events[0].created_at);
            // console.log("lead1", lead1);
            // console.log("lead2", lead2);
            if (lead1 < lead2) {
              // console.log("a.events[0].updated_at", a.events[0].updated_at);
              // console.log("b.events[0].updated_at", b.events[0].updated_at);
              return -1;
            }
            if (lead1 > lead2) {
              // console.log(2);
              return 1;
            }
            // console.log(3);
            return 0;
          }
          // console.log(this.leads);
          this.leads.sort(compare);
          this.leads.reverse();
        }
        // this.leads = this.leads.sort((a, b) => a.events[0].updated_at > b.events[0].updated_at);
        // this.leads = this.leads.sort(function(a, b) {
        //   if (a.events[0] && b.events[0]) {
        //     console.log("inside if statement");
        //     return b.events[0].updated_at - a.events[0].updated_at;
        //   }
        // });
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
