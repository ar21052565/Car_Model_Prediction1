// LinearRegressionModel.js
const { PythonShell } = require('python-shell');

const model = {
    predict: (features) => {
        const options = {
            scriptPath: 'path/to/your/flask/app',
            args: features,
        };

        const prediction = PythonShell.run('your_prediction_script.py', options, (err, results) => {
            if (err) throw err;
            console.log('Results: ', results);
        });

        return prediction;
    },
};

module.exports = model;
