const form=document.getElementById("newsForm"),input=document.getElementById("newsText");
const analyzeButton=document.getElementById("analyzeButton"),clearButton=document.getElementById("clearButton");
const clearHistoryButton=document.getElementById("clearHistoryButton"),textCount=document.getElementById("textCount");
const emptyState=document.getElementById("emptyState"),resultContent=document.getElementById("resultContent");
const resultBadge=document.getElementById("resultBadge"),resultTitle=document.getElementById("resultTitle");
const resultSummary=document.getElementById("resultSummary"),confidenceValue=document.getElementById("confidenceValue");
const confidenceBar=document.getElementById("confidenceBar"),wordCount=document.getElementById("wordCount");
const characterCount=document.getElementById("characterCount"),disclaimer=document.getElementById("disclaimer");
const errorMessage=document.getElementById("errorMessage"),historyList=document.getElementById("historyList");
let analyses=[];
const samples={
 real:"The city council announced on Tuesday that the public library will extend its opening hours next month. The council published meeting minutes and listed the new schedule.",
 fake:"URGENT!!! Secret miracle discovery proves every illness disappears overnight. Officials are hiding the truth from everyone. Share this shocking claim immediately before it is deleted!"
};
input.addEventListener("input",()=>textCount.textContent=`${input.value.length.toLocaleString()} characters`);
document.querySelectorAll("[data-sample]").forEach(button=>button.addEventListener("click",()=>{
 input.value=samples[button.dataset.sample];input.dispatchEvent(new Event("input"));input.focus();
}));
form.addEventListener("submit",async event=>{
 event.preventDefault();hideError();const news=input.value.trim();
 if(news.length<20){showError("Please enter at least 20 characters.");return;}
 analyzeButton.disabled=true;analyzeButton.textContent="Analyzing…";
 try{
  const response=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({news})});
  const data=await response.json();if(!response.ok)throw new Error(data.error||"Analysis failed.");
  showResult(data);analyses.unshift({text:news,label:data.label,className:data.className,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})});renderHistory();
 }catch(error){showError(error.message||"Cannot connect. Make sure the Flask server is running.");}
 finally{analyzeButton.disabled=false;analyzeButton.textContent="Analyze text →";}
});
function showResult(data){
 emptyState.hidden=true;resultContent.hidden=false;resultBadge.className=`badge ${data.className}`;
 resultBadge.textContent=data.label;resultTitle.textContent=data.label;
 resultSummary.textContent=data.className==="fake"?"The model found patterns more associated with likely-fake examples in its training data.":"The model found patterns more associated with likely-real examples in its training data.";
 confidenceValue.textContent=`${data.confidence}%`;confidenceBar.style.width=`${data.confidence}%`;
 confidenceBar.style.background=data.className==="fake"?"#c65353":"#16845c";
 wordCount.textContent=data.wordCount;characterCount.textContent=data.characterCount;disclaimer.textContent=data.disclaimer;
}
function showError(message){errorMessage.textContent=message;errorMessage.hidden=false}
function hideError(){errorMessage.hidden=true;errorMessage.textContent=""}
function renderHistory(){
 historyList.replaceChildren();
 if(!analyses.length){const p=document.createElement("p");p.className="muted";p.textContent="No analyses yet.";historyList.append(p);return}
 analyses.forEach(item=>{
  const row=document.createElement("div");row.className="history-item";
  const detail=document.createElement("div"),text=document.createElement("p"),time=document.createElement("small");
  text.textContent=item.text.length>120?item.text.slice(0,120)+"…":item.text;time.textContent=item.time;detail.append(text,time);
  const label=document.createElement("span");label.className=`history-label ${item.className}`;label.textContent=item.label;row.append(detail,label);historyList.append(row);
 });
}
clearButton.addEventListener("click",()=>{input.value="";textCount.textContent="0 characters";emptyState.hidden=false;resultContent.hidden=true;hideError();input.focus()});
clearHistoryButton.addEventListener("click",()=>{analyses=[];renderHistory()});
