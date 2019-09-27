'use strict';

const Movie = require('../models/moviesModel');


function listarPelicula (req, res){
    Movie.find({}).populate('user').exec((err, movies) => {
        if (err) return res.status(400).json({'error': err});
        if (movies) {
            return res.status(200).json({'message': 'PELICULAS', 'movies': movies});
        } else {
            return res.status(400).json({'error': 'No hay peliculas que mostrar.'});
        }
    });
}

function crearPelicula (req, res){
    if (!req.body.movie){
        return res.status(400).json({'error': 'Faltan parametros'});
    } else {
        let movie = req.body.movie;
        let newMovie = new Movie(movie);

        newMovie.save().then(movieCreated => {
            return res.status(200).json({'message': 'Pelicula creada correctamente', movieCreated});
        }).catch(err => {
            return res.status(400).json({'error': 'No se puede crear pelicula',err});
        });
    }
}

function modificarPelicula(req, res){
    let id = req.query.id;
    let movie = req.body.movie;

    if (id) {
        Movie.updateOne({_id: id}, {$set: movie}).then(movieUpdated => {
            return res.status(200).json({'message':'Pelicula Actualizada', movieUpdated})
        }).catch(err => {
            return res.status(400).json({'message':'No se ha actualizado la pelicula', err});
        });
    } else {
        return res.status(400).json({'Advertencia': 'Complete los campos para crear una Pelicula.'})
    }
}

function borrarPelicula(req, res){
    let id = req.query.id;

    if (id) {
        Movie.deleteOne({ _id: id }).then( movieDeleted => {
            return res.status(200).json({ 'message': 'Pelicula borrada.', movieDeleted });
        }).catch(err => {
            return res.status(400).json({ 'error': 'La pelicula no pudo ser borrada', err });
        });
    } else {
        return res.status(400).json({ message: 'Seleccione una Pelicula para borrar.' })
    }
}

function myfileUpload (req,res){
       
    let id_movie = req.query.id_movie;

     
    if(!req.files){
        res.status(200).json({message:'no hay archivos'});
    }else{
        //res.status(200).json({message:'verificar datos', myfile: req.files.myfile.name, body: req.body });
        console.log("req ", req.files.myfile.name);
        let archivo = req.files.myfile;
        let nombre = req.files.myfile.name;
        let nombredivido = nombre.split('.');
        let extension = nombredivido[nombredivido.length-1];
        let extensionesValidas = ['png','jpg','jpeg','gif'];
        if(extensionesValidas.indexOf(extension) < 0){
         return res.status(400).json({message:'Extensión no validada, extesiones validads'+extensionesValidas.join(', ') });
        }else{
         
            let nombreArchivo = nombredivido[0]+""+Date.now()+"."+extension;
            let path = `./public/${nombreArchivo}`;
            
            Movie.findOneAndUpdate({_id: id_movie},{ $set:{ imagen: nombreArchivo} }, (errMovie, movieRes) =>{
                if ( errMovie) {
                    res.status(200).json({ message: 'no se ha encontrado la película' });
                }

                if ( movieRes ) {

                    if (!fs.existsSync('./public/imagenes')){
                        fs.mkdirSync('./public/imagenes');
                        
                        path =`./public/imagenes/${nombreArchivo}`;
                        archivo.mv(path, err =>{
                            if(err){
                                res.status(400).json({ message:'no se ha subido archivo', err});
                            }else{
                                if( !fs.existsSync(movieRes.imagen) ){
                                    try {
                                        fs.unlink('./public/imagenes/' + movieRes.imagen);
                                    } catch (error) {
                                       return res.status(200).json({ message: 'se ha subido el archivo', movie: movieRes, imagen: 'imagen eliminada' });
                                    }
                                    res.status(200).json({ message: 'se ha subido el archivo', movie: movieRes, imagen: 'imagen eliminada' });
                                }else{
                                    
                                    res.status(200).json({ message: 'se ha subido el archivo', movie: movieRes});
                                }
                                
                            }
                            
                        });
                    }else{
                        path =`./public/imagenes/${nombreArchivo}`;
                        archivo.mv(path, err =>{
                            if(err){
                                res.status(400).json({ message:'no se ha subido archivo', err});
                            }else{
                                if( !fs.existsSync(movieRes.imagen) ){
                                    console.log('./public/imagenes/' + movieRes.imagen);
                                   try {
                                    fs.unlinkSync('./public/imagenes/' + movieRes.imagen);
                                   } catch (error) {
                                    return res.status(200).json({ message: 'se ha subido el archivo', movie: movieRes, imagen: 'imagen eliminada'});

                                   }
                                    res.status(200).json({ message: 'se ha subido el archivo', movie: movieRes, imagen: 'imagen eliminada'});
                                }else{
                                    es.status(200).json({ message: 'se ha subido el archivo', movie: movieRes }); 
                                }
                            }
                            
                        });
                    }
                    
                }else{
                    res.json({message: 'error'});
                }
            });
           
          
           
        }

        
    }

    
}

module.exports = {
    listarPelicula,
    crearPelicula,
    modificarPelicula,
    borrarPelicula
}