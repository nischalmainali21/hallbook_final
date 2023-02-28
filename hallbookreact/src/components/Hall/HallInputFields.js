const HallInputFields = [
    {
        labelText:"Event Manager Name:",
        id:"eventManager",
        name:"eventManager",
        type:'text',
        isRequired:true,
        placeholder:"Event Manager",
    },
    {
        labelText:"Oragnizing Club:",
        id:"orgClub",
        name:"orgClub",
        type:'text',
        isRequired:false,
        placeholder:"Organizing Club",
        optionList :["A club","B Club","C Club"],
        optionListName:"clubs"
    },
    {
        labelText:"Event Name:",
        id:"eventName",
        name:'eventName',
        type:'text',
        isRequired:true,
        placeholder:"Event Name",
    },
    {
        labelText:"Email:",
        id:"email",
        name:'email',
        type:'email',
        isRequired:true,
        placeholder:"075BCT00.<name>@pcampus.edu.np",
    },
    {
        labelText:"Phone Number:",
        id:"pnumber",
        name:'pnumber',
        type:'tel',
        inputmode:'numeric',
        isRequired:true,
        placeholder:"xxxx-xxx-xxx",
        pattern:"[0-9]{10}",
        maxLength:10,
        minLength:10,
    }
]

export default HallInputFields