let NEDB = require ('nedb');
let db = new NEDB({
    
    filename:'users.db',
    autoload:true
});

module.exports = function(app) {

  let route = app.route('/users');

    route.get((req,res) => {

      db.find({}).sort({name:1}).exec((err, users) => {

        if (err) {
        app.utils.error.send(err, req, res);
   
        } else {

            res.statusCode = 200;
            res.setHeader ('Content-Type', 'application/json');
            res.json({
                users
            });
        }

      });

    });
    
    route.post((req, res) => {

      req.assert('name', 'o nome é obrigatorio').notEmpty();
      req.assert('email', 'o email esta inválido').notEmpty().isEmail();

      let errors = validationErrors();
 
      if (errors) {
        
        app.utils.error.send(errors, req, res);  
        return false;

      }

    
        db.insert(req.body, (err, user) => {

          if (err) {
            app.utils.error.send(err, req, res);
          } else {

            res.status(200).json(user);

          }

        });
     
        let routeId = app.route('/users/id:');

        routeId.get((req, res) => {

          db.findOne({_id:req.params.id}).exec((err, user) => {

            if (err) {

              app.utils.error.send(err, req, res);

            } else {
  
              res.status(200).json(user);
  
            }
          
        });

        });

    });
    
    route.put((req, res) => {

      db.update({_id:req.params.id}, req.body, err => {

        if (err) {
          app.utils.error.send(err, req, res);
        } else {

          res.status(200).json(Object.assign(req.params, req.body));

        }
      
    });

    });

    route.delete((req, res) => {

      db.remove({_id:req.params.id}, {}, err => {

        if (err) {
          app.utils.error.send(err, req, res);
        } else {

          res.status(200).json(req.params);

        }

      });

  });

}
