var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

/*--------------------------------------------------------------------------------------------------------------
-                                                                                                              -
-                                          Début model contact                                                 -
-                                                                                                              -
----------------------------------------------------------------------------------------------------------------*/


var Contact = mongoose.Schema(
    {
        firstname       : {type: String, index: true, default: '' },
        name            : { type: String, default: '' },
        langue          : { type: [String], default: null },
        email            : {
                            type        : String, 
                            trim        : true,
                            unique      : true,
                           /* validate    : [validateEmail, 'Vérifier que votre adresse mail est valide'],
                            match       : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Vérifier que votre adresse mail est valide'],*/
                            default: ''
                          },
        tel_fix         : {
                            type: String,
                            trim: true,
                            /*validate: [validateTel, 'Vériifier que votre numéro de téléphone est valide'],
                            match: [/(\+\d+(\s|-))?0\d(\s|-)?(\d{2}(\s|-)?){4}/, 'Vériifier que votre numéro de téléphone est valide'],*/
                            default: ''
                          },
        tel_port        : {
                            type: String,
                            trim: true,
                           /* validate: [validateTel, 'Vériifier que votre numéro de téléphone est valide'],
                            match: [/(\+\d+(\s|-))?0\d(\s|-)?(\d{2}(\s|-)?){4}/, 'Vériifier que votre numéro de téléphone est valide'],*/
                            default: ''
                          },
        birth_date      : { type: Date, default: null },
        working_domains : { type: [String], default: null },
        meeting_date    : { type: Date, default: null },
        meeting_place   : { type: String, default: '' },
        meeting_comments: { type: [String], default: null },
        own_comments    : { type: [String], default: null },
        photo           : { type: mongoose.Schema.Types.ObjectId, ref: 'Document', default: null},
        address         : { type: mongoose.Schema.Types.ObjectId, ref: 'Address', default: null },
        dynamic_part    : { type: mongoose.Schema.Types.ObjectId, ref: 'Contact_dyn', default: null},
    	owner		    : { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }
    }, 
    {
        strict      : false // the contact schema will be more open to keep information from each source of the contact
    }
);


/*-------------------------------- Address ---------------------------------------*/

var Address = mongoose.Schema(
    {
        address     : { type: String, default: '' },
        postal_code : { type: String, default: '' },
        city        : { type: String, default: '' },
        country     : { type: String, default: '' }
    }
);


/*-------------------------------- Contact_dyn -----------------------------------*/

var Contact_dyn = mongoose.Schema(
    {
        social_email                : { 
                                            type        : String, 
                                            trim        : true,
                                            unique      : true,
                                           /* validate    : [validateEmail, 'Vérifier que votre adresse mail est valide'],
                                            match       : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Vérifier que votre adresse mail est valide'],*/
                                            default     : ''
                                      },
        web_site                    : { type: String, default: '' },
        description                 : { type: String, default: '' },
        social_id                   : { type: mongoose.Schema.Types.ObjectId, ref: 'Social_id', default: null },
        social_conservation_data    : { type: mongoose.Schema.Types.ObjectId, ref: 'Conservation_data', default: null },
        professional_data           : { type: mongoose.Schema.Types.ObjectId, ref: 'Professional_data', default: null },
        interests                   : { type: mongoose.Schema.Types.ObjectId, ref: 'Interests', default: null },
        documents                   : { type: mongoose.Schema.Types.ObjectId, ref: 'Document', default: null },
        company                     : { type: mongoose.Schema.Types.ObjectId, ref: 'Company', default: null }
    }
);

/*-------------------------------- Social_id -------------------------------------*/

var Social_id = mongoose.Schema(
    {
        facebook    : { type: String, default: '' },
        tweeter     : { type: String, default: '' },
        linkedin    : { type: String, default: '' }
    }
);

/*-------------------------------- Conservation_data ------------------------------*/

var Conservation_data = mongoose.Schema(
    {
        facebook    : { type: [String], default: null },
        tweeter     : { type: [String], default: null },
        linkedin    : { type: [String], default: null }
    }
);

/*-------------------------------- Professional_data ------------------------------*/

var Professional_data = mongoose.Schema(
    {
        formation                   : { type: [mongoose.Schema.Types.ObjectId], ref: 'Formation', default: null },
        professional_experience     : { type: [mongoose.Schema.Types.ObjectId], ref: 'Professional_experience', default: null },
        skills                      : { type: [String], default: null}
    }
);

var Formation = mongoose.Schema(
    {
        schooling   : { type: String, index: true, default: ''},
        graduate    : { type: String, default: ''}
    }
);

var Professional_experience = mongoose.Schema(
    {
        company     : { type: mongoose.Schema.Types.ObjectId, ref: 'Company', index: true, default: null},
        job             : { type: String, default: '' }
    }
);

/*-------------------------------- Interest ---------------------------------------*/

var Interests = mongoose.Schema(
    {
        own_interest    : { type: mongoose.Schema.Types.ObjectId, ref: 'Own_interest', default: null },
        recent_subjects : { type: mongoose.Schema.Types.ObjectId, ref: 'Recent_subjects', default: null}
    }
);

var Own_interest = mongoose.Schema(
    {
        hobbies         : { type: [String], default: null },
        group_facebook  : { type: [String], default: null },
        group_linkedin  : { type: [String], default: null }
    }
);

var Recent_subjects = mongoose.Schema(
    {
        follow  : { type: [String], default: null },
        post    : { type: [String], default: null }
    }
);

/*--------------------------------- Company ----------------------------------------*/

var Company = mongoose.Schema(
    {
        arrival_date    : {type: Date, default: null },
        job             : { type: String, default: '' },
        detail          : { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', default: null }
    }
);


/*-------------------------------- DOCUMENT----------------------------------------*/

var Document = mongoose.Schema(
    {
    name        : { type: String, index: true, default: '' },
    comment     : { type: String, default: '' },
    url         : { type: String, default: '' },
    online      : { type: Boolean, default: false },
    data        : { type: Buffer, default: null },
    coordinates : [Number]
    }
);



/*--------------------------------------------------------------------------------------------------------------
-                                                                                                              -
-                                          Fin model contact                                                   -
-                                                                                                              -
----------------------------------------------------------------------------------------------------------------*/

var Actor = mongoose.Schema(
    {
    	person		: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
    	role		: String,
    	comment     : String,
    	coordinates : [Number]
    }
);

var Deck = mongoose.Schema(
    {
    	title        : String,	
        tags         :  {type : [String], default: ''},
        creation_date: { type: Date, default: Date.now },
        update_date  : { type: Date, default: Date.now },
        owners       : { type: [String], index: true },
        docs	     : [Document],
        actors       : [Actor]
    }
);

// User schema
var User = mongoose.Schema(
    {
        username        : { type: String, required: true, unique: true, index: true },
        password        : { type: String, required: true},
        name            : String,
        email           : {
                            type        : String,
                            trim        : true,
                            unique      : true
                           /* required    : 'Une adresse mail valide est obligatoire',
                            validate    : [validateEmail, 'Vérifier que votre adresse mail est valide'],
                            match       : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Vérifier que votre adresse mail est valide']*/
                          },
        admin           : {type: Boolean, default: false },
        subscription    : {type: Boolean, default: false },
        creation_date   : { type: Date, default: Date.now },
        update_date     : { type: Date, default: Date.now }
    }
);

/*--------------------------------------------------------------------------------------------------------------
-                                                                                                              -
-                                          Model functions                                                     -
-                                                                                                              -
----------------------------------------------------------------------------------------------------------------*/

var validateEmail = function(email)
{
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var validateTel = function(num) 
{
    var re = /(\+\d+(\s|-))?0\d(\s|-)?(\d{2}(\s|-)?){4}/;
    return re.test(num)
};



/*--------------------------------------------------------------------------------------------------------------
-                                                                                                              -
-                                   Fonction authentification                                                  -
-                                                                                                              -
----------------------------------------------------------------------------------------------------------------*/

 // Bcrypt middleware on User
 User.pre('save', function(next)
 {
    var user = this;

    if (!user.isModified('password'))
        return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt)
    {
        if (err)
            return next(err);

         bcrypt.hash(user.password, salt, function(err, hash)
         {
            if (err)
                return next(err);

             user.password = hash;
            console.log('password is now ' + user.password);
            next();
         });
    });
 });

 //Password verification
 User.methods.comparePassword = function(password, cb)
 {
    bcrypt.compare(password, this.password, function(err, isMatch)
    {
        if (err)
            return cb(err);

        cb(isMatch);
    });
 };

/*--------------------------------------------------------------------------------------------------------------
-                                                                                                              -
-                                                  exports                                                     -
-                                                                                                              -
----------------------------------------------------------------------------------------------------------------*/

exports.Contact                 = mongoose.model('Contact', Contact);
exports.Address                 = mongoose.model('Address', Address);
exports.Contact_dyn             = mongoose.model('Contact_dyn', Contact_dyn);
exports.Social_id               = mongoose.model('Social_id', Social_id);
exports.Conservation_data       = mongoose.model('Conservation_data', Conservation_data);
exports.Professional_data       = mongoose.model('Professional_data', Professional_data);
exports.Formation               = mongoose.model('Formation', Formation);
exports.Professional_experience = mongoose.model('Professional_experience', Professional_experience);
exports.Interests               = mongoose.model('Interests', Interests);
exports.Own_interest            = mongoose.model('Own_interest', Own_interest);
exports.Recent_subjects         = mongoose.model('Recent_subjects', Recent_subjects);
exports.Company                 = mongoose.model('Company', Company);
exports.Document                = mongoose.model('Document', Document);

exports.User                    = mongoose.model('User', User);
exports.Actor                   = mongoose.model('Actor', Actor);
exports.Deck                    = mongoose.model('Deck', Deck); 

