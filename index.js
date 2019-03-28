var express = require('express');
var bodyParser = require("body-parser");

var app = express();

var state = require('./state').state;

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/api/configurations', (req, res) => {
    return res.status(200).send(
        getConfigs()
    );
});

app.get('/api/selections', (req, res) => {
    return res.status(200).send(
        getSelections()
    );
});

app.get('/api/user', (req, res) => {
    return res.status(200).send(
        state.user
    );
});


app.post('/api/setVipUser', (req, res) => {
    
    state.user.vip = req.body.value; 
    return res.status(201).send(state.user);
});

app.post('/api/setPoliticianUser', (req, res) => {
    state.user.politician = req.body.value; 
    return res.status(201).send(state.user);
});

app.post('/api/setStreetRacerUser', (req, res) => {
    state.user.streetRacer = req.body.value; 
    return res.status(201).send(state.user);
});

  app.post('/api/makeSelection', (req, res) => {

      state.selectionsMap[req.body.id].option = req.body.option;

      return res.status(201).send(getSelections());
   });

const isEnabled = function(config){
    return config.isEnabledByDefaut || 
    (config.isEnabledByStreetRacer && state.user.streetRacer)|| 
    (config.isEnabledByPolitician && state.user.politician);
}

const getSelections = function(){
    return state.selections.filter(isEnabled).map(s => {return {id: s.id, option: s.option}}) ;
}

const getConfigs = function(){
    return state.configs.filter(isEnabled).map(s => {return {
        id: s.id, 
        options: getOptions(s.options),
        name: s.name    
    }
    }) ;

    function getOptions(o) {
        return state.user.vip ?
            o.map(_ => { return { ..._, cost: _.cost / 10 } }) :
            o;
    } 
}


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});