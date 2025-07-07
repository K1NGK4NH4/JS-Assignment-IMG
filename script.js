let MyAPIKey
if(localStorage.getItem("API_KEY")){
    MyAPIKey=localStorage.getItem("API_KEY")
}
else{
    MyAPIKey=prompt("Enter Your valid API_KEY here")
    localStorage.setItem("API_KEY",MyAPIKey)
}


let container=document.querySelector(".chat-container")
 let historyPanel=document.querySelector(".history")
 let input=document.getElementById("userinput")
 let send=document.getElementById("sendBtn")
 let historyele=document.querySelector('.box') 
let chat=document.getElementById('messages')
 
//showing data from local storage
const show=(modelIndex)=>{
    if(historyele){
        historyele.innerHTML=" ";
    }
    let data=localStorage.getItem(`message${modelIndex}`);
    let arr=[];
    try {
        arr = data ? JSON.parse(data) : [];
    } catch {
        arr = [];
    }
    if(arr.length === 0){
        let a="No Chat History";
        localhistoryQuestion(a);
    }
    else{
        for(let i=0;i<arr.length;i++){
            let ele=arr[i]          
            localhistoryQuestion(ele.question)
        }
    }
}


let model=["cypher-alpha","deepseek-r1-0528","qwen3-32b","mai-ds-r1",
    "deepseek-chat-v3-0324","mistral-small-3.2-24b-instruct"]

let modelIndex=0
select=document.querySelector('#models');

select.addEventListener('change',(e)=>{
    modelIndex=model.indexOf(e.target.value)
    console.log(modelIndex);
    show(modelIndex)
})



 let historyBtn=document.querySelector(".historybtn")
 historyBtn.addEventListener('click',()=>{
    historyPanel.classList.toggle('show');
    container.classList.toggle('dim');
})


function appendtoChat(question){
    let newchat=document.createElement('div');
    newchat.className='newMessage';
    newchat.innerHTML=question;
    chat.append(newchat);
}


function appendans(answer){
    let newchat=document.createElement('div');
    newchat.className='newAnswer';
    newchat.innerHTML=answer;
    chat.append(newchat);
}


function localhistoryQuestion(question){
    let ele=document.createElement('li');
    ele.className='chatHistory'
    ele.innerHTML=question;

    //  show stored chat
    ele.addEventListener('click', () => {
    const arr = JSON.parse(localStorage.getItem(`message${modelIndex}`) || '[]');
    const match = arr.find(x => x.question === question);
    if (match) {
      appendtoChat(match.question);
      appendans(match.answer);
    }
  },{once:true});// if you donot want to call once then donot use once:true Its my chatgpt so my rule applied

    historyele.prepend(ele);
}



//saving to local storage
function saveTolocalStorage(question,answer,modelIndex){
   let mess=localStorage.getItem(`message${modelIndex}`);
   if(mess== null){
    let json=[];
    json.push({question:question,answer:answer})
    localStorage.setItem(`message${modelIndex}`,JSON.stringify(json))
   }
   else{
    let json=JSON.parse(localStorage.getItem(`message${modelIndex}`));
    json.push({question:question,answer:answer})
    localStorage.setItem(`message${modelIndex}`,JSON.stringify(json))
   }
}


//Main function for fetching data
//API Models
const getData={}
getData["model0"] = async function func(){
    let userinput=input.value
    input.value='';
    appendtoChat(userinput);
   
try{
    const data=await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",                     
            headers: {
                "Authorization": `Bearer ${MyAPIKey}`,  
                "HTTP-Referer": "<YOUR_SITE_URL>",     
                "X-Title": "<YOUR_SITE_NAME>",          
                "Content-Type": "application/json"    
            },
            body: JSON.stringify({            
                model: "openrouter/cypher-alpha:free",
                messages: [
                { role: "user", content: userinput }
                ]
            })
            })

    
        if(!data.ok){
            const errorData = await data.json();
            let error=`API Error: ${data.status}` ;
            appendans(error);
        }

        const json = await data.json();                             
        const answer = json.choices[0].message.content;             
        appendans(answer);
        saveTolocalStorage(userinput,answer,0)
         show(0)
    }
    catch(error){
        appendans(error.message);
    }
}
getData["model1"] = async function func(){
    let userinput=input.value
    input.value='';
    appendtoChat(userinput);
   
try{
    const data=await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${MyAPIKey}`,
                        "HTTP-Referer": "<YOUR_SITE_URL>", 
                        "X-Title": "<YOUR_SITE_NAME>", 
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "model": "deepseek/deepseek-r1-0528:free",
                        "messages": [
                        {
                            "role": "user",
                            "content": userinput
                        }
                        ]
                    })
                    })

        if(!data.ok){
            const errorData = await data.json();
            let error=`API Error: ${data.status}` ;
            appendans(error);
        }

        const json = await data.json();                             
        const answer = json.choices[0].message.content;             
        appendans(answer);
        saveTolocalStorage(userinput,answer,1)
         show(1)
    }
    catch(error){
        appendans(error.message);
    }
}
getData["model3"] = async function func(){
    let userinput=input.value
    input.value='';
    appendtoChat(userinput);
   
try{
    const data=await fetch("https://openrouter.ai/api/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${MyAPIKey}`,
                            "HTTP-Referer": "<YOUR_SITE_URL>", 
                            "X-Title": "<YOUR_SITE_NAME>", 
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "model": "microsoft/mai-ds-r1:free",
                            "messages": [
                            {
                                "role": "user",
                                "content": userinput
                            }
                            ]
                        })
                        })

        if(!data.ok){
            const errorData = await data.json();
            let error=`API Error: ${data.status}` ;
            appendans(error);
        }

        const json = await data.json();                             
        const answer = json.choices[0].message.content;             
        appendans(answer);
        saveTolocalStorage(userinput,answer,3)
         show(3)
    }
    catch(error){
        appendans(error.message);
    }
}
getData["model4"] = async function func(){
    let userinput=input.value
    input.value='';
    appendtoChat(userinput);
   
try{
    const data=await fetch("https://openrouter.ai/api/v1/chat/completions", {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${MyAPIKey}`,
                                "HTTP-Referer": "<YOUR_SITE_URL>", 
                                "X-Title": "<YOUR_SITE_NAME>", 
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "model": "deepseek/deepseek-chat-v3-0324:free",
                                "messages": [
                                {
                                    "role": "user",
                                    "content": userinput
                                }
                                ]
                            })
                            })

        if(!data.ok){
            const errorData = await data.json();
            let error=`API Error: ${data.status}` ;
            appendans(error);
        }

        const json = await data.json();                             
        const answer = json.choices[0].message.content;             
        appendans(answer);
        saveTolocalStorage(userinput,answer,4)
         show(4)
    }
    catch(error){
        appendans(error.message);
    }
}
getData["model5"] = async function func(){
    let userinput=input.value
    input.value='';
    appendtoChat(userinput);
   
try{
    const data=await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${MyAPIKey}`,
    "HTTP-Referer": "<YOUR_SITE_URL>", 
    "X-Title": "<YOUR_SITE_NAME>", 
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "mistralai/mistral-small-3.2-24b-instruct:free",
    "messages": [
      {
        "role": "user",
        "content":userinput
      }
    ]
  })
})

        if(!data.ok){
            const errorData = await data.json();
            let error=`API Error: ${data.status}` ;
            appendans(error);
        }

        const json = await data.json();                             
        const answer = json.choices[0].message.content;             
        appendans(answer);
        saveTolocalStorage(userinput,answer,5)
         show(5)
    }
    catch(error){
        appendans(error.message);
    }
}
getData["model2"] = async function func(){
    let userinput=input.value
    input.value='';
    appendtoChat(userinput);
   
try{
    const data=await fetch("https://openrouter.ai/api/v1/chat/completions", {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${MyAPIKey}`,
                                "HTTP-Referer": "<YOUR_SITE_URL>",
                                "X-Title": "<YOUR_SITE_NAME>",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "model": "qwen/qwen3-32b:free",
                                "messages": [
                                {
                                    "role": "user",
                                    "content": userinput
                                }
                                ]
                            })
                            })

        if(!data.ok){
            const errorData = await data.json();
            let error=`API Error: ${data.status}` ;
            appendans(error);
        }

        const json = await data.json();                             
        const answer = json.choices[0].message.content;             
        appendans(answer);
        saveTolocalStorage(userinput,answer,2)
         show(2)
    }
    catch(error){
        appendans(error.message);
    }
}



// Reset button for clear chat history
let reset=document.querySelector('.reset')
reset.addEventListener('click',(e)=>{
    Updateddata=[]
    localStorage.setItem(`message${modelIndex}`,JSON.stringify(Updateddata));
    show(modelIndex)
})




sendBtn.addEventListener("click", async () => {
  await getData[`model${modelIndex}`]();
});

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    await getData[`model${modelIndex}`]();
  }
});

show(modelIndex)
