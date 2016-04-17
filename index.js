if (Meteor.isClient) {

    Template.theform.rendered = function(){
        dob = localStorage.getItem('dob');
        lifespan = localStorage.getItem('lifespan');
        if (dob == null || lifespan == null){
            $('#the-form').modal('show');
        } else {
            Session.set('dob', dob);
            Session.set('lifespan', lifespan);
        }
    };


    Template.theform.helpers({
        todayDate: function () {
            today = new Date()
            date = today.getDate();
            month = today.getMonth() + 1;
            if (month < 10){
                month = "0" + month
            }
            year = today.getFullYear();
            return year + "-" + month + "-" + date
        },
        fillDate: function() {

            dob = Session.get('dob');
            if (dob == null){
                return Template.theform.__helpers.get('todayDate').call();
            } else {
                return dob;
            }
        },
        fillLS: function(){
            lifespan = Session.get('lifespan');
            if (lifespan == null){
                return 90;
            } else {
                return lifespan;
            }


        }

    });
    Template.thebox.helpers({
        boxes: function() {
            lifespan = Session.get('lifespan');
            dob = Session.get('dob');
            result = "";
            for (i = 0; i < lifespan; i++){

                for (j = 0; j < 52; j++ ){
                    result += "x"

                }
                result += "\n"
            }

            return result
        }

    });

    Template.theform.events({
        'submit .theform' : function(event) {

            event.preventDefault();
            target = event.target;
            dob = target.dob.value;
            lifespan = target.lifespan.value;

            localStorage.setItem('dob',dob);
            localStorage.setItem('lifespan',lifespan);

            Session.set('lifespan', lifespan);
            Session.set('dob', dob);

            $('#the-form').modal('hide');
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
