const router = require('express').Router();
const Proyecto = require('../../models/proyecto');
const {check, validationResult} = require('express-validator');


router.get('/', async (req, res) => {
    console.log(req.payload);
    try {
        const proyectos = await Proyecto.find();
        res.json(proyectos);
    }catch(err) {
        res.status(503).json({ 'error': err});   
    }
});

router.post('/',[
    check('titulo', 'El título debe incluirse y debe ser menor a 40 caracteres')
        .exists()
        .isLength({max: 40}),
    check('descripcion', 'La descripción debe incluirse y debe ser menor a 300 caracteres')
        .exists()
        .isLength({max: 300}),
    check('url', 'Verifique el formato de la url')
        .isURL()   
] , async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({ 'errors': errors.array() });
    }
    try {
        const nuevoProyecto =await Proyecto.create(req.body);
        res.json(nuevoProyecto); 
    }catch (err) {
        res.status(503).json({ 'error': err});
    } 
});

router.put('/proyectoId', [
    check('titulo', 'El título debe incluirse y debe ser menor a 40 caracteres')
        .exists()
        .isLength({max: 40}),
    check('descripcion', 'La descripción debe incluirse y debe ser menor a 300 caracteres')
        .exists()
        .isLength({max: 300}),
    check('url', 'Verifique el formato de la url')
        .isURL()   
] , async(req, res) => {
    try{
        const proyectoEditado = await Proyecto.findByIdAndUpdate(req.params.proyectoId, req.body, {new: true});
        res.json(proyectoEditado);
    }catch(err){
        res.status(503).json({ 'error': err});
    }
});

router.delete('/:proyectoId', async(req, res) => {
    try{
        const proyectoBorrado = await Proyecto.findByIdAndDelete(req.params.proyectoId);
        res.json(proyectoBorrado);
    }catch(err){
        res.status(503).json({ 'error': err});
    }
});



module.exports = router;