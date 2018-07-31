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
          lead.hot = false;
          count = count + 1;
          if (lead.events) {
            var sortedEvents = lead.events.sort((a, b) => b.updated_at > a.updated_at);
            lead.events = sortedEvents;
          }
          
          if (lead.outreaches && lead.outreaches.length > 0)  {
           
            lead.outreaches.sort(function(a,b) { 
                var dateA = a.updated_at ? a.updated_at : a.created_at;
                var dateB = b.updated_at ? b.updated_at : b.created_at;
                return dateA < dateB ? 1 : dateB < dateA ? -1 : 0;
            }

              );
             var latestOutreach = lead.outreaches[0].updated_at ? lead.outreaches[0].updated_at : lead.outreaches[0].created_at;
            if (latestOutreach < lead.events[0].updated_at) {
               lead.hot = true;
            }

          }
        });

          
        this.leads = _.orderBy(this.leads, function(lead) {
          if (lead.events[0] != undefined) {
            return lead.events[0].updated_at;
          }
        }).reverse();
        this.leads.push(_.remove(this.leads, function(el) { 
          return el.events.length === 0;
        }));
        this.leads = [].concat.apply([], this.leads);
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
