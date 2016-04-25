if (Meteor.isClient) {

    Template.theform.rendered = function(){
        var dob = localStorage.getItem('dob');
        var lifespan = localStorage.getItem('lifespan');
        if (dob == null || lifespan == null){
            $('#the-form').modal('show');
        } else {
            Session.set('dob', dob);
            Session.set('lifespan', lifespan);
        }
    };


    Template.theform.helpers({
        todayDate: function () {
            var today = new Date();
            var date = today.getDate();
            var month = today.getMonth() + 1;
            if (month < 10){
                month = "0" + month
            }
            var year = today.getFullYear();
            return year + "-" + month + "-" + date;
        },
        fillDate: function() {

            var dob = Session.get('dob');
            if (dob == null){
                return Template.theform.__helpers.get('todayDate').call();
            } else {
                return dob;
            }
        },
        fillLS: function(){
            var lifespan = Session.get('lifespan');
            if (lifespan == null){
                return 90;
            } else {
                return lifespan;
            }


        }

    });
    Template.thebox.helpers({
        boxes: function() {
            var lifespan = Session.get('lifespan');
            var dob = Session.get('dob');
            dob = dob.split('-');

            var year = dob[0];
            var month = dob[1];
            var date = dob[2];

            var today = new Date();
            var thisYear = today.getFullYear();
            var thisMonth = today.getMonth() + 1;
            var thisDate = today.getDate();

            var result = "";

            var yearsLived = thisYear - year;

            // Show years lived
            for (i = 0; i < yearsLived; i++){
                for (j = 0; j < 52; j++ ){
                    result += "<span class='glyphicon glyphicon-stop before'></span>";
                }
                result += "<br>";
            }

            // Show weeks lived
            var weeksLived = (thisMonth - month) * 4;
            weeksLived += (thisDate - date)/7;
            weeksLived = Math.round(weeksLived);
            for (j = 0; j < weeksLived; j++ ){
                result += "<span class='glyphicon glyphicon-stop before'></span>"
            }
            // Show remaining weeks
            var weeksRemaining = 52 - weeksLived;
            for (j = 0; j < weeksRemaining; j++ ){
                result += "<span class='glyphicon glyphicon-unchecked after'></span>"
            }
            result += "<br>";

            // Show remaining years
            var remainingYears = lifespan - yearsLived - 1;
            for (i = 0; i < remainingYears; i++){
                for (j = 0; j < 52; j++ ){
                    result += "<span class='glyphicon glyphicon-unchecked after'></span>";
                }
                result += "<br>";
            }

            return result
        }

    });

    Template.theform.events({
        'submit .theform' : function(event) {

            event.preventDefault();
            var target = event.target;
            var dob = target.dob.value;
            var lifespan = target.lifespan.value;

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
