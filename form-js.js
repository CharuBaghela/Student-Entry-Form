const form = document.getElementById("form");
const total = document.getElementById("total");
const average = document.getElementById("average");
const list=document.getElementById("list");
const submit = document.getElementById("submit");

let studentArray = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const rowData = new FormData(e.target);
    const student = Object.fromEntries(rowData);

    student.marks = Number(student.marks);

    studentArray.push(student);//add data

    // console.log(studentArray);
    renderList();
    updateStats();
});
const renderList = (() => {
    list.innerHTML="";
    studentArray.forEach((student, index) =>{
        const li = document.createElement("li");

        li.textContent = `${student.name}-${student.marks}`;

        //student list condition
        if(student.marks >=90){
            li.classList.add("top-student");
        }else if(student.marks >=70){
            li.classList.add("good-student");
        }else if(student.marks>=50){
            li.classList.add("average-student");
        }else{
            li.classList.add("below-average");
        };
        
        const deleBtn = document.createElement("button");
        deleBtn.textContent = "Delete";
        deleBtn.classList.add("delete-btn");
        
        deleBtn.addEventListener("click", () => {
            studentArray=studentArray.filter((item,i)=> i !== index);
            

            renderList();
            updateStats();
        });
        li.appendChild(deleBtn);
        list.appendChild(li);
    });
});

//total
const updateStats =(()=>{
    total.innerText = studentArray.length;

    const sum = studentArray.reduce((accu, current) => {
        return accu + current.marks;
    },0);

    const avg = sum / studentArray.length;

    average.textContent = avg;  
});