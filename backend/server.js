const express = require("express");
const cors = require("cors");
const { createPool } = require('mysql');

const app = express();

app.use(express.json());
app.use(cors());

const db = createPool(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"results"
    }
);




app.get("/subject",(req,res)=>{
    const sql1 = "select * from subjects";

    db.query(sql1,(err,data)=>{
        if(err) return res.json(err);
        else return res.json(data);
    });

});

app.get("/maxid",(req,res)=>{
    const sql1 = "(select max(id) as id from class_1 union select max(id) as id from class_2 union select max(id) as id from class_3 union select max(id) as id from class_4 union select max(id) as id from class_5 union select max(id) as id from class_6 union select max(id) as id from class_7 union select max(id) as id from class_8 union select max(id) as id from class_9 union select max(id) as id from class_10 union select max(id) as id from class_11 union select max(id) as id from class_12 union select max(id) as id from class_13 union select max(id) as id from class_14) order by id desc";

    db.query(sql1,(err,data)=>{
        if(err) return res.json(err);
        else return res.json(data);
    });

});

app.get("/maxrollNo/:maxrollno",(req,res)=>{

    const maxrollNo = req.params.maxrollno;


    const sql1 = "select rollno from class_"+maxrollNo; 

    db.query(sql1,(err,data)=>{
        if(err) return res.json(err);
        else return res.json(data);
    });

});
app.get("/view/:classID/:rollNo",(req,res)=>{
    const classID = req.params.classID;

    const rollNo = req.params.rollNo;

    const sql = "select * from class_"+classID+" where rollno="+rollNo;

    db.query(sql,(err,data)=>{
        if(err) return res.json(err);

        else return res.json(data);
    });
});

app.get("/student/:studentID",(req,res)=>{

    const s_id = req.params.studentID;
    const sql = "select * from class_"+s_id;

    db.query(sql,(err,data)=>{
        if(err) return res.json(err);

        else return res.json(data);
    })
});

app.get("/getstudent/:classjoi/:rollnojoi",(req,res)=>{
    const classid = req.params.classjoi;
    const rollNo = req.params.rollnojoi;

    const sql = "select * from class_"+classid+" where rollno = "+rollNo;

    db.query(sql, (err,data)=>{
        if(err) return res.json(sql);
        else return res.json(data);
    });

});
app.get("/top/:nums/:classid/:subject",(req,res)=>{

    const num = req.params.nums;

    const cla = req.params.classid;

    const subj = req.params.subject;

    const sql = "SELECT * FROM( SELECT *, DENSE_RANK() over(ORDER BY "+subj+" DESC) AS ranking FROM class_"+cla+") AS k WHERE ranking <= "+num;

    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        else return res.json(data);
    });
});

app.post('/create',(req,res)=>{

    const total = Number(req.body.sub1)+ Number(req.body.sub2)+ Number(req.body.sub3)+ Number(req.body.sub4)+ Number(req.body.sub5)+ Number(req.body.sub6)+ Number(req.body.sub7)+Number(req.body.sub8);

    const sql = "INSERT INTO `class_"+Number(req.body.classID)+"` (`name` , `id` , `rollno` , `total`, `"+(req.body.subject.sub1.toLowerCase())+"` , `"+req.body.subject.sub2.toLowerCase()+"` , `"+req.body.subject.sub3.toLowerCase()+"` , `"+req.body.subject.sub4.toLowerCase()+"` , `"+req.body.subject.sub5.toLowerCase()+"` , `"+req.body.subject.sub6.toLowerCase()+"` , `"+req.body.subject.sub7.toLowerCase()+"` , `"+req.body.subject.sub8.toLowerCase()+"` ) VALUES ( '"+req.body.name.toString()+"' , '"+Number(req.body.nextId)+"' , '"+Number(req.body.nextRollNo)+"' , '"+Number(total)+"' , '"+Number(req.body.sub1)+"' , '"+Number(req.body.sub2)+"' , '"+Number(req.body.sub3)+"' , '"+Number(req.body.sub4)+"' , '"+Number(req.body.sub5)+"' , '"+Number(req.body.sub6)+"' , '"+Number(req.body.sub7)+"' , '"+Number(req.body.sub8)+"' )";

    db.query(sql ,(err, data)=>{
        if(err) return res.json(sql);
        else return res.json(data);
    });
});

app.post('/create1',(req,res)=>{


    const total = Number(req.body.sub1)+ Number(req.body.sub2)+ Number(req.body.sub3)+ Number(req.body.sub4)+ Number(req.body.sub5)+ Number(req.body.sub6)+ Number(req.body.sub7);
    const sql = "INSERT INTO `class_"+Number(req.body.classID)+"` (`name` , `id` , `rollno` , `total`, `"+(req.body.subject.sub1.toLowerCase())+"` , `"+req.body.subject.sub2.toLowerCase()+"` , `"+req.body.subject.sub3.toLowerCase()+"` , `"+req.body.subject.sub4.toLowerCase()+"` , `"+req.body.subject.sub5.toLowerCase()+"` , `"+req.body.subject.sub6.toLowerCase()+"` , `"+req.body.subject.sub7.toLowerCase()+"` ) VALUES ( '"+req.body.name.toString()+"' , '"+Number(req.body.nextId)+"' , '"+Number(req.body.nextRollNo)+"' , '"+Number(total)+"' , '"+Number(req.body.sub1)+"' , '"+Number(req.body.sub2)+"' , '"+Number(req.body.sub3)+"' , '"+Number(req.body.sub4)+"' , '"+Number(req.body.sub5)+"' , '"+Number(req.body.sub6)+"' , '"+Number(req.body.sub7)+"' )";
   

    db.query(sql ,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(data);
    });
});

app.post('/create2',(req,res)=>{


    const total = Number(req.body.sub1)+ Number(req.body.sub2)+ Number(req.body.sub3)+ Number(req.body.sub4)+ Number(req.body.sub5)+ Number(req.body.sub6);
    const sql = "INSERT INTO `class_"+Number(req.body.classID)+"` (`name` , `id` , `rollno` , `total`, `"+(req.body.subject.sub1.toLowerCase())+"` , `"+req.body.subject.sub2.toLowerCase()+"` , `"+req.body.subject.sub3.toLowerCase()+"` , `"+req.body.subject.sub4.toLowerCase()+"` , `"+req.body.subject.sub5.toLowerCase()+"` , `"+req.body.subject.sub6.toLowerCase()+"` ) VALUES ( '"+req.body.name.toString()+"' , '"+Number(req.body.nextId)+"' , '"+Number(req.body.nextRollNo)+"' , '"+Number(total)+"' , '"+Number(req.body.sub1)+"' , '"+Number(req.body.sub2)+"' , '"+Number(req.body.sub3)+"' , '"+Number(req.body.sub4)+"' , '"+Number(req.body.sub5)+"' , '"+Number(req.body.sub6)+"' )";


    db.query(sql ,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(data);
    });
});
app.post('/create3',(req,res)=>{

    const total = Number(req.body.sub1)+ Number(req.body.sub2)+ Number(req.body.sub3)+ Number(req.body.sub4)+ Number(req.body.sub5);


    const sql = "INSERT INTO `class_"+Number(req.body.classID)+"` (`name` , `id` , `rollno` , `total`, `"+(req.body.subject.sub1.toLowerCase())+"` , `"+req.body.subject.sub2.toLowerCase()+"` , `"+req.body.subject.sub3.toLowerCase()+"` , `"+req.body.subject.sub4.toLowerCase()+"` , `"+req.body.subject.sub5.toLowerCase()+"` ) VALUES ( '"+req.body.name.toString()+"' , '"+Number(req.body.nextId)+"' , '"+Number(req.body.nextRollNo)+"' , '"+Number(total)+"' , '"+Number(req.body.sub1)+"' , '"+Number(req.body.sub2)+"' , '"+Number(req.body.sub3)+"' , '"+Number(req.body.sub4)+"' , '"+Number(req.body.sub5)+"' )";
   

    db.query(sql ,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(data);
    });
});

app.post('/create6',(req,res)=>{

    const total = Number(req.body.sub1)+ Number(req.body.sub2)+ Number(req.body.sub3)+ Number(req.body.sub4)+ Number(req.body.sub5)+ Number(req.body.sub6);

    const sql="INSERT INTO `class_6` (`id`, `rollno`, `name`, `Class`, `maths`, `social_science`, `gujrati`, `hindi`, `english`, `computer`, `total`) VALUES ( '"+Number(req.body.nextId)+"' , '"+Number(req.body.nextRollNo)+"' , '"+req.body.name.toString()+"' , '"+req.body.classID.toString()+"' , '"+Number(req.body.sub2)+"' , '"+Number(req.body.sub6)+"' , '"+Number(req.body.sub3)+"' , '"+Number(req.body.sub5)+"' , '"+Number(req.body.sub1)+"' , '"+Number(req.body.sub4)+"' , '"+Number(total)+"' )";

    db.query(sql, (err,data)=>{
        if(err) return res.json(sql);
        else return res.json(data);
    });

});
app.put('/update1',(req,res)=>{

    const total = Number(req.body.sub1)+Number(req.body.sub2)+Number(req.body.sub4)+Number(req.body.sub5)+Number(req.body.sub15)+Number(req.body.sub6);
    const sql = "UPDATE `class_1` SET `name` = '"+req.body.name.toString()+"' , `maths` = "+Number(req.body.sub2)+", `kalrav` = "+Number(req.body.sub15)+", `hindi` = "+Number(req.body.sub6)+" , `english` = "+Number(req.body.sub1)+", `computer` = "+Number(req.body.sub5)+" , `gujrati` = "+Number(req.body.sub4)+" , `total` = "+Number(total)+"  WHERE `class_1`.`rollno` = "+Number(req.body.nextRollNo)+"";

    db.query(sql,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(sql)
    });
});
app.put('/update2',(req,res)=>{

    const total = Number(req.body.sub1)+Number(req.body.sub2)+Number(req.body.sub4)+Number(req.body.sub5)+Number(req.body.sub6)+Number(req.body.sub14);
    const sql = "UPDATE `class_2` SET `name` = '"+req.body.name.toString()+"' , `maths` = "+Number(req.body.sub2)+", `kallol` = "+Number(req.body.sub14)+", `hindi` = "+Number(req.body.sub6)+" , `english` = "+Number(req.body.sub1)+", `computer` = "+Number(req.body.sub5)+" , `gujrati` = "+Number(req.body.sub4)+" , `total` = "+Number(total)+"  WHERE `rollno` = "+Number(req.body.nextRollNo)+"";

    db.query(sql,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(sql)
    });
});

app.put('/update3',(req,res)=>{

    const total = Number(req.body.sub1)+Number(req.body.sub2)+Number(req.body.sub4)+Number(req.body.sub5)+Number(req.body.sub16)+Number(req.body.sub6);
    const sql = "UPDATE `class_3` SET `name` = '"+req.body.name.toString()+"' , `maths` = "+Number(req.body.sub2)+", `mari_aaspaas` = "+Number(req.body.sub16)+", `hindi` = "+Number(req.body.sub6)+" , `english` = "+Number(req.body.sub1)+", `computer` = "+Number(req.body.sub5)+" , `gujrati` = "+Number(req.body.sub4)+" , `total` = "+Number(total)+"  WHERE `rollno` = "+Number(req.body.nextRollNo)+"";

    db.query(sql,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(data)
    });
});

app.put('/update4',(req,res)=>{

    const total = Number(req.body.sub1)+Number(req.body.sub2)+Number(req.body.sub4)+Number(req.body.sub5)+Number(req.body.sub17)+Number(req.body.sub6);
    const sql = "UPDATE `class_4` SET `name` = '"+req.body.name.toString()+"' , `maths` = "+Number(req.body.sub2)+", `aapni_aaspaas` = "+Number(req.body.sub17)+", `hindi` = "+Number(req.body.sub6)+" , `english` = "+Number(req.body.sub1)+", `computer` = "+Number(req.body.sub5)+" , `gujrati` = "+Number(req.body.sub4)+" , `total` = "+Number(total)+"  WHERE `rollno` = "+Number(req.body.nextRollNo)+"";

    db.query(sql,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(data)
    });
});

app.put('/update5',(req,res)=>{

    const total = Number(req.body.sub1)+Number(req.body.sub2)+Number(req.body.sub4)+Number(req.body.sub5)+Number(req.body.sub18)+Number(req.body.sub6);
    const sql = "UPDATE `class_5` SET `name` = '"+req.body.name.toString()+"' , `maths` = "+Number(req.body.sub2)+", `sauni_aaspaas` = "+Number(req.body.sub18)+", `hindi` = "+Number(req.body.sub6)+" , `english` = "+Number(req.body.sub1)+", `computer` = "+Number(req.body.sub5)+" , `gujrati` = "+Number(req.body.sub4)+" , `total` = "+Number(total)+"  WHERE `rollno` = "+Number(req.body.nextRollNo)+"";

    db.query(sql,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(data)
    });
});

app.put('/update6',(req,res)=>{

    const total = Number(req.body.sub1)+Number(req.body.sub2)+Number(req.body.sub4)+Number(req.body.sub5)+Number(req.body.sub8)+Number(req.body.sub6);
    const sql = "UPDATE `class_6` SET `name` = '"+req.body.name.toString()+"' , `maths` = "+Number(req.body.sub2)+", `social_science` = "+Number(req.body.sub8)+", `hindi` = "+Number(req.body.sub6)+" , `english` = "+Number(req.body.sub1)+", `computer` = "+Number(req.body.sub5)+" , `gujrati` = "+Number(req.body.sub4)+" , `total` = "+Number(total)+"  WHERE `rollno` = "+Number(req.body.nextRollNo)+"";

    db.query(sql,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(sql)
    });
});

app.put('/update7',(req,res)=>{

    const total = Number(req.body.sub1)+Number(req.body.sub2)+Number(req.body.sub4)+Number(req.body.sub5)+Number(req.body.sub7)+Number(req.body.sub8)+Number(req.body.sub9)+Number(req.body.sub6);

    const sql = "UPDATE `class_7` SET `name` = '"+req.body.name.toString()+"' , `maths` = "+Number(req.body.sub2)+", `social_science` = "+Number(req.body.sub8)+", `sanskrit` = "+Number(req.body.sub9)+", `science` = "+Number(req.body.sub7)+", `hindi` = "+Number(req.body.sub6)+" , `english` = "+Number(req.body.sub1)+", `computer` = "+Number(req.body.sub5)+" , `gujrati` = "+Number(req.body.sub4)+" , `total` = "+Number(total)+"  WHERE `rollno` = "+Number(req.body.nextRollNo)+"";

    db.query(sql,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(data)
    });
});
app.put('/update8',(req,res)=>{
    const total = Number(req.body.sub1)+Number(req.body.sub2)+Number(req.body.sub4)+Number(req.body.sub5)+Number(req.body.sub7)+Number(req.body.sub8)+Number(req.body.sub9)+Number(req.body.sub6);
    const sql = "UPDATE `class_8` SET `name` = '"+req.body.name.toString()+"' , `maths` = "+Number(req.body.sub2)+", `social_science` = "+Number(req.body.sub8)+", `sanskrit` = "+Number(req.body.sub9)+", `science` = "+Number(req.body.sub7)+", `hindi` = "+Number(req.body.sub6)+" , `english` = "+Number(req.body.sub1)+", `computer` = "+Number(req.body.sub5)+" , `gujrati` = "+Number(req.body.sub4)+" , `total` = "+Number(total)+"  WHERE `rollno` = "+Number(req.body.nextRollNo)+"";

    db.query(sql,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(data)
    });
});

app.put('/update9',(req,res)=>{
    const total = Number(req.body.sub1)+Number(req.body.sub2)+Number(req.body.sub4)+Number(req.body.sub5)+Number(req.body.sub7)+Number(req.body.sub8)+Number(req.body.sub9)+Number(req.body.sub6);
    const sql = "UPDATE `class_9` SET `name` = '"+req.body.name.toString()+"' , `maths` = "+Number(req.body.sub2)+", `social_science` = "+Number(req.body.sub8)+", `sanskrit` = "+Number(req.body.sub9)+", `science` = "+Number(req.body.sub7)+", `hindi` = "+Number(req.body.sub6)+" , `english` = "+Number(req.body.sub1)+", `computer` = "+Number(req.body.sub5)+" , `gujrati` = "+Number(req.body.sub4)+" , `total` = "+Number(total)+"  WHERE `rollno` = "+Number(req.body.nextRollNo)+"";

    db.query(sql,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(data)
    });
});

app.put('/update10',(req,res)=>{
    const total = Number(req.body.sub1)+Number(req.body.sub2)+Number(req.body.sub4)+Number(req.body.sub5)+Number(req.body.sub7)+Number(req.body.sub8)+Number(req.body.sub9);
    const sql = "UPDATE `class_10` SET `name` = '"+req.body.name.toString()+"' , `maths` = "+Number(req.body.sub2)+", `social_science` = "+Number(req.body.sub8)+", `sanskrit` = "+Number(req.body.sub9)+", `science` = "+Number(req.body.sub7)+", `english` = "+Number(req.body.sub1)+", `computer` = "+Number(req.body.sub5)+" , `gujrati` = "+Number(req.body.sub4)+" , `total` = "+Number(total)+"  WHERE `rollno` = "+Number(req.body.nextRollNo)+"";

    db.query(sql,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(data)
    });
});

app.put('/update11',(req,res)=>{

    const total = Number(req.body.sub2)+Number(req.body.sub11)+Number(req.body.sub9)+Number(req.body.sub13)+Number(req.body.sub1);
    const sql = "UPDATE `class_11` SET `name` = '"+req.body.name.toString()+"' , `maths` = "+Number(req.body.sub2)+", `chemistry` = "+Number(req.body.sub11)+", `sanskrit` = "+Number(req.body.sub9)+", `physics` = "+Number(req.body.sub13)+" , `english` = "+Number(req.body.sub1)+", `total` = "+Number(total)+"  WHERE `rollno` = "+Number(req.body.nextRollNo)+"";

    db.query(sql,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(data)
    });
});
app.put('/update12',(req,res)=>{
    const total = Number(req.body.sub3)+Number(req.body.sub11)+Number(req.body.sub5)+Number(req.body.sub13)+Number(req.body.sub1);
    const sql = "UPDATE `class_12` SET `name` = '"+req.body.name.toString()+"' , `biology` = "+Number(req.body.sub3)+", `chemistry` = "+Number(req.body.sub11)+", `computer` = "+Number(req.body.sub5)+", `physics` = "+Number(req.body.sub13)+" , `english` = "+Number(req.body.sub1)+", `total` = "+Number(total)+"  WHERE `rollno` = "+Number(req.body.nextRollNo)+"";

    db.query(sql,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(sql)
    });
});
app.put('/update13',(req,res)=>{
    const total = Number(req.body.sub2)+Number(req.body.sub11)+Number(req.body.sub5)+Number(req.body.sub13)+Number(req.body.sub1);
    const sql = "UPDATE `class_13` SET `name` = '"+req.body.name.toString()+"' , `maths` = "+Number(req.body.sub2)+", `chemistry` = "+Number(req.body.sub11)+", `computer` = "+Number(req.body.sub5)+", `physics` = "+Number(req.body.sub13)+" , `english` = "+Number(req.body.sub1)+", `total` = "+Number(total)+"  WHERE `rollno` = "+Number(req.body.nextRollNo)+"";

    db.query(sql,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(data)
    });
});

app.put('/update14',(req,res)=>{
    const total = Number(req.body.sub3)+Number(req.body.sub11)+Number(req.body.sub9)+Number(req.body.sub13)+Number(req.body.sub1);
    const sql = "UPDATE `class_14` SET `name` = '"+req.body.name.toString()+"' , `biology` = "+Number(req.body.sub3)+", `chemistry` = "+Number(req.body.sub11)+", `sanskrit` = "+Number(req.body.sub9)+", `physics` = "+Number(req.body.sub13)+" , `english` = "+Number(req.body.sub1)+", `total` = "+Number(total)+"  WHERE `rollno` = "+Number(req.body.nextRollNo)+"";

    db.query(sql,(err,data)=>{
        if(err) return res.json(sql);
        else return res.json(data)
    });
});
app.get('/delete/:claID/:id',(req,res)=>{
    const clas = req.params.claID;
    const id = Number(req.params.id);

    const sql = "delete from class_"+clas+" where id = "+id;

    db.query(sql,(err, data)=>{
        if(err) return res.json(sql);
        else return res.json(data);
    });
});

app.get('/updatename/:cla/:rollno/:name',(req,res)=>{
    const cla = req.params.cla;
    const rollno = req.params.rollno;
    const updatename = req.params.name

    const sql = "update class_"+cla+" set name = '"+updatename+"' where rollno = "+Number(rollno);
    db.query(sql, (err,data)=>{
        if(err) return console.log(sql);
        else return res.json(data);
    });

});

app.get('/updateid/:cla/:rollno/:id',(req,res)=>{
    const cla = req.params.cla;
    const rollno = req.params.rollno;
    const updatename = req.params.id;

    const sql = "update class_"+cla+" set id = '"+updatename+"' where rollno = "+Number(rollno);
    db.query(sql, (err,data)=>{
        if(err) return console.log(sql);
        else return res.json(data);
    });

});

app.get('/maxidid',(req,res)=>{
    const sql1 = "(select (id) as id from class_1 union select (id) as id from class_2 union select (id) as id from class_3 union select (id) as id from class_4 union select (id) as id from class_5 union select (id) as id from class_6 union select (id) as id from class_7 union select (id) as id from class_8 union select (id) as id from class_9 union select (id) as id from class_10 union select (id) as id from class_11 union select (id) as id from class_12 union select (id) as id from class_13 union select (id) as id from class_14) order by id asc";

    db.query(sql1,(err,data)=>{
        if(err) return console.log(sql1);
        else return res.json(data);
    });
});

app.get('/updatesubj/:classes/:rollno/:subt1/:marks',(req,res)=>{
    const classes = req.params.classes;
    const rollno = req.params.rollno;
    const subt1 = req.params.subt1;
    const marks = req.params.marks;
    const sql = "update class_"+classes+" set "+subt1.toString().toLowerCase()+" = "+marks+" where rollno = "+rollno; 

    db.query(sql, (err,data)=>{
        if(err) return console.log(sql);
        else return res.json(data);
    });
});
app.get('/updatetotal/:classes/:rollno/:total',(req,res)=>{
    const classes = req.params.classes;
    const rollno = req.params.rollno;
    const total = req.params.total;
    const sql = "update class_"+classes+" set total = "+total+" where rollno = "+rollno; 

    db.query(sql, (err,data)=>{
        if(err) return console.log(sql);
        else return res.json(data);
    });
});


app.listen(8081, ()=>{
    console.log("Your development server is running on http://localhost:8081/");
});