const DAYS = 6;
const LIMIT = 30;
let studentReport = [11, 42, 33, 64, 29, 37, 44];

console.log("FOR:")
for (let i = 0; i < studentReport.length; i++)
{
    if (studentReport[i] < LIMIT)
    {
        console.log(studentReport[i]);
    }    
}

let i = 0;
console.log("\nWHILE:")
while (i < studentReport.length)
{
    if (studentReport[i] < LIMIT)
    {
        console.log(studentReport[i]);
    }
    i++;
}

console.log("\nFOREACH")
studentReport.forEach(function (item) {
    if (item < LIMIT) {
        console.log(item);
    }
});

console.log("\nFORIN")
for (let grade in studentReport)
{
    if (studentReport[grade] < LIMIT)
    {
        console.log(studentReport[grade]);
    }
}