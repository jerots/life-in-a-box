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
            dob = dob.split('-');

            year = dob[0];
            month = dob[1];
            date = dob[2];

            today = new Date();
            thisYear = today.getFullYear();
            thisMonth = today.getMonth() + 1;
            thisDate = today.getDate();

            result = "";

            yearsLived = thisYear - year;

            // Show years lived
            for (i = 0; i < yearsLived; i++){
                for (j = 0; j < 52; j++ ){
                    result += "x";
                }
                result += "\n";
            }

            // Show weeks lived
            weeksLived = (thisMonth - month) * 4;
            weeksLived += (thisDate - date)/7;
            weeksLived = Math.round(weeksLived);
            for (j = 0; j < weeksLived; j++ ){
                result += "x"
            }
            // Show remaining weeks
            weeksRemaining = 52 - weeksLived;
            for (j = 0; j < weeksRemaining; j++ ){
                result += "o"
            }
            result += "\n";

            // Show remaining years
            remainingYears = lifespan - yearsLived - 1;
            for (i = 0; i < remainingYears; i++){
                for (j = 0; j < 52; j++ ){
                    result += "o";
                }
                result += "\n";
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
