// const express=require('express');
// const path=require('path');
// const port=8000;
// const app=express();
// app.set('view engine','ejs');
// app.set('views',path.join(__dirname,'views'));
// app.use(express.urlencoded());
// app.use(express.static('assets'));
// //middleware 1
// //app.use(function(req,res,next){
//  // console.log('middleware 1 called');
// //  req.myName="Arpan";
// //   next();
// // });
// //middleware 2
// // app.use(function(req,res,next){
// //   //console.log('middleware 2 called');
// //   console.log('My Name from MW2',req.myName);
// //   next();
// // });
// var contactList=[
//   {
//     name:"Arpan",
//     phone:"111111111"
//   },
//   {
//     name:"Tony Stark",
//     phone:"1234567890"
//   },
//   {
//     name:"Coding ninjas",
//     phone:"2316537634"
//   }
// ]



// app.get('/',function(req,res){
//   //  console.log(__dirname);
//   //  res.end('<h1>cool, it is running! or is it?</h1>');
//   console.log(req.myName);
//    return res.render('home',{title:"Contact List",
//    contact_list:contactList
//   });
// });
// app.get('/practise',function(req,res){
//   return res.render('practise',{title:"Let us play with ejs"});
// });
  
// app.post('/create-contact', function(req,res){
//   // contactList.push({
//   //   name:req.body.name,
//   //   phone:req.body.phone
//   // });
//   contactList.push(req.body);
//   return res.redirect('/back');
// });

// app.get('/delete-contact',function(req,res){
//   console.log(req.query);
// let phone=req.query.phone;
// let contactIndex=contactList.findIndex(contact => contact.phone==phone);

// if(contactIndex != -1){
//   contactList.splice(contactIndex, 1);
// }
// return res.redirect('back');
// });

// app.listen(port,function(err){
//     if(err){ console.log('Error in running the server',err);}
//     console.log('Yup!My Express Server is running on port:',port);
// });

const express=require('express');
const path=require('path');
const port=5000;
  const db=require('./config/mongoose');
  const Contact =require('./models/contact');
const app=express();
 app.set('view engine','ejs');
 app.set('views',path.join(__dirname,'views'));
 app.use(express.urlencoded());
 app.use(express.static('assets'));
 //middleware1
//  app.use(function(req,res,next){
//     //console.log('middleware 1 called');
//     req.myName="Arpan";
//     next();
//  });

//  app.use(function(req,res,next){
//     console.log('My Name from MW2',req.myName);
//     next();
//  });

var contactList=[
    {
        name:"Arpan",
        phone:"11111111"
    },
    {
        name:"Tonystark",
        phone:"1223333435"
    },
    {
        name:"Coding ninjas",
        phone:"2345666666"
    }
]



 app.get('/',function(req,res){
   // console.log('from the get route controller',req.myName);
  //  return res.render('home',{title:"Contact List"
  Contact.find({}).then(function(contacts){
    // if(err){
    //   console.log('Error in fetching contacts from db');
    //   return;
    // }
    return res.render('home',
    {title:"Contact List",
  contact_list:contacts
});



 });

  });
  
//     return res.render('home',
//     {title:"Contact List",
//   contact_list:contactList
// });



//  });
 app.get('/practise',function(req,res){
    
    return res.render('practise',{title:"Let us play with ejs"});
 });
  app.post('/create-contact', function(req,res){
//     // contactList.push({
//     //     name:req.body.name,
//     //     phone:req.body.phone
//     // });
//     contactList.push(req.body);
// //    Contact.create({
// //     name:req.body.name,
// //     phone:req.body.phone
// //    },function(err, newContact){
// //     if(err){console.log('error in creating a contact!');
// //   return;}
// //   console.log('**********',newContact);
// //   return res.redirect('back');
   
// //    });
// return res.redirect('back');
//   });
// Contact.create({
//   name: req.body.name,
//   phone: req.body.name
// }, function(err, newContact){
//   if(err){console.log('Error in creating a contact!')
//       return;}
//       console.log('******', newContact);
//       return res.redirect('back');
// })


// });

//  app.get('/delete-contact/:phone',function(req,res){
//   console.log(req.params);
//   let phone=req.params.phone;
//  });


Contact.create({
  name: req.body.name,
  phone: req.body.phone
}).then( function( newContact){
  // {console.log('Error in creating a contact!')
  //     return;}
      console.log('******', newContact);
      return res.redirect('back');
})


});
app.get('/delete-contact/', function(req,res){
  // console.log(req.query);
  // let phone=req.query.phone;
  // get the id from query in the ul
  let id=req.query.id;

  Contact.findByIdAndDelete(id).then(function(err){
    // if(err){
    //   console.log('error in deleting an object from database');
    //   return;
    // }
    return res.redirect('back');
  });
});

//    let contactIndex=contactList.findIndex(contact =>contact.phone ==phone);
//    if(contactIndex != -1){
//      contactList.splice(contactIndex,1);
//    }
//    return res.redirect('back');
// });
 

app.listen(port,function(err){
    if(err){ console.log('Error in running the server',err);}
    console.log('Yup!My Express Server is running on port:',port);
});