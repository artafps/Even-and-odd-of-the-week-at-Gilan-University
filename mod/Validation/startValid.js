const Yup = require("yup");

exports.schema = Yup.object().shape({
    Tid:Yup.string(),
    global:Yup.string(),
});
