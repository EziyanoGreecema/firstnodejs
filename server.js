const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000

const  mongoose= require('mongoose')
const Content= require('./app/models/appmodel')




// Database connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : false });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});


//use view engine
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: false }))


//app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))



const stat= path.join(__dirname,"/public/")
//middleware
app.use(express.static(stat))



app.post('/send', async(req, res) => {


     
  var contact = new Content({

    name: req.body.name,
    email: req.body.email,
    markdown: req.body.markdown

})
try{
    contact=await contact.save()
    res.redirect('/sample')
    console.log(contact)
}catch(e)
{
    console.log('an error occured')
}



})



app.get('/samp', (req, res) => {



Content.find().sort({createdAt: 'desc' })
.then((result) =>{


res.render('sample', { 'pizzas':result })

console.log(result)
}).catch((err) =>{
console.log(err)
})
  
  


})
 


    
app.get('/about', (req, res) => {

  res.render('about')
})
  
app.get('/home', (req, res) => {

  res.render('index')
})
  
app.get('/contact', (req, res) => {

  res.render('contact')
})




app.listen(PORT , () => {
   

    console.log(`Listening on port ${PORT}`)
    console.log("with all the good girls go to hell:")
    console.log(path.join(__dirname,"/public/"))
   
})