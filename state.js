


const createConfig = (id, name, options, isEnabledByDefaut, isEnabledByStreetRacer, isEnabledByPolitician) => {
    return {
        id,
        name,
        options,
        isEnabledByDefaut,
        isEnabledByStreetRacer,
        isEnabledByPolitician
    }
}

const createOption = (id, name, cost) => { return {id, name, cost};  } 


const configs = [
    createConfig('FARA', 'Фары', [createOption('DEFAULT', '-', 0), createOption('K1', 'Ксенон', 100), createOption('K2', 'Диоды', 200)], true, false, false ),
    createConfig('SALON', 'Салон', [createOption('DEFAULT', '-', 0),createOption('S1', 'Фанера', 150), createOption('S2', 'Ткань', 200), createOption('S3', 'Кожзам', 300)], true, false, false ),
    createConfig('MOTOR', 'Мотор', [createOption('DEFAULT', '-', 0),createOption('M1', '100лс', 1500), createOption('M2', '149лс', 2000), createOption('M3', '199лс', 3000)], true, false, false ),
    createConfig('TUNING', 'Иероглиф на стекло', [createOption('DEFAULT', '-', 0),createOption('T1', 'Банка тушенки', 1500), createOption('T2', 'Свободная касса', 2000), createOption('T3', 'Закрыто на ремонт', 3000)], false, true, false ),
    createConfig('MIGALKA', 'Мигалка', [createOption('DEFAULT', '-', 0),createOption('MG1', 'Красная', 2000), createOption('MG2', 'Синяя', 3000), createOption('MG3', 'Красная и синяя', 5000)], false, false, true ),
];

const selections = configs.map(current => {return {
    id: current.id,
    option: 'DEFAULT',
    isEnabledByDefaut: current.isEnabledByDefaut,
    isEnabledByStreetRacer: current.isEnabledByStreetRacer,
    isEnabledByPolitician: current.isEnabledByPolitician,
 }});

const selectionsMap = selections.reduce((acc, current) => {     
    acc[current.id] = current;    
    return acc; 
}, {});

const user = {
    vip: false,
    streetRacer: false,
   // politician: false
}

exports.state = {configs, selections, selectionsMap, user};