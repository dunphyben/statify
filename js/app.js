App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'statify-emberjs'
});

App.Router.map(function() {
  this.resource('index', { path: '/' }, function() {
    this.resource('newTeam', { path: '/teams/new' });
    this.resource('showTeam', { path: '/teams/:id' }, function() {
      this.resource('newPlayer', { path: '/players/new' });
    });
  });
});

App.Team = DS.Model.extend({
  city: DS.attr('string'),
  name: DS.attr('string')
});

App.Player = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string')
});


App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('team');
  }
});

App.ShowTeamRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('team');
  }
});

App.TeamsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('team');
  }
});

App.NewTeamRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('team');
  }
});

App.newPlayerRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('player');
  }
});

App.NewTeamController = Ember.ObjectController.extend({
  actions:{
    createTeam: function() {
      var model = this.get('model');
      var controller = this;

      model.save()
      .then(function() {
        controller.transitionToRoute('index');
      })
      .catch(function() {
        alert("Please fix the problems as noted.")
      });
    }
  }
});
