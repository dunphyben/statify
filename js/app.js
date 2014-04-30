App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'statify-emberjs'
});

App.Router.map(function() {
  this.resource('teams', { path: '/' }, function() {
    this.resource('newTeam', { path: '/teams/new' });
    this.resource('showTeam', { path: '/teams/:id' }, function() {
      this.resource('newPlayer', { path: '/players/new' });
    });
  });
});


App.Player = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  team: DS.belongsTo('team')
});

App.Team = DS.Model.extend({
  player: DS.hasMany('player'),
  city: DS.attr('string'),
  name: DS.attr('string')
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

App.PlayersRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('player');
  }
});


App.NewTeamRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('team');
  }
});

App.NewPlayerRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('player');
  }
});

App.TeamController = Ember.ObjectController.extend({
  actions: {
    deleteTeam: function() {
      if (confirm('Lifetime ban?')) {
        this.get('model').destroyRecord();
      }
    }
  }
});

App.NewTeamController = Ember.ObjectController.extend({
  actions:{
    createTeam: function() {
      var model = this.get('model');
      var controller = this;

      model.save()
      .then(function() {
        controller.transitionToRoute('teams');
      })
      .catch(function() {
        alert("Please fix the problems as noted.")
      });
    }
  }
});

App.NewPlayerController = Ember.ObjectController.extend({
  needs: 'team',
  team: Ember.computed.alias('controllers.team'),

  actions:{
    createPlayer: function() {
      var playerTeam = this.get('team').get('model');
      console.log(this.get('team').get('model'));
      var model = this.get('model');
      var controller = this;
      model.save();
      playerTeam.get('player').pushObject(model);
      controller.transitionToRoute('team', team);
    }
  }
});

