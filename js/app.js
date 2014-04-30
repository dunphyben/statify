App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.resource('index', { path: '/' }, function() {
    this.resource('newTeam', { path: '/teams/new' });
  });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['Bulls', 'Blazers'];
  }
});


App.NewTeamController = Ember.ObjectController.extend({
  actions:{
    createTeam: function() {
      var model = this.get('model');
      model.save();
    }
  }
})
