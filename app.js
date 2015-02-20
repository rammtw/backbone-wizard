var Model = Backbone.Model.extend({
	defaults: {
		state: "start"
	}
});

var model = new Model();

var Steps = Backbone.View.extend({
	el: '#steps',

	model: model,

	initialize: function(){
		this.model.bind('change', this.render, this);
	},

	templates: {
		'start':_.template($('#start').html()),
		'step-two':_.template($('#step-two').html()),
		'step-three':_.template($('#step-three').html())
	},

	events: {
		'click .step-one button' : "check",
		'keypress' : "checkKey"
	},

	checkKey: function(e){
		if(e.keyCode == 13) {
			this.check();
		}
	},

	check: function(){
		if($(this.el).find(".step-one input").val()){
			this.model.set('state', 'step-two');
		} else {
			this.model.set('state', 'step-three');
		}
	},

   	render: function () {
   		var state = this.model.get('state');
        $(this.el).html(this.templates[state](this.model.toJSON()));
        return this;
    }
});

var steps = new Steps();

model.trigger('change');
model.bind('change:state', function(){
	var state = this.get('state');

	if(state == 'start')
		controller.navigate('');
	else
		controller.navigate('!/' + state);
});


var Controller = Backbone.Router.extend({
	routes: {
		"" : "start",
		"!/step-one" : "start",
		"!/step-two" : "stepTwo",
		"!/step-three" : "stepThree",
	},

	start: function(){
		model.set({ state: "start" });
	},

	stepTwo: function(){
		model.set({ state: "step-two" });
	},

	stepThree: function(){
		model.set({ state: "step-three" });
	}
});

var controller = new Controller();

Backbone.history.start();